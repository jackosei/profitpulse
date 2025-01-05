import { useState } from "react";
import { signUp } from "../firebaseAuth";
import { TextField, Button, Box, Typography } from "@mui/material";

import { AuthProps } from "./LogIn";

const SignUp: React.FC<AuthProps> = ({ handleAuthState }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      alert("Signup successful!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
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
        onClick={handleSignUp}
        sx={{ marginTop: 2, fontWeight: "bold" }}
      >
        Create Account
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
          Existing User?
        </Typography>
        <Button
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
          onClick={handleAuthState}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
