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
import crossIcon from "../assets/cross-icon.svg";
import rightIcon from "../assets/right-icon.svg";
import { request } from "../utils/request.js";
import VerticalLogo from "../components/ui/VerticalLogo.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  const userContext = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    companyName: "",
    agreeToTerms: false, // Checkbox state
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "One uppercase letter")
      .matches(/[a-z]/, "One lowercase letter")
      .matches(/\d/, "One number")
      .matches(/[\W_]/, "One special character")
      .required("Password is required"),
    firstName: Yup.string()
      .min(3, "At least 3 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "At least 3 characters")
      .required("Last name is required"),
    companyName: Yup.string().required("Company name is required"),
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must agree to the terms and conditions.") // Checkbox validation
      .required("You must agree to the terms and conditions."),
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({ ...prevState, [name]: fieldValue }));
  };

 const handlePasswordChange = (event) => {
    const { value } = event.target;

    setFormData((prevState) => ({ ...prevState, password: value }));

    setPasswordCriteria({
      hasLowercase: /[a-z]/.test(value),
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[\W_]/.test(value),
      hasMinLength: value.length >= 8,
    });
  };

  

  const handleSubmit = async (event) => {
    setLoading(true);
    // if (errors.password) {
      
    // }
    // errors.password && setPasswordFocused(true)
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
        // Collect validation errors
        const validationErrors = err.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) navigate("/dashboard");
  }, []);

  const fields = [
    { name: "firstName", label: "First name" },
    { name: "lastName", label: "Last name" },
    { name: "companyName", label: "Company name" },
    { name: "email", label: "Email" },
    { name: "password", label: "Password" },
  ];
const passwordErrors = [
        { label: "One lowercase character", isValid: passwordCriteria.hasLowercase },
        { label: "One uppercase character", isValid: passwordCriteria.hasUppercase },
        { label: "One number", isValid: passwordCriteria.hasNumber },
        { label: "One special character", isValid: passwordCriteria.hasSpecialChar },
        { label: "Minimum 8 characters", isValid: passwordCriteria.hasMinLength },
      ]
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-7 py-10">
      {/* Logos */}
      <VerticalLogo />
      <div className="p-6 rounded-2xl max-w-[600px] w-[90%] px-[2vmax] py-9 shadow-xl border-t-[17px] border-[#197EC6] bg-white">
        <h1 className="text-center font-bold text-lg sm:text-xl mt-3 mb-12">Create new account</h1>
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
                    className="placeholder:text-zinc-400 placeholder:italic"
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
                  type={
                    field.name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : field.name === "email"
                      ? "email"
                      : "text"
                  }
                     onFocus={() =>
                    field.name === "password" && setPasswordFocused(true)
                  }
                  onBlur={() => field.name === "password" && setPasswordFocused(false)}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={field.name == "password" ? handlePasswordChange :handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="placeholder:text-zinc-400 placeholder:italic"
                />
                {field.name === "password" && (
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    <EyeIcon showPassword={showPassword} />
                  </button>
                )}
             {

  (field.name === "password" &&  passwordFocused || (field.name === "password" && errors.password)) && (
    <div className="">
      {passwordErrors.map((criterion, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 ${
            criterion.isValid ? "text-green-500" : "text-red-500"
          }`}
        >
          {/* <span> */}
            {criterion.isValid ? (
             <img src={rightIcon} alt="" className="w-5" />
            ) : (
             <img src={crossIcon} alt="" className="w-5"/>
            )}
          <span>{criterion.label}</span>
        </div>
      ))}
    </div>
  )
}
           
                  {(errors[field.name] && field.name != "password" ) && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
          
              </FormControl>
            ))
          }

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
              By signing up, I agree to the <span className="text-blue-500 underline">Terms and Conditions</span>
            </label>
          </div>
          {errors.agreeToTerms && <ErrorMessage className="-my-3">{errors.agreeToTerms}</ErrorMessage>}

          <Button
            type="submit"
            className={`my-5 mx-auto max-w-[220px] w-[90%] flex justify-center items-center gap-2 ${loading && "bg-[#00b38c]"}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="flex flex-wrap items-center justify-center mt-4">
          <p>Already have an account?</p>
          <Link to="/login" className="text-tc-blue underline hover:bg-slate-300 rounded p-1">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
