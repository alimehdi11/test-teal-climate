import { useContext, useEffect, useState } from "react";
import { deleteToken } from "./../utils/auth.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../contexts/UserContext.jsx";
import { request } from "./../utils/request.js";

const Account = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [subscriptionFromStripe, setSubscriptionFromStripe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextInvoiceData, setNextInvoiceData] = useState("");

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

  const handleLogout = () => {
    deleteToken();
    navigate("/");
  };

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
      <div className="flex font-poppins">
        {/* Sidebar Content */}
        <div className="text-white w-1/4 h-screen flex flex-col justify-between p-3 max-h-[100vh] box-border border-solid border-r-[2px] border-gray-200">
          <div className="text-black">
            <h2 className="text-xl font-bold text-center m-0 mt-5">Settings</h2>
            <ul className="list-none p-[0px] m-[0px] mt-5">
              <li className="p-3 rounded-md bg-brand-color-01 text-white text-center">
                Subscription
              </li>
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="p-3 rounded-md bg-gray-200 text-gray-700 hover:bg-brand-color-01 hover:text-white w-[100%] font-bold"
          >
            Log out
          </button>
        </div>
        {/* Content Area */}
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-0">Subscription Details</h2>
          <div className="mt-4">
            <p>
              {"Your next invoive will be on "} <b>{nextInvoiceData}</b>
            </p>
            <button
              type="button"
              className="p-3 rounded-md bg-gray-200 text-gray-700 hover:bg-brand-color-01 hover:text-white font-bold text-base"
              onClick={openModal}
            >
              Unsubscribe
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className={`bg-gray-3 opacity-80 fixed top-0 left-0 right-0 bottom-0 text-black flex justify-center items-center ${
          !isModalOpen && "hidden"
        }`}
      >
        <div className="bg-white w-[40%] h-[40%] max-w-[400px] max-h-[200px] rounded-lg flex justify-center items-center font-poppins flex-col gap-3 opacity-100">
          Are you sure you want to unsubscribe?
          <div>
            <button
              type="button"
              className="py-3 px-10 bg-gray-200 text-gray-700 hover:bg-brand-color-01 hover:text-white rounded-lg ml-2 font-bold"
              onClick={closeModal}
            >
              No
            </button>
            <button
              disabled={subscriptionId ? false : true}
              type="button"
              className="py-3 px-10 bg-gray-200 text-gray-700 hover:bg-brand-color-01 hover:text-white rounded-lg ml-2 font-bold"
              onClick={handleUnsubscribe}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
