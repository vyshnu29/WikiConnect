import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuthContext } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';



function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

// eslint-disable-next-line react/prop-types
function ResponsiveAppBar({ children }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { services, state  } = useAuthContext()
  const history = useHistory();

  React.useEffect(() => {
    services.getUserDetails();
  }, []);


  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogOut = async () => {
    // eslint-disable-next-line no-console
    console.log('logout');
    try {
      await services.logout();
      history?.push('/login');
    } catch (error) {
      console.log(error)
      // showSnackbar('Failed to logout', 'error');
    }
  }

  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log('dggfgf',state?.userDetails)

  return (
    <>
      <AppBar     
      
        sx={{backgroundColor:'#333333'}}
        elevation={0}
       >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            WIKI CONNECT
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ width: 24, height: 24 }} {...stringAvatar(`${state?.userDetails?.firstName} ${state?.userDetails?.lastName}`)} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key={'LogOut'} onClick={handleLogOut}>
                  <Typography textAlign="center">{'LogOut'}</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
        </Box>
    </>
  );
}
export default ResponsiveAppBar;
