import { useEffect, useState } from "react";
import PaymentStatus from "./PaymentStatus";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getBearerToken } from "../utils/auth.utils";

function Completion() {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/subscription/config`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        authorization: getBearerToken(),
      },
    }).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  return (
    <>
      <h1>Thank you! 🎉</h1>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <PaymentStatus />
        </Elements>
      )}
    </>
  );
}

export default Completion;
