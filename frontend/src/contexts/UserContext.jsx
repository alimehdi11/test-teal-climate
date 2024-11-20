import { createContext, useState, useEffect } from "react";
import { getToken, decodeToken, isLoggedIn } from "./../utils/auth.js";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
const [userTransictionDetails, setUserTransictionDetails] = useState({});
  const updateUserContext = (userObj) => {
    setUser(() => userObj);
  };

  useEffect(() => {
    if (isLoggedIn()) {
      const token = getToken();
      const payload = decodeToken(token);
      updateUserContext(payload);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUserContext ,setUserTransictionDetails,userTransictionDetails}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
