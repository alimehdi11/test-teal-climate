import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import Layout from "../../components/layout/Layout.jsx";
import SettingsSidebar from "./SettingsSidebar.jsx";
import { deleteToken } from "../../utils/auth.js";
import { useNavigate } from "react-router-dom";

const SubscriptionSettings = () => {
  const { user } = useContext(UserContext);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [subscriptionFromStripe, setSubscriptionFromStripe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextInvoiceData, setNextInvoiceData] = useState("");

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    request(
      `${import.meta.env.VITE_API_BASE_URL}/subscriptions/${user.id}`,
      "GET"
    )
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        } else {
          return data.json();
        }
      })
      .then((subscription) => {
        return setSubscriptionId(subscription.subscriptionId);
      })
      .catch((error) => {
        console.log("Can't fetch subscriptionId");
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (subscriptionId) {
      request(
        `${import.meta.env.VITE_API_BASE_URL}/stripe/subscriptions/${subscriptionId}`,
        "GET"
      )
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          } else {
            return data.json();
          }
        })
        .then((subscription) => {
          return setSubscriptionFromStripe(subscription);
        })
        .catch((error) => {
          console.log("Can't fetch subscriptionFromStripe");
          console.error(error);
        });
    }
  }, [subscriptionId]);

  useEffect(() => {
    if (subscriptionFromStripe) {
      const timestamp = subscriptionFromStripe.billing_cycle_anchor;
      /**
       * Convert timestamp to milliseconds add 30 days time to it
       * To get next invoice date
       */
      const date = new Date(timestamp * 1000 + 60 * 60 * 24 * 30 * 1000);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based, so add 1
      const year = date.getFullYear();
      setNextInvoiceData(`${day}/${month}/${year}`);
    }
  }, [subscriptionFromStripe]);

  const handleUnsubscribe = async () => {
    try {
      // Unsubscribe
      const updatedSubscriptionFromStripe = await request(
        `${import.meta.env.VITE_API_BASE_URL}/stripe/subscriptions/${subscriptionId}`,
        "DELETE",
        {
          cancel_at_period_end: true,
        }
      );
      if (!updatedSubscriptionFromStripe.error) {
        // Update subscription record in our database
        const subscription = await request(
          `${import.meta.env.VITE_API_BASE_URL}/subscriptions/${user.id}`,
          "PUT",
          {
            customerId: null,
            subscriptionId: null,
            paymentIntentId: null,
            clientSecret: null,
          }
        );
        if (!subscription.error) {
          deleteToken();
          navigate("/");
        } else {
          throw new Error(subscription.error);
        }
      } else {
        throw new Error(updatedSubscriptionFromStripe.error);
      }
    } catch (error) {
      console.log("Something went wrong while unsubscribing user");
      console.error(error);
    }
  };

  return (
    <>
      <Layout
        sidebarContent={<SettingsSidebar />}
        mainContent={
          <>
            <div>
              <h2 className="m-0 mb-4 font-extrabold text-2xl">
                Subscription Details
              </h2>
              <div className="mt-4">
                <p>
                  {"Your next invoive will be on "} <b>{nextInvoiceData}</b>
                </p>
                <Button type="button" className="mt-4" onClick={openModal}>
                  Unsubscribe
                </Button>
              </div>
            </div>
            {/* Modal */}
            <div
              className={`bg-slate-500 opacity-80 fixed z-[1000] top-0 left-0 right-0 bottom-0 text-black flex justify-center items-center ${
                !isModalOpen && "hidden"
              }`}
            >
              <div className="bg-white w-[40%] max-w-[400px] min-w-[350px] rounded-lg flex justify-center items-center font-poppins flex-col gap-3 opacity-100 py-8">
                Are you sure you want to unsubscribe?
                <div className="flex gap-2">
                  <Button type="button" className="w-28" onClick={closeModal}>
                    No
                  </Button>
                  <Button
                    disabled={subscriptionId ? false : true}
                    type="button"
                    className="w-28"
                    onClick={handleUnsubscribe}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default SubscriptionSettings;
