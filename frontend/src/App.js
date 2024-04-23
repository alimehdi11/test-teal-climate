import { useEffect, useState, useContext } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  BrowserRouter,
} from "react-router-dom";

import Activities from "./pages/Activities";
// import EditActivity from "./pages/EditActivity";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Header/Navbar";
import API from "./Dashboard/API";
import Sidebar from "./components/Sidebar";
import Profile from "./profile/PortfolioForm";
import Page from "./profile/Page";
import Test from "./test/Test";
import LoginForm from "../src/Auth/LoginForm";
import SignUpForm from "../src/Auth/SignUpForm";
import "./global.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import Checkout from "./pages/Checkout";
import Completion from "./components/Completion";

function App() {
  const [userId, setUserId] = useState("");

  const handleLogin = (id) => {
    setUserId(id);
  };
  // const action = useNavigationType();
  // const location = useLocation();
  // const pathname = location.pathname;

  // useEffect(() => {
  //   if (action !== "POP") {
  //     window.scrollTo(0, 0);
  //   }
  // }, [action, pathname]);

  // useEffect(() => {
  //   let title = "";
  //   let metaDescription = "";

  //   switch (pathname) {
  //     case "/":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //   }

  //   if (title) {
  //     document.title = title;
  //   }

  //   if (metaDescription) {
  //     const metaDescriptionTag = document.querySelector(
  //       'head > meta[name="description"]'
  //     );
  //     if (metaDescriptionTag) {
  //       metaDescriptionTag.content = metaDescription;
  //     }
  //   }
  // }, [pathname]);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="dashboardad" element={<Navbar userName={userName} />} /> */}

          <Route
            path="/dashboard"
            element={<ProtectedRoute Component={Dashboard} />}
          />
          <Route
            path="/activites"
            // element={<Activities />}
            element={<ProtectedRoute Component={Activities} />}
          />
          <Route
            path="/activites/:id/edit"
            // element={<Activities />}
            element={<ProtectedRoute Component={Activities} />}
          />
          <Route
            path="/profile"
            // element={<Page userId={userId} />}
            element={<ProtectedRoute Component={Page} />}
          />
          <Route
            path="/profile/:id/edit"
            // element={<Page userId={userId} />}
            element={<ProtectedRoute Component={Page} />}
          />
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="/plans" element={<SubscriptionPlans />} />
          <Route path="/subscribe" element={<Checkout />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>

    //     <Routes>
    // <Route path="/" element={< LoginForm/>} />
    // <Route path="signup" element={< SignUpForm/>} />

    //   </Routes>
    // <LoginForm />

    //<SignUpForm />
    //  <Activities />
    //  <Test />
    //  <Page/>

    // <MapWrapper/>
  );
}
export default App;
