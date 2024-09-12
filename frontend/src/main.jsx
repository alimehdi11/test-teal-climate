import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { DataProvider } from "./contexts/DataContext.jsx";
import { PeriodProvider } from "./contexts/PeriodProvider.jsx";
import "./global.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-tc-background">
      <UserProvider>
        <DataProvider>
          <PeriodProvider>
            <App />
          </PeriodProvider>
        </DataProvider>
      </UserProvider>
      <ToastContainer
        theme={"colored"}
        hideProgressBar={true}
        transition={Slide}
        autoClose={1500}
        pauseOnFocusLoss={false}
        style={{
          "--toastify-font-family": "Poppins",
          "--toastify-color-success": "#00CC9CFF",
          "--toastify-color-warning": "#e74c3c",
        }}
      />
    </div>
  </React.StrictMode>
);
