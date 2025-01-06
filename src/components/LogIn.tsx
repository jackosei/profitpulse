import React, { useState } from "react";
import { logIn } from "../firebaseAuth";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// export interface AuthProps {
//   handleAuthState: () => void; // The type for the handleAccessState function
// }

const LogIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // After successful login:
  localStorage.setItem("userToken", "sampleToken"); // Set token
  navigate("/dashboard"); // Redirect to dashboard

  const handleLogIn = async () => {
    try {
      await logIn(email, password);
      alert("Login successful!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
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
      >
        Log In
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
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default LogIn;
