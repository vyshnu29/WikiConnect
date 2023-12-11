import  { createContext, useContext, useState } from 'react';
import SnackbarAlert from '../shared/components/Alerts';

const SnackbarContext = createContext();

// eslint-disable-next-line react/prop-types
export const SnackbarContextProvider = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState({ content: '', open: false, type: 'success' });

  const showSnackbar = (content, type) => {
    setSnackbarData({ content, open: true, type });
  };

  const hideSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar, snackbarData }}>
      {children}
      <SnackbarAlert />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarContextProvider');
  }
  return context;
};
