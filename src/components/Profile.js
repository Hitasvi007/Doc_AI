import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';

const Profile = () => {
  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">
        Username: {username}
      </Typography>
      <Typography variant="body1">
        Password: {password}
      </Typography>
    </Container>
  );
};

export default Profile;
