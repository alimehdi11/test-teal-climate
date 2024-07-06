import { useEffect, useState } from "react";
import PaymentStatus from "../components/PaymentStatus.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getBearerToken, isLoggedIn, isSubscribed } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

function Completion() {
  const [stripePromise, setStripePromise] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      if (isSubscribed()) {
        navigate("/dashboard");
      }
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/stripe/config`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        authorization: getBearerToken(),
      },
    })
      .then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.log("Couldn't setStripePromise");
        console.error(error.message);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <h1>Thank you! 🎉</h1>
        {stripePromise && (
          <Elements stripe={stripePromise}>
            <PaymentStatus />
          </Elements>
        )}
      </div>
    </>
  );
}

export default Completion;
