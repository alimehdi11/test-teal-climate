import { useEffect, useContext } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { request } from "./../utils/request.js";
import { UserContext } from "./../contexts/UserContext.jsx";
import {  useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth.js";
import { toast } from "react-toastify";
import { api } from "../api/index.js";

const PaymentStatus = () => {
  const stripe = useStripe();
  const { user, setUserTransictionDetails } = useContext(UserContext);
  const navigate = useNavigate();




   const getPaymentMethodDetailsById = async (id) => {
    try {
        return await api.stripe.getPaymentMethodById(id); 
    } catch (error) {
      console.log("Could not get getPaymentMethodById");
      console.error(error.message);
    }
  };

  const updateSubscription = async (payload) => {
    try {
       await request(
        `${import.meta.env.VITE_API_BASE_URL}/subscriptions/${user.id}`,
        "PUT",
        payload
      );
    } catch (error) {
      console.log("Could not update subscription");
      console.error(error.message);
    }
  };



  const updateToken = async () => {
    try {
      let response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/auth/token`,
        "POST"
      );
      response = await response.json();
      setToken(response.token);
    } catch (error) {
      console.log("Could not updateToken");
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }


    
    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(async({ paymentIntent }) => {
      // Inspect the PaymentIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      const paymentMethodDetails = await getPaymentMethodDetailsById(paymentIntent.payment_method);
      const paymentMethod = `${paymentMethodDetails.type} (${paymentMethodDetails.card.brand})`;  
      const date = new Date(paymentMethodDetails.created * 1000);
      const formattedDate = `${date.getUTCDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()]} ${date.getUTCFullYear()}`;
      const formattedTime = date.toISOString().split("T")[1].split(".")[0]; // Extract time in HH:MM:SS format
      setUserTransictionDetails({
        date: formattedDate,
        time: formattedTime,
        status: paymentIntent.status,
        paymentMethod
      })
      switch (paymentIntent.status) {
        case "succeeded":

          (async () => {
            const clientSecretParts = clientSecret.split("_");
            await updateSubscription({
              paymentIntentId:
                clientSecretParts[0] + "_" + clientSecretParts[1],
              clientSecret: clientSecretParts[2] + "_" + clientSecretParts[3],
            });
          })();

          updateToken();
          break;
        case "requires_payment_method":
          toast.error("Payment failed. Please try another payment method.");
          navigate("/subscribe");
          break;

        default:
          toast.error("Something went wrong.");
          navigate("/subscribe");
          break;
      }
    });
  }, [stripe]);

  return (
    <> 
        
      
    </>
  );
};

export default PaymentStatus;
