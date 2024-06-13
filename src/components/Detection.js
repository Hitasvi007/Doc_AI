import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import { TextField, Button, Container, FormGroup, Card, CardContent, CardHeader, Box, Typography } from '@mui/material';
import { FormControlLabel, FormLabel, CircularProgress, Checkbox, IconButton, Tooltip } from '@mui/material';
import imgs from './Detection.png';
import InfoIcon from '@mui/icons-material/Info';
import { useAuth } from '../AuthContext';

function Detection() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    file_url: "",
    page_no: "",
    callback_url: "abc.com",
    extraction_type: "",
    long_img: "0",
    long_img_aspect_ratio: "1.8",
    table_confidence: "0.6"
  });

  // Get user credentials from Redux store
  const userCredentials = useSelector((state) => state.auth);

  useEffect(() => {
    const selectedString = selectedValues.join(', ');
    setFormData((prevData) => ({
      ...prevData,
      extraction_type: selectedString,
    }));
  }, [selectedValues]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data: ", data);
      if (data.status === 'success') {
        history.push({
          pathname: '/result',
          state: data.data,
        });
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [history]);

  const handleSelectAllChange = (event) => {
    const allCheckboxValues = checkboxOptions.map((option) => option);
    if (event.target.checked) {
      setSelectedValues(allCheckboxValues);
    } else {
      setSelectedValues([]);
    }
    setSelectAll(event.target.checked);
  };

  const updateSelectAllStatus = (currentSelected) => {
    if (currentSelected.length === checkboxOptions.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  useEffect(() => {
    updateSelectAllStatus(selectedValues);
  }, [selectedValues]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    }
  };

  const checkboxOptions = ['table', 'text', 'list', 'image'];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { credentials } = useAuth();
  const { username, password } = credentials;
  // console.log({username});
  const creds =btoa(`${username}:${password}`);
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`https://dev-doc-ai-api.smartpulse.cloud/v2/detect/`, {
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
  
      const data = await response.json();
      setFormData({
        file_url: "",
        page_no: "",
        callback_url: "abc.com",
        extraction_type: "",
        long_img: "0",
        long_img_aspect_ratio: "1.8",
        table_confidence: "0.6"
      });
      history.push({
        pathname: '/result',
        state: data,
      });
    } catch (error) {
      alert('Error sending form data', error);
    }
    setIsLoading(false);
  };
  

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ position: 'relative', marginTop: 4 }}>
        {isLoading && (
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <CircularProgress size={50} color="inherit" />
          </Box>
        )}
        {!isLoading && (
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: 1 }}>
              <img src={imgs} alt="Your Image" style={{ width: '100%' }} />
              <Typography variant="body1" sx={{ marginLeft: 2, marginRight: 2 }}>
                "<b>Intelligent Document Detection Service:</b> Our service leverages deep learning models for document extraction and layout analysis. Users provide a file URL and specify what they want to extract (e.g., text, tables, images).<br></br> <b>Key features include:</b>
                <br></br><b>Document Layout Analysis:</b> Detects document structure, including tables, using Tensorflow (with Tensorpack) or PyTorch (with Detectron2).
                <br></br><b>OCR (Optical Character Recognition):</b> Supports Tesseract, DocTr, and an API for commercial solutions.
                <br></br><b>Text Mining:</b> Extracts native PDF text using pdfplumber.
                <br></br><b>Language Detection:</b> Utilizes fastText for language identification.
                <br></br><b>Image Deskewing:</b> Corrects image orientation with jdeskew.
                <br></br><b>Token Classification:</b> Supports LayoutLM models for fine-grained classification.
                <br></br>Our service turns documents into usable data, allowing users to focus on acting on information rather than manual compilation.
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Card sx={{ padding: 3, maxWidth: 600, width: '100%', boxShadow: 3, borderRadius: 2 }}>
                <CardHeader title="Detection" />
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      required
                      name="file_url"
                      type="text"
                      label="File URL"
                      value={formData.file_url}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      required
                      name="page_no"
                      type="text"
                      label="Page No."
                      value={formData.page_no}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="callback_url"
                      type="text"
                      label="Callback URL"
                      value={formData.callback_url}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <FormLabel component="legend">Extraction Type:</FormLabel>
                        <Tooltip sx={{ padding: 0, marginLeft: 1 }} title="Select the types of data you want to extract.">
                          <IconButton aria-label="info">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectAll}
                              onChange={handleSelectAllChange}
                            />
                          }
                          label="Select All"
                        />
                        {checkboxOptions.map((option) => (
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                value={option}
                                checked={selectedValues.includes(option)}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={option}
                          />
                        ))}
                      </FormGroup>
                      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          sx={{ padding: 1.5, borderRadius: 2 }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </form>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          )}
        </Container>
      </>
    );
  }
  
  export default Detection;
  