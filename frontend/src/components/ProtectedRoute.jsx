import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteToken,
  isLoggedIn as isUserLoggedIn,
} from "./../utils/auth.utils.js";

const ProtectedRoute = ({ Component }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn()) {
      setIsLoggedIn(true);
    } else {
      deleteToken();
      navigate("/");
    }
  });

  return isLoggedIn ? <Component /> : <></>;
};

export default ProtectedRoute;
