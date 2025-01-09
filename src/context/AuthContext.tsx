import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { logIn, signUp, logOut } from "../firebaseAuth";

type AuthContextType = {
  isAuthenticated: boolean;
  user: { email: string; displayName: string | null };
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    email: string;
    displayName: string | null;
  }>({
    email: "",
    displayName: null,
  });
  const navigate = useNavigate();

  const handleLogIn = async (email: string, password: string) => {
    try {
      const userData = await logIn(email, password);
      setUser({
        email: userData.email as string,
        displayName: userData.displayName,
      });
      setIsAuthenticated(true);
      localStorage.setItem("userToken", userData.uid); // Store token in localStorage
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Rethrow to handle errors in the component
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userData = await signUp(email, password, displayName);
      setUser({ email: userData.email as string, displayName });
      setIsAuthenticated(true);
      localStorage.setItem("userToken", userData.uid);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      throw error; // Rethrow to handle errors in the component
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setUser({ email: "", displayName: null });
      setIsAuthenticated(false);
      localStorage.removeItem("userToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Rethrow to handle errors if needed
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        logIn: handleLogIn,
        signUp: handleSignUp,
        logOut: handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
