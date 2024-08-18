import Input from "../components/ui/Input";
import FormControl from "../components/FormControl";
import Label from "../components/ui/Label";
import Logo from "../components/ui/Logo";
import { useState } from "react";
import Button from "../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { request } from "../utils/request";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        password: resetPassword,
      };
      const url = `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password?token=${token}`;
      const response = await request(url, "POST", payload);
      if (response.status !== 200) {
        let responseData = await response.json();
        toast.error(responseData.error);
        throw new Error(responseData.error);
      }
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-y-3">
        {/* Logo */}
        <Logo />
        <form
          className="w-[350px] flex flex-col gap-y-3"
          onSubmit={handleSubmit}
        >
          <FormControl>
            <Label>Enter your new password</Label>
            <Input
              type="password"
              value={resetPassword}
              onChange={(event) => {
                setResetPassword(event.target.value);
              }}
            />
          </FormControl>
          <Button type="submit" className="bg-tc-blue text-white text-base">
            Submit
          </Button>
        </form>
        {/* Login link */}
        <div>
          <Link
            to="/login"
            className="text-tc-blue hover:bg-slate-300 rounded p-1"
          >
            Login
          </Link>
        </div>
      </div>
      <ToastContainer
        theme={"colored"}
        hideProgressBar={true}
        transition={Slide}
        autoClose={1500}
        pauseOnFocusLoss={false}
        style={{
          "--toastify-font-family": "Poppins",
          "--toastify-color-success": "#00CC9CFF",
          "--toastify-color-warning": "#e74c3c",
        }}
      />
    </>
  );
};

export default ResetPassword;
