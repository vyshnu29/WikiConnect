import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSnackbar } from '../../contexts/SnackBarContext';


//Alerts for snackbar
const SnackbarAlert = () => {
  const { snackbarData, hideSnackbar } = useSnackbar();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideSnackbar();
  };

  useEffect(() => {
    if (snackbarData.open) {
      setTimeout(() => {
        hideSnackbar();
      }, 4000); // Set the duration to close the Snackbar after 4 seconds (adjust as needed)
    }
  }, [snackbarData.open, hideSnackbar]);

  return (
    <Snackbar
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={snackbarData.open}
      onClose={handleCloseSnackbar}
    >
      <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarData.type} sx={{ width: '100%' }}>
        {snackbarData.content}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarAlert;
