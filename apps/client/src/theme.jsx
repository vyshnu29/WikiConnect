import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3", // your primary color
    },
    secondary: {
      main: "#FF9900", // your secondary color
    },
    background: {
      default: "#f0f0f0", // default background color
    },
    text: {
      primary: "#333", // primary text color
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // your preferred font
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // disable uppercase for buttons
        },
      },
    },
  },
});

export default theme;