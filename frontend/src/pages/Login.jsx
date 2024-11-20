import { useContext, useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import { setToken, isLoggedIn, decodeToken } from "../utils/auth.js";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import FormControl from "../components/FormControl.jsx";
import Label from "../components/ui/Label.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { toast } from "react-toastify";
import EyeIcon from "../assets/icons/EyeIcon.jsx";
import { request } from "../utils/request.js";
import VerticalLogo from "../components/ui/VerticalLogo.jsx";

const Login = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    try {
      // Dynamically validate the field
      await Yup.reach(LoginSchema, name).validate(value);

      // Remove error for the field if validation passes
      setErrors((prevState) => {
        const newErrors = { ...prevState };
        delete newErrors[name];
        return newErrors;
      });
    } catch (err) {
      // Set error if validation fails
      setErrors((prevState) => ({ ...prevState, [name]: err.message }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrors({});
      
      // Validate all fields
      await LoginSchema.validate(formData, { abortEarly: false });

      // Make login request
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        "POST",
        formData
      );

      if (response.status === 200) {
        const data = await response.json();
        setToken(data.token);
        userContext.updateUserContext(decodeToken(data.token));
        navigate("/subscribe");
      } else {
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (err) {
      if (err.inner) {
        const validationErrors = err.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn()) navigate("/dashboard");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-7">
      {/* Logo */}
      <VerticalLogo/>
      <div className="p-6 rounded-2xl max-w-[550px] w-[90%] px-[2vmax] py-9 shadow-xl border-t-[12px] border-tc-blue">
        <h1 className="font-bold text-xl text-center">Welcome back!</h1>
        <h1 className="text-center text-tc-green font-bold text-lg sm:text-xl mt-3 mb-7">
          Sign in to Teal Climate
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Email */}
          <FormControl>
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="border border-tc-green placeholder:text-zinc-400"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormControl>
          {/* Password */}
          <FormControl className="relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="border border-tc-green placeholder:text-zinc-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon showPassword={showPassword} />
            </button>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormControl>
          <Button type="submit" className="py-2 sm:w-52 mx-auto">
            Login
          </Button>
        </form>
        <div className="flex justify-between max-sm:flex-col">
          <div className="flex flex-wrap items-center justify-center">
            <p>Do not have an account?</p>
            <Link
              to="/signup"
              className="text-tc-blue hover:bg-slate-300 rounded p-1"
            >
              Signup
            </Link>
          </div>
          <Link to="/forget-password" className="text-center block my-5">
            Forget password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
