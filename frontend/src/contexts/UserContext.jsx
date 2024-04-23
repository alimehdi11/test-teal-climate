import { createContext, useState, useEffect } from "react";
import { getToken, decodeToken, isLoggedIn } from "./../utils/auth.utils.js";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const updateUserContext = (userObj) => {
    setUser(() => userObj);
  };

  useEffect(() => {
    if (isLoggedIn()) {
      const token = getToken();
      const payload = decodeToken(token);
      updateUserContext({
        id: payload.id,
        name: payload.name,
        email: payload.email,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
