import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogIn: React.FC = () => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await logIn(email, password);
      localStorage.setItem("userToken", "sampleToken"); // Set token after login
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let errorMessage = "You entered an invalid credential.";
      if (err.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "User not found.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogIn}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifySelf: "center",
          marginTop: 1,
        }}
      >
        <Typography variant="subtitle2" className="m-4">
          New User?
        </Typography>
        <Button
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate("/signup")}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default LogIn;
