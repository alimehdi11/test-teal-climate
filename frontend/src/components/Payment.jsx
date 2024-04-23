import { useState, useContext, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { request } from "./../utils/network.utils.js";
import { UserContext } from "./../contexts/UserContext.jsx";

const Payment = ({ selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [priceId, setPriceId] = useState(false);
  const { user } = useContext(UserContext);

  console.log("===>>>", user);

  useEffect(() => {
    if (selectedPlan === "basic") {
      // price_Id from stripe dashboard
      setPriceId("price_1P8T2ORu2G1zaGnrQsEzNsIA");
    } else if (selectedPlan === "pro") {
      // price_Id from stripe dashboard
      setPriceId("price_1P8T2iRu2G1zaGnr6p7EsGuX");
    }
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

    // STEP:01 Create customer
    let customer = await request(
      `${process.env.REACT_APP_API_BASE_URL}/subscription/customer`,
      "POST",
      { email: user.email }
    );

    customer = await customer.json();
    console.log("customer  ===>>> ", customer);

    // STEP:02 Create the subscription
    const res = await request(
      `${process.env.REACT_APP_API_BASE_URL}/subscription`,
      "POST",
      {
        priceId: priceId,
        customerId: customer.id,
      }
    );
    const { subscriptionId, clientSecret } = await res.json();
    console.log("clientSecret  ===>>> ", clientSecret);

    // STEP:03 Confirm the Intent using the details collected by the Payment Element
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
