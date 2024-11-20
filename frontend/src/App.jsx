import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
// Navbar and Footer
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx"; // Import the Footer component
// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Activities from "./pages/activities/Activities";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import Checkout from "./pages/Checkout";
import Completion from "./pages/Completion";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Setting from "./pages/Setting.jsx";
import Account from "./pages/Account.jsx";
import AccountEdit from "./pages/AccountEdit.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Report from "./pages/report/Report";
import ReportCharts from "./pages/report/ReportCharts.jsx";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const showNavAndFooter = ["/subscribe", "/completion"].includes(location.pathname);

  return (
    <>
      {showNavAndFooter && <Navbar />}
      {children}
      {showNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route
            path="/report"
            element={<ProtectedRoute Component={Report} />}
          />
          <Route
            path="/generatingreport"
            element={<ProtectedRoute Component={ReportCharts} />}
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plans" element={<SubscriptionPlans />} />
          <Route path="/subscribe" element={<Checkout />} />
          <Route path="/completion" element={<Completion />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute Component={Dashboard} />}
          />
          <Route
            path="/activities"
            element={<ProtectedRoute Component={Activities} />}
          >
            <Route
              path=":id/edit"
              element={<ProtectedRoute Component={Activities} />}
            />
          </Route>
          <Route
            path="/profile"
            element={<ProtectedRoute Component={Profile} />}
          >
            <Route
              path=":id/edit"
              element={<ProtectedRoute Component={Profile} />}
            />
          </Route>
          <Route
            path="/account"
            element={<ProtectedRoute Component={Account} />}
          />
          <Route
            path="/account/edit"
            element={<ProtectedRoute Component={AccountEdit} />}
          />
          <Route
            path="/setting"
            element={<ProtectedRoute Component={Setting} />}
          />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
