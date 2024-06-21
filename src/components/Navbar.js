import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu.js';
import AdbIcon from '@mui/icons-material/Adb.js';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const history = useHistory();
  const { updateCredentials } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    setIsLoading(true);

    // Update credentials using context
    updateCredentials(username, password);

    setIsLoading(false);
    setOpen(false);
    history.push('/');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pages = [
    { title: 'Detection', path: '/detection' },
    { title: 'Extraction', path: '/extraction' },
    { title: 'Detract', path: '/detract' },
    { title: 'Status', path: '/status' },
    { title: 'Q&A', path: '/QandA' },
    { title: 'Dashboard', path: '/Dashboard'}
  ];


  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #3f51b5, #5a55ae)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DocumentAI
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: location.pathname === page.path ? 'yellow' : 'white',
                    display: 'block',
                    textTransform: 'none',
                    fontWeight: location.pathname === page.path ? 'bold' : 'normal',
                    borderBottom: location.pathname === page.path ? '2px solid yellow' : 'none',
                    transition: 'border-bottom 0.3s ease',
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            <Button
              color="inherit"
              onClick={handleClickOpen}
              sx={{
                ml: 'auto',
                display: { xs: 'none', md: 'block' },
              }}
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Login Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
              <CircularProgress size={50} color="inherit" />
            </Box>
          ) : (
            <Box>
              <TextField
                type="text"
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
