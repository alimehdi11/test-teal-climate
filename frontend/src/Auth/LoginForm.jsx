import { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Nav from "./Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../contexts/UserContext";
import { setToken, isLoggedIn, decodeToken } from "./../utils/auth.utils.js";

const LoginForm = ({ onLogin }) => {
  // Accept onLogin prop
  const [loginStatus, setLoginStatus] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
          values
        );
        console.log("Response data:", response.data);

        if (response.status === 200) {
          // If login is successful, update login status, reset form, and navigate to the dashboard
          setLoginStatus(response.data.message); // Update login status with the message from response
          formik.resetForm();

          const userData = response.data.user;
          setUserName(userData.name); // Set the user's name

          localStorage.setItem("userId", userData.id); // Store user ID in local storage

          setToken(response.data.token);

          const user = decodeToken(response.data.token);
          userContext.updateUserContext(user);

          console.log("UserID:", userData.id);
          onLogin(userData.id); // Call onLogin with the fetched userId

          navigate("/dashboard"); // Redirect to the dashboard page
        } else {
          // Handle different status codes
          if (response.status === 401) {
            const data = response.data;
            if (data.error === "Invalid email or password") {
              if (data.error.includes("email not found")) {
                setLoginStatus("Email not found");
              } else {
                setLoginStatus("Invalid password");
              }
            } else {
              throw new Error(data.error || "Error logging in");
            }
          } else {
            throw new Error(response.data.error || "Error logging in");
          }
        }
      } catch (error) {
        console.error("Error logging in:", error.message);
        setLoginStatus("Invalid password");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Nav userName={userName} />
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 mt-8"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.errors.email && formik.touched.email && "border-red-500"
              }`}
              id="email"
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                formik.errors.password &&
                formik.touched.password &&
                "border-red-500"
              }`}
              id="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Signing In....." : "Sign In"}
            </button>
          </div>
          {loginStatus && (
            <div className="mt-4 text-center">
              <p className="text-red-500">{loginStatus}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
