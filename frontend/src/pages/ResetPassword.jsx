import Input from "../components/ui/Input";
import FormControl from "../components/FormControl";
import Label from "../components/ui/Label";
import VerticalLogo from "../components/ui/VerticalLogo";
import { useState } from "react";
import Button from "../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { request } from "../utils/request";
import { toast } from "react-toastify";
import * as yup from "yup";
import keyIcon from "../assets/key-icon.svg";
import backArrow from "../assets/back-arrow-icon.svg";
import EyeIcon from "../assets/icons/EyeIcon";

const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleChange = async (event) => {
    const { value } = event.target;
    setResetPassword(value);

    try {
      await passwordSchema.validate(value);
      setErrors(""); // Clear error if valid
    } catch (error) {
      setErrors(error.message); // Set validation error
    }
  };

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
    <div className="flex flex-col justify-center items-center h-[90vh] gap-y-8">
      {/* Logo */}
      <VerticalLogo />
      <div className="p-6 rounded-2xl max-w-[550px] w-[90%] px-[2vmax] py-9 shadow-xl border-t-[12px] border-tc-blue">
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
              value={resetPassword}
              placeholder="Enter new password"
              onChange={handleChange}
              className="border border-tc-green placeholder:text-zinc-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon showPassword={showPassword} />
            </button>
            {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
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
        <div>
          <Link to="/login" className="flex gap-2 justify-center">
            <img src={backArrow} alt="Back Arrow" />
            <span>Back to log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
