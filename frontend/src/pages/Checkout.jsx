import Payment from "./../components/Payment";
import { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {  useNavigate } from "react-router-dom";
import { getBearerToken, isLoggedIn, isSubscribed } from "./../utils/auth.js";
import { UserContext } from "../contexts/UserContext";
import VerticalLogo from "../components/ui/VerticalLogo.jsx";
import Logo from "../components/ui/Logo.jsx";
function Checkout() {
  const [stripePromise, setStripePromise] = useState(null);
  // const [selectedPlan, setSelectedPlan] = useState("basic");


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

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const plan = queryParams.get("plan");
  //   // setSelectedPlan(plan);
  // }, []);

  // useEffect(() => {
  //   if (!selectedPlan) {
  //     // Early return
  //     return;
  //   }

  //   if (selectedPlan === "basic") {
  //     setAmount(2000);
  //   } else if (selectedPlan === "pro") {
  //     setAmount(2500);
  //   }
  // }, [selectedPlan]);

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
      <div className="flex justify-center items-center min-h-[90vh] flex-col lg:flex-row px-10 max-lg:py-10">
        <div className="flex-1 ">
          <div className="py-16 px-10 max-w-[550px] ms-auto text-center flex flex-col gap-6 shadow-xl border-t-[17px] border-tc-blue rounded-2xl bg-white">
            {/* <VerticalLogo/> */}
            <Logo/>
            <p className="max-sm:text-sm">Essential carbon emission measurement.</p>
            <div className="my-10">
            <h1 className="font-semibold text-xl mb-4">Essential</h1>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl font-bold">$3500</h1>
              <div className="text-xs font-medium">
                <h2>USD/</h2>
                <h2>month</h2>
              </div>
           </div>
            </div>
            <div className="flex justify-between">
              <h1>Billed monthly</h1>
              <h1>$3500 USD</h1>
            </div>
            <div className="flex justify-between font-semibold border-t pt-6 border-[#BAB5B5]">
              <h1>Total</h1>
              <h1>$3500 USD</h1>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center p-10 ">
          <div className="max-w-[400px] max-xl:ms-auto border-solid border-gray-5 border-[1px] p-3 rounded bg-white">
            {stripePromise && (
              <Elements
                stripe={stripePromise}
                options={{ mode: "subscription", amount: 0, currency: "usd" }}
              >
                <Payment  />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
