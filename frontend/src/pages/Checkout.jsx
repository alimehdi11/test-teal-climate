import Payment from "./../components/Payment";
import { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { getBearerToken, isLoggedIn, isSubscribed } from "./../utils/auth.js";
import { UserContext } from "../contexts/UserContext";

function Checkout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const location = useLocation();
  const [amount, setAmount] = useState("");

  const { user } = useContext(UserContext);
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
    if (Object.keys(user).length > 0) {
      if (user.subscribed) {
        navigate("/dashboard");
      }
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const plan = queryParams.get("plan");
    setSelectedPlan(plan);
  }, []);

  useEffect(() => {
    if (!selectedPlan) {
      // Early return
      return;
    }

    if (selectedPlan === "basic") {
      setAmount(2000);
    } else if (selectedPlan === "pro") {
      setAmount(2500);
    }
  }, [selectedPlan]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/stripe/config`, {
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
          <h2 className="text-center">Selected Plan : {selectedPlan}</h2>
          <h2 className="text-center">Amount: {amount}/month</h2>
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
