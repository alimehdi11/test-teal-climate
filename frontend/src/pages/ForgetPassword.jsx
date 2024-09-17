import Input from "../components/ui/Input";
import FormControl from "../components/FormControl";
import Label from "../components/ui/Label";
import Logo from "../components/ui/Logo";
import { useState } from "react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { request } from "../utils/request";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/auth/forget-password`;
      const payload = {
        email,
      };
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
      setEmail("");
      setEmailSent(true);
    } catch (error) {
      console.error(error);
      toast.error(error.error);
    }
  };

  return (
    <>
      {emailSent ? (
        <div className="flex flex-col justify-center items-center h-screen">
          Check email inbox
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen gap-y-3">
          {/* Logo */}
          <Logo />
          <form
            method="POST"
            onSubmit={handleSubmit}
            className="w-[350px] flex flex-col gap-y-3 bg-white p-6 rounded-md"
          >
            <FormControl>
              <Label>Enter your email</Label>
              <Input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </FormControl>
            <Button type="submit" className="!bg-tc-blue">
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
      )}
    </>
  );
};

export default ResetPassword;
