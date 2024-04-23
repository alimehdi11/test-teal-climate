import Payment from "./../components/Payment";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { getBearerToken } from "./../utils/auth.utils.js";

function Checkout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const plan = queryParams.get("plan");
    setSelectedPlan(plan);
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/subscription/config`, {
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
      <div className="flex p-10">
        <div className="flex-1">
          <h2 className="text-center">Selected Plan</h2>
          <div className="text-center">Amount: $2000/month</div>
        </div>
        <div className="flex-1">
          <div className="max-w-[400px] mx-auto border-solid border-gray-5 border-[1px] p-3 rounded">
            {selectedPlan && stripePromise && (
              <Elements
                stripe={stripePromise}
                options={{ mode: "subscription", amount: 0, currency: "usd" }}
              >
                <Payment selectedPlan={selectedPlan} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
