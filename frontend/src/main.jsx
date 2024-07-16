import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { DataProvider } from "./contexts/DataContext.jsx";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-[#FBFBFB]">
      <UserProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </UserProvider>
    </div>
  </React.StrictMode>
);
