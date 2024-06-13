import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Home from './Navbar';
import { TextField, Button, Container, CircularProgress, FormGroup, Checkbox } from '@mui/material';
import { FormControlLabel, FormControl, FormLabel, Card, CardContent, CardHeader, Box } from '@mui/material';
import imgs from './Processing-1.png';
import { Typography } from '@mui/material';
import { useAuth } from '../AuthContext';


function Extraction() {
    const history = useHistory();
    const [selectedValues1, setSelectedValues1] = useState([]);
    const [selectedValues2, setSelectedValues2] = useState([]);
    const [messages, setMessages] = useState([]);
    const websocket = useRef(null);

    useEffect(() => {
        const selectedString = selectedValues1.join(', ');
        setFormData((prevData) => ({
            ...prevData,
            extraction_type: selectedString,
        }));
    }, [selectedValues1]);

    useEffect(() => {
        const selectedString = selectedValues2.join(', ');
        setFormData((prevData) => ({
            ...prevData,
            structure: selectedString,
        }));
    }, [selectedValues2]);

    const handleCheckboxChange1 = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setSelectedValues1([...selectedValues1, value]);
        } else {
            setSelectedValues1(selectedValues1.filter((item) => item !== value));
        }
    };

    const handleCheckboxChange2 = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setSelectedValues2([...selectedValues2, value]);
        } else {
            setSelectedValues2(selectedValues2.filter((item) => item !== value));
        }
    };

    const checkboxOptions1 = ['text', 'image'];
    const checkboxOptions2 = ['table', 'text'];

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        file_url: "",
        page_no: "",
        coordinates: {},
        configfile_url: "",
        structure: "",
        extraction_type: "",
        detection_padding: "40, 15, 15, 20",
        long_img_extraction: "0",
        bb_padding: "0,0,50,50",
        eps: "8",
        upper_lim: "0.25",
        lower_lim: "0.55",
        col_width: "5",
        aspect_ratio: "0.4",
        long_img_padding: "25,25,50,50",
        filter_threshold: "0.01",
        callback_url: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name !== "coordinates") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);
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
            const response = await fetch(`https://dev-doc-ai-api.smartpulse.cloud/v2/extract`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Basic ${creds}`
                },
                body: JSON.stringify(formData),
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
                setIsLoading(false);
                const data = await response.json();
                console.log(data);
                history.push({
                    pathname: '/result',
                    state: data,
                });
            } else {
                alert('Error sending form data');
            }
        } catch (error) {
            alert('Error sending form data', error);
        }
    };

    useEffect(() => {
        websocket.current = new WebSocket('ws://localhost:8000/ws');

        websocket.current.onopen = () => {
            console.log('WebSocket connection opened');
        };

        websocket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        websocket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            websocket.current.close();
        };
    }, []);

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
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1 }}>
                            <img src={imgs} alt="Your Image" style={{ width: '70%', height:300, padding: 2 }} />
                            <Typography variant="body1" style={{ paddingLeft: '2%', paddingRight: '20%' }}>
                            <b>File Content Extraction Service:</b>  Our service allows users to extract content from files hosted at a specified URL. Users can provide a file URL and a page number, and our system retrieves either text or images based on their request. Whether you need to extract text for analysis or images for visual content, our service streamlines the process efficiently.
                            </Typography>
                        </Box>
                        <Card sx={{ padding: 3, maxWidth: 600, width: '100%', boxShadow: 3, borderRadius: 2,  right: 0 }}>
                            <CardHeader title="Extraction" />
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        name="file_url"
                                        type="text"
                                        label="file_url"
                                        value={formData.file_url}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        name="page_no"
                                        type="text"
                                        label="page_no"
                                        value={formData.page_no}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        name="configfile_url"
                                        type="text"
                                        label="configfile_url"
                                        value={formData.configfile_url}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        required
                                    />
                                    <FormLabel component="legend">Extraction_type:</FormLabel>
                                    <FormGroup>
                                        {checkboxOptions1.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        value={option}
                                                        checked={selectedValues1.includes(option)}
                                                        onChange={handleCheckboxChange1}
                                                    />
                                                }
                                                label={option}
                                            />
                                        ))}
                                    </FormGroup>
                                    <FormLabel component="legend">Structure:</FormLabel>
                                    <FormGroup>
                                        {checkboxOptions2.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        value={option}
                                                        checked={selectedValues2.includes(option)}
                                                        onChange={handleCheckboxChange2}
                                                    />
                                                }
                                                label={option}
                                            />
                                        ))}
                                    </FormGroup>
                                    <TextField
                                        name="callback_url"
                                        type="text"
                                        label="callback_url"
                                        value={formData.callback_url}
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
                    </Box>
                )}
            </Container>
        </>
    );
}

export default Extraction;
