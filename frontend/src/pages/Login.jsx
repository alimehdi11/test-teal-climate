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
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
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
    setLoading(true);
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
    }finally {
        setLoading(false)
      }
  };

  useEffect(() => {
    if (isLoggedIn()) navigate("/dashboard");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-7">
      {/* Logo */}
      <VerticalLogo/>
      <div className="p-6 rounded-2xl max-w-[550px] w-[90%] px-[2vmax] py-9 shadow-xl border-t-[17px] border-tc-blue">
        <h1 className="font-bold text-xl text-center mt-6 mb-14">Welcome back to Teal Climate</h1>
        {/* <h1 className="text-center text-tc-green font-bold text-lg sm:text-xl mt-3 mb-7">
          Sign in to Teal Climate
        </h1> */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <FormControl>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="placeholder:text-zinc-400"
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
              className="placeholder:text-zinc-400 "
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon showPassword={showPassword} />
            </button>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormControl>
           <Button
            type="submit"
            className={`mt-5 mb-3 mx-auto max-w-[220px] w-[90%] flex justify-center items-center gap-2 ${loading && "bg-[#166EA7]"}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                Logging...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
        <div className="flex justify-between max-sm:flex-col">
          <div className="flex flex-wrap items-center justify-center">
            <p className="text-gray-400">Don't have an account?</p>
            <Link
              to="/signup"
              className="text-tc-blue hover:bg-slate-300 rounded p-1 underline"
            >
              Sign up
            </Link>
          </div>
          <Link to="/forget-password" className="text-center text-tc-blue block my-5 underline">
            Forget password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
