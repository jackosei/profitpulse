import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  // const isAuthenticated = !!localStorage.getItem("userToken"); // Simple auth check

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on app load
    const userToken = localStorage.getItem("userToken");
    setIsAuthenticated(!!userToken);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
