import { useEffect, useState } from "react";
import List from "../components/List";
import PricingCard from "../components/PricingCard";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, isSubscribed } from "../utils/auth.js";
import Logo from "../components/ui/Logo.jsx";

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [isLoggedInAndNotSubscribed, setIsLoggedInAndNotSubscribed] =
    useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      if (!isSubscribed()) {
        setIsLoggedInAndNotSubscribed(true);
      } else {
        // If user already subscribed redirect to dashboard
        navigate("/dashboard");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    isLoggedInAndNotSubscribed && (
      <section className="relative z-10 overflow-hidden bg-white pb-12 pt-20 lg:pb-[90px]">
        <div className="mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[40px] max-w-[510px] text-center">
                <div className="mb-4">
                  <Logo />
                </div>
                <h2 className="mb-3 text-3xl font-bold leading-[1.208]text-white sm:text-4xl md:text-[40px]">
                  Our Subscription Plans
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mqMin800:flex-row">
          <PricingCard
            redirectTo="/subscribe?plan=basic"
            type="Basic"
            price="$2000"
            subscription="month"
            description="Perfect for using in a personal website or a client project."
            buttonText="Choose Basic"
          >
            <List>10 Bussiness Units</List>
            <List>Lorem ipsum dolor sit</List>
            <List>Lorem ipsum dolor sit</List>
            <List>Lorem ipsum dolor sit</List>
            <List>Lorem ipsum dolor sit</List>
            <List>Lorem ipsum dolor sit</List>
          </PricingCard>
          <PricingCard
            redirectTo="/subscribe?plan=pro"
            type="Pro"
            price="$2500"
            subscription="month"
            description="Perfect for using in a personal website or a client project."
            buttonText="Choose Pro"
            active
          >
            <List>20 Bussiness Units</List>
            <List>One to One Advisory (45minutes)</List>
            <List>Lorem ipsum dolor sit</List>
            <List>Lorem ipsum dolor sit</List>
            <List>Lorem ipsum dolor sit</List>
            <List>Lorem ipsum dolor sit</List>
          </PricingCard>
        </div>
      </section>
    )
  );
};

export default SubscriptionPlans;
