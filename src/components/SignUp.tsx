import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Box, Typography } from "@mui/material";

// import { AuthProps } from "./LogIn";

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    // Simple validation to check if all fields are filled
    if (!displayName || !email || !password) {
      setError("Please fill all fields correctly.");
      return;
    }

    try {
      await signUp(email, password, displayName);
      alert("Signup successful!");
      // TODO: redirect or update state here after successful signup
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (err.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "The email address is already in use.";
      }
      setError(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 6,
        backgroundColor: "background.paper",
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "left", fontWeight: "bold" }}
      >
        Sign Up
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          fullWidth
          label="How would you like to be addressed?"
          type="text"
          margin="normal"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Please enter your email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Please enter your password"
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
          type="submit" // Change to type submit
          sx={{ marginTop: 2, fontWeight: "bold" }}
        >
          Create Account
        </Button>
      </form>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifySelf: "center",
          marginTop: 1,
        }}
      >
        <Typography variant="subtitle2" className="m-4">
          Existing User?
        </Typography>
        <Button
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
