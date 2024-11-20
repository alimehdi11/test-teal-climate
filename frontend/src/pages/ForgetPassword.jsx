import Input from "../components/ui/Input";
import FormControl from "../components/FormControl";
import Label from "../components/ui/Label";
import { useState } from "react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { request } from "../utils/request";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerticalLogo from "../components/ui/VerticalLogo";
import lockIcon from "../assets/lock-icon.svg"
import backArrow from "../assets/back-arrow-icon.svg"
import messageIcon from "../assets/message-icon2.svg"
// import Stepper from "../components/ui/Stepper";
import * as Yup from "yup";
import ErrorMessage from "../components/ErrorMessage";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
const [resendEmailDetails, setResendEmailDetails] = useState({
  resendAttempts: 0,
  resendTime: 0, 
  debounce: false,
});

const handleResendEmail = () => {
  if (currentStep === 2 && !resendEmailDetails.debounce) {
    // Set debounce flag to prevent multiple clicks during cooldown
    setResendEmailDetails((prevState) => ({
      ...prevState,
      debounce: true,
    }));

    // Increment the resend attempt count and add 30 seconds for each attempt
    const updatedResendTime = 30 + resendEmailDetails.resendAttempts * 30; // Add 30 seconds for each attempt

    // Start countdown once the resend button is clicked
    const interval = setInterval(() => {
      setResendEmailDetails((prevState) => {
        // If the time is up, stop the interval and reset cooldown
        if (prevState.resendTime <= 1) {
          clearInterval(interval); // Stop the interval once it reaches 0
          return {
            ...prevState,
            resendCooldown: false, // Cooldown ended
            resendTime: 0, // Reset time
            debounce: false, // Allow next attempt
          };
        }

        // Decrease the resendTime by 1 second
        return {
          ...prevState,
          resendTime: prevState.resendTime - 1,
        };
      });
    }, 1000); // 1000ms = 1 second

    // Update state with new resend attempt count and resend time
    setResendEmailDetails((prevState) => ({
      ...prevState,
      resendAttempts: prevState.resendAttempts + 1,
      resendTime: updatedResendTime, // Set new resend time based on attempt count
      resendCooldown: true, // Indicate that cooldown is active
    }));
  }
};



  // Define the Yup schema
  const emailSchema = Yup.string()
    .email("Invalid email address")
    .required("Email is required");

  // Handle input change with validation
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    // Validate email on change
    emailSchema
      .validate(value)
      .then(() => setEmailError("")) // Clear error if valid
      .catch((err) => setEmailError(err.message)); // Set error message if invalid
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (resendEmailDetails.debounce ) {
      return;
    }
    handleResendEmail();
    try {
      setLoading(true); // Start loading
      // Validate email before submission
      await emailSchema.validate(email);

      const url = `${import.meta.env.VITE_API_BASE_URL}/auth/forget-password`;
      const payload = { email };
      const response = await request(url, "POST", payload);

      if (response.status !== 200) {
        let responseData = await response.json();
        if (response.status === 404) {
          toast.error(responseData.message);
          throw new Error(responseData.message);
        }
        throw new Error(responseData.error);
      }

      toast.success((await response.json()).message);
      setCurrentStep(2);
    } catch (error) {
      console.log(error)
      if (error.name === "ValidationError") {
        setEmailError(error.message);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const steps = [
    { title: "Enter Email" },
    { title: "Check your Email" },
    { title: "Reset Password" },
  ];

  const Comp1 = () => {
    return (
      <>
        <div className="w-12 h-12 rounded-full bg-tc-green flex justify-center items-center mx-auto">
          <img src={lockIcon} alt="" />
        </div>
        <h1 className="font-bold text-xl text-center my-4">Forgot password?</h1>
        <h1 className="text-center mb-7 text-sm">
          No worries, we’ll send you a link to reset your password.
        </h1>
        <form
          method="POST"
          onSubmit={handleSubmit}
          className=""
        >
          <FormControl>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className={`border ${emailError ? "border-red-500 outline-none" : "border-tc-green"
                } placeholder:text-zinc-400 mt-1`}
              value={email}
              onChange={handleEmailChange}
              defaultFocus={true}
            />
            {emailError && (
             <ErrorMessage>{emailError}</ErrorMessage>
            )}
          </FormControl>
        <Button type="submit" className="my-5 mx-auto max-w-[220px] block w-[90%] flex justify-center items-center gap-2" disabled={loading}>
  {loading ? (
    <>
      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
      Processing...
    </>
  ) : (
    "Reset Password"
  )}
</Button>

        </form>
      </>
    )
  }
  const Comp2 = () => {
    return (
      <>
        <div className="w-12 h-12 rounded-full bg-tc-green flex justify-center items-center mx-auto">
          <img src={messageIcon} alt="" />
        </div>
        <h1 className="font-bold text-xl text-center my-4">Check your email</h1>
        <h1 className="text-center mb-7 text-sm leading-6">We sent a password reset link to <br /> {email}</h1>
        <a
          target="_blank"
          href="https://mail.google.com/mail/"
          className="my-5 mx-auto max-w-[220px] text-center block w-[90%] bg-tc-green text-white hover:opacity-95 font-medium py-3 px-4 rounded-md"
        >
          Go to your Email
        </a>

       <h1 className="text-center mb-7 text-sm leading-6">
  Didn’t receive the email?  
  {
    resendEmailDetails.resendTime > 0 ? (
      <ErrorMessage className="text-red-500">
        Please wait {resendEmailDetails.resendTime} seconds before you can resend.
      </ErrorMessage>
    ) : (
      <button className="text-tc-green ml-1" onClick={handleSubmit}>Click to Resend</button>
    )
  }
</h1>


      </>
    )
  }

  const forgetPasswordComps = [<Comp1 />, <Comp2 />]
  return (
    <div className="flex flex-col justify-center items-center h-[90vh] gap-y-8">
      {/* Logo */}
      <VerticalLogo />
      <div className="p-6 rounded-2xl max-w-[550px] w-[90%] px-[2vmax] py-9 shadow-xl border-t-[12px] border-tc-blue">
        {
          forgetPasswordComps[currentStep - 1]
        }
        {/* Login link */}
        <div>
          <Link
            to="/login"
            className=""
          >
            <div className="flex gap-2 justify-center">
              <img src={backArrow} alt="" />
              <span>Back to log in</span>
            </div>
          </Link>
        </div>
      </div>
    </div>

  );
};

export default ResetPassword;







// <>
//   {emailSent ? (
//     <div className="flex flex-col justify-center items-center h-screen">
//       Check email inbox
//     </div>
//   ) : (
//     <div className="flex flex-col justify-center items-center h-screen gap-y-3">
//       {/* Logo */}
//      <VerticalLogo/>
//       <form
//         method="POST"
//         onSubmit={handleSubmit}
//         className="w-[350px] flex flex-col gap-y-3 bg-white p-6 rounded-md"
//       >
//         <FormControl>
//           <Label>Enter your email</Label>
//           <Input
//             type="email"
//             value={email}
//             onChange={(event) => {
//               setEmail(event.target.value);
//             }}
//           />
//         </FormControl>
//         <Button type="submit" className="!bg-tc-blue">
//           Submit
//         </Button>
//       </form>
//       {/* Login link */}
//       <div>
//         <Link
//           to="/login"
//           className="text-tc-blue hover:bg-slate-300 rounded p-1"
//         >
//           Login
//         </Link>
//       </div>
//     </div>
//   )}
// </>