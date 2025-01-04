import { useState } from "react";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { Button, Box } from "@mui/material";

const App: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <Box sx={{ textAlign: "center", padding: 2 }}>
      <Button
        onClick={() => setIsSignUp(true)}
        variant="contained"
        sx={{ margin: 1 }}
      >
        Sign Up
      </Button>
      <Button
        onClick={() => setIsSignUp(false)}
        variant="outlined"
        sx={{ margin: 1 }}
      >
        Log In
      </Button>
      {isSignUp ? <SignUp /> : <LogIn />}
    </Box>
  );
};

export default App;
