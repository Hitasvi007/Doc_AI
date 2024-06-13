import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Container, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Navbar from './Navbar';
import { Link, useHistory } from 'react-router-dom';
import DetectionIcon from '@mui/icons-material/Search';
import ExtractionIcon from '@mui/icons-material/FileDownload';
import StatusIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url(/path/to/your/background-image.jpg)', // Provide the correct path to your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '16px',
  },
  card: {
    margin: '16px',
    minWidth: 200,
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
  cardHeader: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#3f51b5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '16px',
  },
  button: {
    marginTop: '16px',
    textTransform: 'none',
    fontSize: '1rem',
    padding: '8px 16px',
    borderRadius: '8px',
  },
  icon: {
    marginBottom: '8px',
    fontSize: '3rem', // Increase icon size for better visibility
  },
});

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    try {
      const response = await fetch('YOUR_LOGIN_API_URL', {
        method: 'GET', // Change the method as per your API's requirements
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        // Authentication successful
        history.push('/dashboard'); // Redirect to dashboard or any other route
      } else {
        // Authentication failed
        alert('Login failed. Please check your credentials.');
        setIsLoading(false);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar handleLoginOpen={handleClickOpen} />
      <Container className={classes.container}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <>
                <DetectionIcon className={classes.icon} />
                <Typography variant="h6">Detection</Typography>
              </>
            }
          />
          <CardContent className={classes.cardContent}>
            <Button
              component={Link}
              to="/detection"
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<DetectionIcon />}
            >
              Go to Detection
            </Button>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <>
                <ExtractionIcon className={classes.icon} />
                <Typography variant="h6">Extraction</Typography>
              </>
            }
          />
          <CardContent className={classes.cardContent}>
            <Button
              component={Link}
              to="/extraction"
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<ExtractionIcon />}
            >
              Go to Extraction
            </Button>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <>
                <StatusIcon className={classes.icon} />
                <Typography variant="h6">Status</Typography>
              </>
            }
          />
          <CardContent className={classes.cardContent}>
            <Button
              component={Link}
              to="/status"
              variant="contained"
              color="success"
              className={classes.button}
              startIcon={<StatusIcon />}
            >
              Go to Status
            </Button>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <>
                <HelpIcon className={classes.icon} />
                <Typography variant="h6">Q&A</Typography>
              </>
            }
          />
          <CardContent className={classes.cardContent}>
            <Button
              component={Link}
              to="/QandA"
              variant="contained"
              color="info"
              className={classes.button}
              startIcon={<HelpIcon />}
            >
              Go to Q&A
            </Button>
          </CardContent>
        </Card>
      </Container>

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

export default Home;
