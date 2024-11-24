import Input from "../components/ui/Input";
import FormControl from "../components/FormControl";
import Label from "../components/ui/Label";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { request } from "../utils/request";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerticalLogo from "../components/ui/VerticalLogo";
import lockIcon from "../assets/lock-icon.svg";
import backArrow from "../assets/back-arrow-icon.svg";
import messageIcon from "../assets/message-icon2.svg";
import * as Yup from "yup";
import ErrorMessage from "../components/ErrorMessage";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendEmailDetails, setResendEmailDetails] = useState({
    resendTime: 0,
    debounce: false,
  });
console.log(resendEmailDetails.resendTime)
  // Handle Resend Email logic
  const handleResendEmail = () => {
    if (currentStep === 2 && !resendEmailDetails.debounce) {
      setResendEmailDetails((prevState) => ({
        ...prevState,
        debounce: true,
      }));

      // Increment the resend attempt count and add 30 seconds for each attempt
      const updatedResendTime = 30;

      // Update the state with new resend attempt count and resend time
      setResendEmailDetails((prevState) => ({
        ...prevState,
        resendTime: updatedResendTime,
        resendCooldown: true,
      }));
    }
  };

  // Using useEffect to manage the timer
  useEffect(() => {
    let interval;
    if (resendEmailDetails.resendCooldown && resendEmailDetails.resendTime > 0) {
      // Start countdown once the resend button is clicked
      interval = setInterval(() => {
        setResendEmailDetails((prevState) => {
          if (prevState.resendTime <= 1) {
            clearInterval(interval); // Stop the interval once it reaches 0
            return {
              ...prevState,
              resendCooldown: false, // Cooldown ended
              resendTime: 0, // Reset time
              debounce: false, // Allow next attempt
            };
          }
          return {
            ...prevState,
            resendTime: prevState.resendTime - 1, // Decrease the time by 1 second
          };
        });
      }, 1000); // 1000ms = 1 second
    }

    // Cleanup interval when the component is unmounted or the timer ends
    return () => clearInterval(interval);
  }, [resendEmailDetails.resendCooldown, resendEmailDetails.resendTime]);

  // Define the Yup schema
  const emailSchema = Yup.string()
    .email("Invalid email address")
    .required("Email is required");

  // Handle input change with validation
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);   
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (resendEmailDetails.debounce) {
      return;
    }
    handleResendEmail();
    try {
      setLoading(true); // Start loading
      // Validate email before submission
      emailSchema
       .validate(email)
       .then(() => setEmailError("")) // Clear error if valid
       .catch((err) => setEmailError(err.message)); // Set error message if invalid
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
      console.log(error);
      if (error.name === "ValidationError") {
        setEmailError(error.message);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };


  const Comp1 = () => {
    return (
      <>
        <div className="w-12 h-12 rounded-full bg-tc-green flex justify-center items-center mx-auto">
          <img src={lockIcon} alt="" />
        </div>
        <h1 className="font-bold text-xl text-center my-4">Reset password</h1>
        <h1 className="text-center mb-7 text-sm">
          Enter the email associated with your account and <br /> we will send a reset link.
        </h1>
        <form method="POST" onSubmit={handleSubmit} className="">
          <FormControl>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="placeholder:text-zinc-400 placeholder:italic mt-1"
              value={email}
              onChange={handleEmailChange}
              defaultFocus={true}
            />
            {emailError && (
              <ErrorMessage>{emailError}</ErrorMessage>
            )}
          </FormControl>
          <Button
            type="submit"
            className={`my-5 mx-auto max-w-[220px] w-[90%] flex justify-center items-center gap-2 ${loading && "bg-[#00b38c]"}`}
            disabled={loading}
          >
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
    );
  };

  const Comp2 = () => {
    return (
      <>
        <div className="w-12 h-12 rounded-full bg-tc-green flex justify-center items-center mx-auto">
          <img src={messageIcon} alt="" />
        </div>
        <h1 className="font-bold text-xl text-center my-4">Email sent</h1>
        <h1 className="text-center mb-7 text-sm leading-6">
          We sent a password reset link to : <br /> {email}
        </h1>
        {/* <a
          target="_blank"
          href="https://mail.google.com/mail/"
          className="my-5 mx-auto max-w-[220px] text-center block w-[90%] bg-tc-green text-white hover:opacity-95 font-medium py-3 px-4 rounded-md"
        >
          Go to your Email
        </a> */}

        <h1 className="text-center mb-7 text-sm leading-6">
          Didn’t receive the email?
          {resendEmailDetails.resendTime > 0 ? (
            <ErrorMessage className="text-red-500">
              Please wait refresh reset link
            </ErrorMessage>
          ) : (
            <button className="text-tc-blue underline ml-1" onClick={handleSubmit}>
              Click to resend
            </button>
          )}
        </h1>
      </>
    );
  };

  const forgetPasswordComps = [<Comp1 />, <Comp2 />];

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] gap-y-8 py-10">
      {/* Logo */}
      <VerticalLogo />
      <div className="p-6 rounded-2xl max-w-[550px] w-[90%] px-[2vmax] py-9 shadow-xl border-t-[17px] border-tc-blue bg-white">
        <Link to="/login">
           <Button onClick={()=>navigate("/login")} className="flex gap-1 justify-center ms-auto min-w-[120px]">
              <img src={backArrow} alt="" />
              <span>Sign in</span>
          </Button>
        </Link>
        {forgetPasswordComps[currentStep - 1]}

        {/* Login link */}
        <div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
