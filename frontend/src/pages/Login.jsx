import { useContext, useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import { setToken, isLoggedIn, decodeToken } from "../utils/auth.js";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { request } from "../utils/request.js";
import Logo from "../components/ui/Logo.jsx";
import FormControl from "../components/FormControl.jsx";
import Label from "../components/ui/Label.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [isUserNotLoggedIn, setIsUserNotLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const loginFormSchema = {
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  };

  const inputValues = {
    email,
    password,
  };

  const validator = async (key) => {
    try {
      await loginFormSchema[key].validate(inputValues[key]);
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

  const validateLoginForm = async () => {
    let validateError = false;
    const keys = Object.keys(loginFormSchema);
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

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // 1. Reset error messages if preveiously occuredS
      resetErrorMessages();

      // 2. Validate input values
      const validateError = await validateLoginForm();

      // 3. Check if there are no validation errors
      if (validateError) {
        return;
      }

      // 4. Login user
      const payload = { email, password };
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
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
      console.error("Error loging-in user");
      console.error(error.message);
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    } else {
      setIsUserNotLoggedIn(true);
    }
  }, []);

  return (
    isUserNotLoggedIn && (
      <div className="flex flex-col justify-center items-center h-screen gap-y-3">
        {/* Logo */}
        <Logo />
        {/* Form */}
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="w-[350px] flex flex-col gap-y-3 bg-white p-6 rounded-md"
        >
          {/* Email */}
          <FormControl>
            <Label>Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </FormControl>
          {/* Password */}
          <FormControl>
            <Label>Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          </FormControl>
          <Button type="submit" className="!bg-tc-blue">
            Login
          </Button>
        </form>
        {/* Signup link */}
        <div>
          Do not have an account?{" "}
          <Link
            to="/signup"
            className="text-tc-blue hover:bg-slate-300 rounded p-1"
          >
            Signup
          </Link>
        </div>
        {/* Reset Password link */}
        <div>
          <Link
            to="/forget-password"
            className="text-tc-blue hover:bg-slate-300 rounded p-1"
          >
            Forget password?
          </Link>
        </div>
      </div>
    )
  );
};

export default Login;
