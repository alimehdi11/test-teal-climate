import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Page from "./profile/Page";
import ProtectedRoute from "./components/ProtectedRoute";
// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Activities from "./pages/Activities";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import Checkout from "./pages/Checkout";
import Completion from "./pages/Completion";
import Account from "./pages/Account";

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
          path="/activites"
          element={<ProtectedRoute Component={Activities} />}
        >
          <Route
            path=":id/edit"
            element={<ProtectedRoute Component={Activities} />}
          />
        </Route>
        <Route path="/profile" element={<ProtectedRoute Component={Page} />}>
          <Route
            path=":id/edit"
            element={<ProtectedRoute Component={Page} />}
          />
        </Route>
        <Route
          path="/account"
          element={<ProtectedRoute Component={Account} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
