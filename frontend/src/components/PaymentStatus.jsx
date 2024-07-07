import { useState, useEffect, useContext } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { request } from "./../utils/request.js";
import { UserContext } from "./../contexts/UserContext.jsx";
import { Link } from "react-router-dom";
import { setToken } from "../utils/auth.js";
import Button from "./ui/Button.jsx";

const PaymentStatus = () => {
  const [message, setMessage] = useState("pending");
  const stripe = useStripe();
  const { user } = useContext(UserContext);

  const updateSubscription = async (payload) => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/subscriptions/${user.id}`,
        "PUT",
        payload
      );
      console.log(response);
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
      console.log("newToken", response.token);
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
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // Inspect the PaymentIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Success! Payment received.");

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

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <>
      <div className="mb-2">
        <b>Payment Status : </b> {message}
      </div>
      {message === "Success! Payment received." && (
        <Link to="/dashboard">
          <Button type="button">Dashboard</Button>
        </Link>
      )}
    </>
  );
};

export default PaymentStatus;
