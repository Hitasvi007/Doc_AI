// import React, { useState, useContext } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../actions/authActions';
// import { TextField, Button, Container, CircularProgress, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import AuthContext from '../context/AuthContext';

// const Login = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();
//   const { updateCredentials } = useContext(AuthContext);

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = () => {
//     setIsLoading(true);
//     // Simulating API authentication success for demo purposes
//     const isAuthenticated = true; // Replace this with actual authentication logic

//     if (isAuthenticated) {
//       // Dispatch login action
//       dispatch(login(username, password));
//       // Update context with credentials
//       updateCredentials(username, password);
//       // Redirect to dashboard or close dialog
//       setOpen(false);
//     } else {
//       alert('Login failed. Please check your credentials.');
//       setIsLoading(false);
//     }
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <Container maxWidth="xl" sx={{ position: 'relative', marginTop: 4 }}>
//         <Button variant="outlined" onClick={handleClickOpen}>
//           Open Login Dialog
//         </Button>
//         <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
//           <DialogTitle>Login</DialogTitle>
//           <DialogContent>
//             {isLoading ? (
//               <Box sx={{ textAlign: 'center', marginTop: 4 }}>
//                 <CircularProgress size={50} color="inherit" />
//               </Box>
//             ) : (
//               <Box>
//                 <TextField
//                   type="text"
//                   label="Username"
//                   value={username}
//                   onChange={handleUsernameChange}
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                 />
//                 <TextField
//                   type="password"
//                   label="Password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                 />
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="secondary">
//               Cancel
//             </Button>
//             <Button
//               onClick={handleLogin}
//               variant="contained"
//               color="primary"
//               disabled={isLoading}
//             >
//               Login
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Container>
//     </>
//   );
// };

// export default Login;
