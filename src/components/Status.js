import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Home from './Navbar';
import { TextField, Button, Container, CircularProgress, Card, CardContent, CardHeader, Box } from '@mui/material';
import { useAuth } from '../AuthContext';

function Status() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    const handleInputChange = (event) => {
        setTransactionId(event.target.value);
    };
    const { credentials } = useAuth();
    const { username, password } = credentials;
    // console.log({username});
    const creds =btoa(`${username}:${password}`);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const username = 'aman';
            const password = 'aman@123';
            const credentials101 = btoa(`${username}:${password}`);

            const url = `https://dev-doc-ai-api.smartpulse.cloud/v2/status?transaction_id=${transactionId}`;

            // Construct request body with transaction_id
            const requestBody = {
                transaction_id: transactionId
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Basic ${creds}`
                },
                // body: JSON.stringify(requestBody),
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
                setIsLoading(false);
                history.push({
                    pathname: '/result',
                    state: data,
                });
            } else {
                const errorText = await response.text();
                console.error('Error sending form data:', response.status, errorText);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error sending form data', error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Home />
            <Container maxWidth="xl" sx={{ position: 'relative', marginTop: 4 }}>
                {isLoading && (
                    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                        <CircularProgress size={50} color="inherit" />
                    </Box>
                )}
                {!isLoading && (
                    <Card sx={{ padding: 3, maxWidth: 600, width: '100%', boxShadow: 3, borderRadius: 2, position: 'absolute', right: 0 }}>
                        <CardHeader title="Status" />
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    required
                                    name='transaction_id'
                                    type="text"
                                    label="Transaction ID"
                                    value={transactionId}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </Container>
        </>
    );
}

export default Status;
