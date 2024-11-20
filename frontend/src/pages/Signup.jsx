import { useContext, useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
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

const Signup = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    companyName: "",
    agreeToTerms: false, // Checkbox state is part of the form data
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Password is required"),
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "Last name must be at least 3 characters")
      .required("Last name is required"),
    companyName: Yup.string().required("Company name is required"),
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must agree to the terms and conditions.") // Validation for checkbox
      .required("You must agree to the terms and conditions."),
  });

  const handleChange = async (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({ ...prevState, [name]: fieldValue }));

    try {
      // Validate individual field dynamically
      await Yup.reach(SignupSchema, name).validate(fieldValue);

      // Remove error for the field if validation passes
      setErrors((prevState) => {
        const newErrors = { ...prevState };
        delete newErrors[name];
        return newErrors;
      });
    } catch (err) {
      // Set error message if validation fails
      setErrors((prevState) => ({
        ...prevState,
        [name]: err.message,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrors({});
      // Validate the entire form
      await SignupSchema.validate(formData, { abortEarly: false });

      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
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
        // Validation errors
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

  const fields = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "companyName", label: "Company Name" },
    { name: "email", label: "Email" },
    { name: "password", label: "Password" },
  ];

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-7">
      {/* Logos */}
    <VerticalLogo/>
      <div className="p-6 rounded-2xl max-w-[600px] w-[90%] px-[2vmax] py-9 shadow-xl border-t-[12px] border-[#197EC6]">
        <h1 className="text-center font-bold text-xl">Join us for sustainability!</h1>
        <h1 className="text-center text-tc-green font-bold text-lg sm:text-xl mt-3 mb-7">Create new Account</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* First Name and Last Name in one line */}
          <div className="flex flex-col sm:flex-row gap-4">
            {fields
              .filter((field) => ["firstName", "lastName"].includes(field.name))
              .map((field) => (
                <FormControl key={field.name} className="flex-1">
                  <Label>{field.label}</Label>
                  <Input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="border border-tc-green placeholder:text-zinc-400"
                  />
                  {errors[field.name] && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
                </FormControl>
              ))}
          </div>

          {/* Remaining Fields */}
          {fields
            .filter((field) => !["firstName", "lastName"].includes(field.name))
            .map((field) => (
              <FormControl key={field.name} className={field.name === "password" ? "relative" : ""}>
                <Label>{field.label}</Label>
                <Input
                  type={field.name === "password" ? (showPassword ? "text" : "password") : field.name === "email" ? "email" : "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={
                    field.name === "email" ? "abc@example.com" : `Enter ${field.label.toLowerCase()}`
                  }
                  className="border border-tc-green placeholder:text-zinc-400"
                />
                {field.name === "password" && (
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    <EyeIcon showPassword={showPassword} />
                  </button>
                )}
                {errors[field.name] && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
              </FormControl>
            ))}

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <label htmlFor="agreeToTerms" className="text-sm">
              By signing up, I agree to the <span className="text-blue-500">Terms and Conditions</span>
            </label>
          </div>
          {errors.agreeToTerms && <ErrorMessage className="-mt-3">{errors.agreeToTerms}</ErrorMessage>}

          <Button type="submit" className="py-2 sm:w-52 mx-auto">
            Sign Up
          </Button>
        </form>

        <div className="flex flex-wrap items-center justify-center mt-6">
          <p>Already have an account? Sign in</p>
          <Link to="/login" className="text-tc-blue hover:bg-slate-300 rounded p-1">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
