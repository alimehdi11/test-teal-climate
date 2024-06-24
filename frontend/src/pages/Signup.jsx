import { useContext, useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import { setToken, isLoggedIn, decodeToken } from "../utils/auth.utils.js";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { request } from "../utils/network.utils.js";
import { MdOutlineClose } from "react-icons/md";
import Logo from "../components/ui/Logo.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const SignupSchema = {
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  };

  const inputValues = {
    email,
    password,
  };

  const validator = async (key) => {
    try {
      await SignupSchema[key].validate(inputValues[key]);
    } catch (error) {
      switch (key) {
        case "email":
          setEmailError(error.message);
          break;
        case "password":
          setPasswordError(error.message);
          break;
      }
      /**
       * Returning true if there is validation error
       * To prevent from making network request for registering user
       */
      return true;
    }
  };

  const validateSignup = async () => {
    let validateError = false;
    const keys = Object.keys(SignupSchema);
    for (let key of keys) {
      validateError = await validator(key);
    }
    return validateError;
  };

  const resetErrorMessages = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const closePopup = () => {
    setSubmitError("");
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // 1. Reset error messages if preveiously occuredS
      resetErrorMessages();

      // 2. Validate input values
      const validateError = await validateSignup();

      // 3. Check if there are no validation errors
      if (validateError) {
        return;
      }

      // 4. Register user
      const payload = { email, password };
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        "POST",
        payload
      );

      // 5. Check if user registerd succesfully
      if (response.status !== 200) {
        let responseData = await response.json();
        throw new Error(responseData.error);
      }

      // 6. Set JWT in localStorage
      const responseData = await response.json();
      setToken(responseData.token);

      // 7. Update userContext with user data
      const user = decodeToken(responseData.token);
      userContext.updateUserContext(user);

      // 7. Lastly navigate to subscription plans
      navigate("/plans");
    } catch (error) {
      console.error("Error registering user");
      console.error(error.message);
      setSubmitError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-3">
      {/* Logo */}
      <Logo />
      {/* Submit Error */}
      {submitError && (
        <div className="bg-red-500 min-w-[350px] max-w-[350px] break-words rounded p-3 text-white flex justify-between items-center">
          {submitError}
          <MdOutlineClose
            className="text-[20px] hover:text-red-500 hover:bg-white rounded"
            onClick={closePopup}
          />
        </div>
      )}
      {/* Form */}
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="rounded border-solid border-slate-600 border-[1px] min-w-[350px] max-w-[350px] overflow-hidden"
      >
        <div className="text-center bg-tc-blue text-[24px] text-white font-bold py-2 border-b border-slate-600">
          Signup
        </div>
        <div className="flex flex-col gap-y-3 p-3">
          {/* Email */}
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            {/* error */}
            {emailError && (
              <div className="text-red-600 break-words">{emailError}</div>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-y-1">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <div className="text-red-600 break-words">{passwordError}</div>
            )}
          </div>
          <Button type="submit" className="bg-tc-blue text-white text-base">
            Submit
          </Button>
        </div>
      </form>
      {/* Login link */}
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
