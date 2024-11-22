import { useContext, useEffect, useState } from "react";
import PaymentStatus from "../components/PaymentStatus.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getBearerToken, isLoggedIn, isSubscribed } from "../utils/auth.js";
import { Link, useNavigate } from "react-router-dom";
import checkIcon from "../assets/icons/check-icon.svg"
import tealClimateLogo1 from "../assets/teal-climate-logo-1.svg";
import Button from "../components/ui/Button.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import Loader from "../components/ui/Loader.jsx";
function Completion() {
  const [stripePromise, setStripePromise] = useState(null);
  const { user, userTransictionDetails } = useContext(UserContext);
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
      <div className="flex flex-col  items-center min-h-[95vh]">
        {
          userTransictionDetails.status == "succeeded" ? (
            <>
              <h1 className="font-bold text-xl my-20">Payment receipt</h1>
              <div className="px-2 max-w-[550px] w-[90%] shadow-xl  rounded-2xl text-sm">
                <img src={checkIcon} alt="" className="w-24 mx-auto -mt-12" />
                <h1 className="text-center font-semibold mt-10 text-lg">Thanks for the payment</h1>
                <hr className="border border-dashed border-zinc-400 my-10" />
                <div className="mx-[3vmax] mb-16">
                  <div className="flex gap-2 items-center">
                    <img src={tealClimateLogo1} alt="" />
                    <div className="font-semibold">
                      <h1>Essential</h1>
                      <p>$3500.00 USD billed every month</p>
                    </div>
                  </div>
                  <p className=" ml-2 mt-10">Payment recived from <span className="capitalize">{user.name}</span></p>
                  <div className="flex flex-col gap-4 my-12 font-medium">
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
                </div>
              </div>
            </>
          )
            : (
              <Loader/>
            )
        }
        <Link to="/dashboard" className="block w-full text-center">
          <Button className="max-w-72 w-[90%] mt-10 shadow-xl">Dashboard</Button>
        </Link>
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
