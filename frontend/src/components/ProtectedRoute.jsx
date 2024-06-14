import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn, isSubscribed } from "./../utils/auth.utils.js";

const ProtectedRoute = ({ Component }) => {
  const [isLoggedInAndSubscribed, setIsLoggedInAndSubscribed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      if (isSubscribed()) {
        setIsLoggedInAndSubscribed(true);
      } else {
        navigate("/plans");
      }
    } else {
      navigate("/login");
    }
  });

  return isLoggedInAndSubscribed ? <Component /> : <></>;
};

export default ProtectedRoute;
