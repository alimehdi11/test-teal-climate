import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Activities from "./pages/activities/Activities";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import Checkout from "./pages/Checkout";
import Completion from "./pages/Completion";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Eeio from "./pages/eeio/Eeio";
import SubscriptionSettings from "./pages/settings/SubscriptionSettings.jsx";
import AccountSettings from "./pages/settings/AccountSettings.jsx";
import AccountSettingsEdit from "./pages/settings/AccountSettingsEdit.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="/profile" element={<ProtectedRoute Component={Profile} />}>
          <Route
            path=":id/edit"
            element={<ProtectedRoute Component={Profile} />}
          />
        </Route>
        <Route path="/eeio" element={<ProtectedRoute Component={Eeio} />}>
          <Route
            path=":id/:pi/edit"
            element={<ProtectedRoute Component={Eeio} />}
          />
        </Route>
        <Route
          path="/settings/account"
          element={<ProtectedRoute Component={AccountSettings} />}
        />
        <Route
          path="/settings/account/edit"
          element={<ProtectedRoute Component={AccountSettingsEdit} />}
        />
        <Route
          path="/settings/subscription"
          element={<ProtectedRoute Component={SubscriptionSettings} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
