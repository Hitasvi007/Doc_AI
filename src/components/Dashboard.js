import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';
import Navbar from './Navbar';
import { useAuth } from '../AuthContext';


function Dashboard() {
  const [user, setUsername] = useState('');
  const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const { credentials } = useAuth();
  const { username, password } = credentials;
  // console.log({username});
  const creds =btoa(`${username}:${password}`);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authUsername = 'aman';
      const authPassword = 'aman@123';
      const credentials101 = btoa(`${authUsername}:${authPassword}`);

      const url = `https://dev-doc-ai-api.smartpulse.cloud/v2/dashboard_details/${user}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${creds}`
        },
      });
      if (!response.ok) {
        // Handle case where credentials are incorrect
        if (response.status === 401) {
          // Show popup or alert for wrong credentials
          alert('Invalid credentials. Please check your username and password.');
        } else {
          // Handle other HTTP errors
          alert('Error sending form data');
        }
        throw new Error('Network response was not ok');
      }
  
      if (response.ok) {
        const data = await response.json();
        history.push({
          pathname: '/details',
          state: data,
        });
      } else {
        const errorText = await response.text();
        console.error('Error fetching details:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error fetching details', error);
    }
  };

  return (
    <>
    <Navbar />
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <TextField
        fullWidth
        label="Enter Username"
        variant="outlined"
        value={user}
        onChange={handleUsernameChange}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
    </>
  );
}

export default Dashboard;
