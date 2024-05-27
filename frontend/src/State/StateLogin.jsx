import React, { useState } from "react";
import LoginForm from "../Auth/LoginForm";
import Navbar from "../Header/Navbar";

const StateLogin = () => {
  const [userName, setUserName] = useState("");

  return (
    <div>
      <LoginForm setUserName={setUserName} />
      <Navbar userName={userName} />
    </div>
  );
};

export default StateLogin;
