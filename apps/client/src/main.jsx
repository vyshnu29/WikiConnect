import React from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme.jsx';
import { SnackbarContextProvider } from './contexts/SnackBarContext.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
      <AuthContextProvider>
      <App />
      </AuthContextProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
