import { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Nav from "./Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../contexts/UserContext";
import { setToken, isLoggedIn, decodeToken } from "./../utils/auth.utils.js";

const SignUpForm = () => {
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { name, email, password, confirmPassword } = values;

      if (password !== confirmPassword) {
        throw new Error(
          "Passwords do not match. Please make sure the passwords match."
        );
      }

      const userData = { name, email, password };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        userData
      );

      if (response.status === 200) {
        setRegistrationStatus("Registration successful");
        resetForm();

        setToken(response.data.token);

        const user = decodeToken(response.data.token);
        userContext.updateUserContext(user);

        navigate("/plans");
      } else {
        throw new Error(response.data.message); // Assuming server returns an error message
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
      setRegistrationStatus(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const userContext = useContext(UserContext);
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  });

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center h-screen">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .required("Required")
              .min(6, "Password must be at least 6 characters"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 lg:w-1/3">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs italic">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="flex mb-4 gap-4">
                <div className="w-1/2 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-xs italic">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="w-1/2 ml-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-xs italic">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
              </div>
              {registrationStatus && (
                <div className="mt-4 text-center">
                  <p className="text-red-500">{registrationStatus}</p>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignUpForm;
