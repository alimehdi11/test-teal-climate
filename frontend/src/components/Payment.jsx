import { useState, useContext, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { request } from "./../utils/request.js";
import { UserContext } from "./../contexts/UserContext.jsx";

const Payment = ({ selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [priceId, setPriceId] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (selectedPlan === "basic") {
      // price_Id from stripe dashboard
      setPriceId("price_1P8T2ORu2G1zaGnrQsEzNsIA");
    } else if (selectedPlan === "pro") {
      // price_Id from stripe dashboard
      setPriceId("price_1P8T2iRu2G1zaGnr6p7EsGuX");
    }
  }, []);

  useEffect(() => {
    // Get subscription details from our database
    request(
      `${import.meta.env.VITE_API_BASE_URL}/subscriptions/${user.id}`,
      "GET"
    )
      .then((response) => {
        return response.json();
      })
      .then((subscription) => {
        console.log("subscription from TC", subscription);
        setSubscriptionDetails(subscription);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   setIsProcessing(true);

  //   const { error } = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       // Make sure to change this to your payment completion page
  //       return_url: `${window.location.origin}/completion`,
  //     },
  //   });

  //   if (error.type === "card_error" || error.type === "validation_error") {
  //     setMessage(error.message);
  //   } else {
  //     setMessage("An unexpected error occured.");
  //   }

  //   setIsProcessing(false);
  // };

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

  const createSubscriptionAtStripe = async (priceId, customerId) => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/stripe/subscriptions`,
        "POST",
        {
          priceId,
          customerId,
        }
      );
      const subscription = await response.json();
      return subscription;
    } catch (error) {
      console.log("Could not createSubscriptionAtStripe ");
      console.error(error.message);
    }
  };

  const createCustomerAtStripe = async (email) => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/stripe/customers`,
        "POST",
        { email }
      );

      const customer = await response.json();
      return customer;
    } catch (error) {
      console.log("Could not createSubscriptionAtStripe ");
      console.error(error.message);
    }
  };

  const handleError = (error) => {
    setIsProcessing(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    let customerId;
    let subscriptionId;
    let clientSecret;

    /**
     * ---------- STEP 1 ----------
     */
    // Check if customerId exists in our database
    if (subscriptionDetails.customerId) {
      // Resuse the customerId
      customerId = subscriptionDetails.customerId;
    } else {
      // Create customer
      const customer = await createCustomerAtStripe(user.email);
      console.log("customer created");
      customerId = customer.id;
      // Update customerId in our database
      await updateSubscription({ customerId: customerId });
    }

    /**
     * ---------- STEP 2 ----------
     */
    // Check if subscriptionId exists in our database
    // if (subscriptionDetails.subscriptionId) {
    //   // check if subscription still exists at stripe
    //   const subscription = await getSubscriptionFromStripe(
    //     subscriptionDetails.subscriptionId
    //   );
    //   if (!subscription.error) {
    //     // if exists resuse the subscriptionId
    //     subscriptionId = subscription.id;
    //     // TODO: how to get clientSecret from already existing subscription
    //     clientSecret = subscription.clientSecret;
    //   } else {
    //     // Otherwise create subscription at stripe
    //     const subscription = await createSubscriptionAtStripe(
    //       priceId,
    //       customerId
    //     );
    //     subscriptionId = subscription.subscriptionId;
    //     clientSecret = subscription.clientSecret;
    //     // Update subscriptionId in our database
    //     await updateScription({ subscriptionId });
    //   }
    // } else {
    // Create subscription at stripe
    const subscription = await createSubscriptionAtStripe(priceId, customerId);
    subscriptionId = subscription.subscriptionId;
    clientSecret = subscription.clientSecret;
    // Update subscriptionId in our database
    await updateSubscription({ subscriptionId: subscriptionId });
    // }

    /**
     * ---------- STEP 3 ----------
     */
    // Confirm the Intent using the details collected by the Payment Element
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when confirming the Intent.
      // Show the error to your customer (for example, "payment details incomplete").
      handleError(error);
    } else {
      // Update paymentIntentId and clientSecret in our database
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button
          disabled={isProcessing || !stripe || !elements}
          id="submit"
          className="bg-brand-color-01 rounded-md px-5 py-3 mt-[16px] text-white font-bold hover:bg-mediumseagreen disabled:bg-gray-4"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {errorMessage && <div id="payment-message">{errorMessage}</div>}
      </form>
    </>
  );
};

export default Payment;
