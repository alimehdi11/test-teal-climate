import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  isLoggedIn as isUserLoggedIn,
  isSubscribed,
} from "./../utils/auth.utils.js";
import { UserContext } from "./../contexts/UserContext.jsx";

const ProtectedRoute = ({ Component }) => {
  const [isLoggedInAndSubscribed, setIsLoggedInAndSubscribed] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (isUserLoggedIn() && isSubscribed()) {
      setIsLoggedInAndSubscribed(true);
    } else {
      navigate("/plans");
    }
  });

  return isLoggedInAndSubscribed ? <Component /> : <></>;
};

export default ProtectedRoute;
