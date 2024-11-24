import { useContext, useEffect, useState } from "react";
import PaymentStatus from "../components/PaymentStatus.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getBearerToken, isLoggedIn, isSubscribed } from "../utils/auth.js";
import { Link, useNavigate } from "react-router-dom";
import checkIcon from "../assets/icons/check-icon.svg"
import Button from "../components/ui/Button.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import Loader from "../components/ui/Loader.jsx";
import Logo from "../components/ui/Logo.jsx"
function Completion() {
  const [stripePromise, setStripePromise] = useState(null);
  const {  userTransictionDetails } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     if (isSubscribed()) {
  //       navigate("/dashboard");
  //     }
  //   } else {
  //     navigate("/");
  //   }
  // }, []);
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
      <div className="flex flex-col items-center justify-center min-h-[92vh] ">
        {
          userTransictionDetails.status == "succeeded" ? (
            <>
              <div className="px-[3vmax] py-10 bg-white max-w-[550px] w-[90%] shadow-xl border-t-[17px] border-tc-blue  rounded-2xl text-sm">
                <div className="w-fit">
                <Logo />
                </div>
                <img src={checkIcon} alt="" className="w-20 mx-auto my-8" />
                <h1 className="text-center font-semibold  text-lg">Payment receipt</h1>
                  <div className="flex gap-2 items-center mt-5">
                    <div className="font-semibold">
                      <h1>Essential</h1>
                      <p>$3500.00 USD billed every month</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 my-6  font-medium">
                    <div className="flex justify-between">
                      <h1>Date</h1>
                      <h1>{userTransictionDetails.date}</h1>
                    </div>
                    <div className="flex justify-between">
                      <h1>Time</h1>
                      <h1>{userTransictionDetails.time}</h1>
                    </div>
                    <div className="flex justify-between">
                      <h1>payment method</h1>
                      <h1 className="capitalize">{userTransictionDetails.paymentMethod}</h1>
                    </div>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-zinc-400 py-5">
                    <h1>Total</h1>
                    <h1>$3500.00 USD</h1>
                </div>
                <h1 className="text-right font-medium">Thanks for the payment</h1>
              </div>
              
              <Link to="/dashboard" className="block w-full text-center">
      <Button className="max-w-72 w-[90%] mt-10 shadow-xl">Dashboard</Button>
    </Link>
            </>
          )
          : (
            <Loader/>
          )
        }
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
