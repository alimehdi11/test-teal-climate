import { useContext, useEffect, useState } from "react";
import { deleteToken } from "./../utils/auth.utils.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../contexts/UserContext.jsx";
import { request } from "./../utils/network.utils.js";

const Account = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    request(
      `${process.env.REACT_APP_API_BASE_URL}/subscriptions/${user.id}`,
      "GET"
    )
      .then((data) => {
        return data.json();
      })
      .then((subscription) => {
        return setSubscriptionId(subscription.subscriptionId);
      })
      .catch((error) => {
        console.log("Can't fetch subscriptionId");
        console.error(error);
      });
  }, []);

  const handleLogout = () => {
    deleteToken();
    navigate("/");
  };

  const handleUnsubscribe = async () => {
    try {
      // Unsubscribe
      const updatedSubscriptionFromStripe = await request(
        `${process.env.REACT_APP_API_BASE_URL}/stripe/subscriptions/${subscriptionId}`,
        "PUT",
        {
          cancel_at_period_end: true,
        }
      );
      console.log("updated subscription", updatedSubscriptionFromStripe);
      if (!updatedSubscriptionFromStripe.error) {
        // Update subscription record in our database
        const subscription = await request(
          `${process.env.REACT_APP_API_BASE_URL}/subscriptions/${user.id}`,
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
        <div className="text-white w-1/4 h-screen flex flex-col justify-between p-3 max-h-[100vh] box-border border-solid border-r-[2px] border-gray-200">
          <div className="text-black">
            {/* Sidebar Content */}
            <h2 className="text-xl font-bold text-center m-0 mt-5">Settings</h2>
            <ul className="list-none p-[0px] m-[0px] mt-5">
              <li className="p-3 rounded-md bg-brand-color-01 text-white text-center">
                Subscription
              </li>
            </ul>
          </div>
          {/* Logo Button */}
          <button
            onClick={handleLogout}
            className="p-3 rounded-md bg-gray-200 text-gray-700 hover:bg-brand-color-01 hover:text-white w-[100%] font-bold"
          >
            Log out
          </button>
        </div>
        <div className="flex-1 p-4">
          {/* Content Area */}
          <h2 className="text-xl font-bold mb-0">Subscription Details</h2>
          <div className="mt-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa.
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
