import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import Activities from "./pages/Activities";
// import EditActivity from "./pages/EditActivity";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Header/Navbar";
import API from "./Dashboard/API";
import Sidebar from "./components/Sidebar";
import Profile from "./profile/Profile";
import Page from "./profile/Page";
import Test from "./test/Test";
import LoginForm from "../src/Auth/LoginForm";
import SignUpForm from "../src/Auth/SignUpForm";
import "./global.css";

function App() {
  const [userId, setUserId] = useState("");

  const handleLogin = (id) => {
    setUserId(id);
  };
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      {/* <Route path="dashboardad" element={<Navbar userName={userName} />} /> */}

      <Route path="dashboard" element={<Dashboard />} />
      <Route path="activites" element={<Activities />} />
      <Route path="activites/:id/edit" element={<Activities />} />
      <Route path="profile" element={<Page userId={userId} />} />
      <Route path="/profile/:id/edit" element={<Page userId={userId} />} />
      <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
      <Route path="signup" element={<SignUpForm />} />
    </Routes>

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
