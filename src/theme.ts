import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#b4b4b4",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
          fontWeight: "bold",
          padding: "10px 20px",
        },
        containedPrimary: {
          color: "#FFFFFF",
        },
        outlined: {
          "&:hover": {
            color: "#FFFFFF",
          },
        },
      },
    },
  },
  palette: {
    mode: "dark", // Use "dark" mode for your dark background theme
    background: {
      default: "#040404", // body background
      paper: "#1E1E1E", // card/box/container background
    },
    text: {
      primary: "#FFFFFF", // default text color
      secondary: "#1E1E1E", // alternative text color
    },
    primary: {
      main: "#14AE5C", // Accent color
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`, // Customize your font
    body1: {
      color: "#FFFFFF", // Default text for body1
    },
  },
});

export default theme;
