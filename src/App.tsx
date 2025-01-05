import { useState } from "react";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { Box } from "@mui/material";

const App: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  function toggleAuthState() {
    setIsSignUp((prev) => !prev);
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: 2,
      }}
    >
      {/* <Button
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
      </Button> */}
      {isSignUp ? (
        <SignUp handleAuthState={toggleAuthState} />
      ) : (
        <LogIn handleAuthState={toggleAuthState} />
      )}
    </Box>
  );
};

export default App;
