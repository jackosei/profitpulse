import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { logIn, signUp, logOut, auth } from "../firebaseAuth";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Store the full Firebase User object
      setIsAuthenticated(!!currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogIn = async (email: string, password: string) => {
    try {
      const userData = await logIn(email, password);
      setUser(userData); // Store the full Firebase User object
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userData = await signUp(email, password, displayName);
      setUser(userData); // Store the full Firebase User object
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
