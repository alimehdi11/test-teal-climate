import Input from "../components/ui/Input";
import FormControl from "../components/FormControl";
import Label from "../components/ui/Label";
import VerticalLogo from "../components/ui/VerticalLogo";
import { useState } from "react";
import Button from "../components/ui/Button";
import {  useLocation, useNavigate } from "react-router-dom";
import { request } from "../utils/request";
import { toast } from "react-toastify";
import * as yup from "yup";
import keyIcon from "../assets/key-icon.svg";
import backArrow from "../assets/back-arrow-icon.svg";
import EyeIcon from "../assets/icons/EyeIcon";
import rightIcon from "../assets/right-icon.svg"
import crossIcon from "../assets/cross-icon.svg"
const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  // Yup schema for password validation
  const passwordSchema = yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required");

  const handlePasswordChange = (event) => {
    const { value } = event.target;

    setResetPassword(value);

    setPasswordCriteria({
      hasLowercase: /[a-z]/.test(value),
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[\W_]/.test(value),
      hasMinLength: value.length >= 8,
    });
  };

  const passwordErrors = [
    { label: "One lowercase character", isValid: passwordCriteria.hasLowercase },
    { label: "One uppercase character", isValid: passwordCriteria.hasUppercase },
    { label: "One number", isValid: passwordCriteria.hasNumber },
    { label: "One special character", isValid: passwordCriteria.hasSpecialChar },
    { label: "Minimum 8 characters", isValid: passwordCriteria.hasMinLength },
  ]

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validate password
      await passwordSchema.validate(resetPassword);

      setLoading(true);
      const payload = { password: resetPassword };
      const url = `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password?token=${token}`;
      const response = await request(url, "POST", payload);

      if (response.status !== 200) {
        const responseData = await response.json();
        toast.error(responseData.error || "An error occurred.");
        throw new Error(responseData.error || "An error occurred.");
      }

      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (error) {
      if (error.name === "ValidationError") {
        setErrors(error.message);
      } else {
        toast.error(error.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] gap-y-8 py-10">
      {/* Logo */}
      <VerticalLogo />
      <div className="p-6 rounded-2xl max-w-[550px] w-[90%] px-[2vmax] py-9 shadow-xl border-t-[17px] bg-white border-tc-blue">
        <Button onClick={() => navigate("/login")} className="flex gap-1 justify-center ms-auto min-w-[120px]">
          <img src={backArrow} alt="" />
          <span>Sign in</span>
        </Button>
        <div className="w-12 h-12 rounded-full bg-tc-green flex justify-center items-center mx-auto">
          <img src={keyIcon} alt="Key Icon" />
        </div>
        <h1 className="font-bold text-xl text-center my-4">Set new Password</h1>
        <h1 className="text-center mb-7 text-sm">
          Your new password must be unique and different <br /> from the previous one.
        </h1>
        <form method="POST" onSubmit={handleSubmit}>
          <FormControl className="relative">
            <Label>New Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              onFocus={() =>
                setPasswordFocused(true)
              }
              onBlur={() => setPasswordFocused(false)}
              value={resetPassword}
              placeholder="Enter new password"
              onChange={handlePasswordChange}
              className="placeholder:text-zinc-400 placeholder:italic"

            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon showPassword={showPassword} />
            </button>
            {

              (passwordFocused ||  errors.password ) && (
                <div className="">
                  {passwordErrors.map((criterion, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 ${criterion.isValid ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {/* <span> */}
                      {criterion.isValid ? (
                        <img src={rightIcon} alt="" className="w-5" />
                      ) : (
                        <img src={crossIcon} alt="" className="w-5" />
                      )}
                      <span>{criterion.label}</span>
                    </div>
                  ))}
                </div>
              )
            }
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
        {/* Login link */}
      </div>
    </div>
  );
};

export default ResetPassword;
