import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import {Button, Dialog, DialogContent, DialogActions} from "@mui/material";


function Nav(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () =>{
    setAnchorEl(null);
  }

  const handleClickMyinfo = () => {

    setOpen(true);
  };
  const handleInfoClose = () => {
    setOpen(false);
    setAnchorEl(null)
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ABB6FF",
        contrastText: "#ffffff"
      }
    }
  });

  function handleCloseLogout(){
    setAnchorEl(null);
    props.onLogout();
  }

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            TO DO LIST
          </Typography>
          
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClickMyinfo}>내 정보 보기
                 
                </MenuItem>
                <MenuItem onClick={handleCloseLogout}>로그아웃</MenuItem>
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>
    </Box>
    <Dialog open={open} onClose={handleInfoClose}>
      <DialogContent>
          유저정보
      </DialogContent>
      <DialogActions>
        <Button onClick={handleInfoClose}>^_^</Button>
      </DialogActions>
    </Dialog>
    </ThemeProvider>
  );
}

export default Nav;