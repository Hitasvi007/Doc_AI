import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar.js';
import { TextField, Button, Container, FormGroup, Card, CardContent, CardHeader, Box, Typography, RadioGroup, FormControl, Radio } from '@mui/material';
import { FormControlLabel, FormLabel, CircularProgress, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info.js';
import { useAuth } from '../AuthContext.js';

function Detract() {
  const [selectedExtractionType, setSelectedExtractionType] = useState('text');
  const [selectedDetectionType, setSelectedDetectionType] = useState('table');
  const [ocrLevel, setOcrLevel] = useState('span');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    file_url: "",
    page_no: "",
    callback_url: "",
    extraction_type: "text",
    detection_type: "table",
    long_img: "0",
    long_img_aspect_ratio: "1.8",
    table_confidence: "0.6",
    thresh: [0.2, 0.2, 0.2, 0.2, 0.5],
    configfile_url: "",
    coordinates: {},
    stucture: "table",
    detection_padding: "0, 40, 20, 30",
    long_img_extraction: "0",
    bb_padding: "0,0,120,120",
    eps: "-1",
    upper_lim: "0.1",
    lower_lim: "0.7",
    col_width: "-1",
    aspect_ratio: "0.4",
    long_img_padding: "25,25,50,50",
    filter_threshold: "0.01",
    useTFN: 1,
    thresh_tatr: 0.05,
    transpose_transform: 0,
    ocr_level: "span"
  });

  const userCredentials = useSelector((state) => state.auth);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      extraction_type: selectedExtractionType,
      detection_type: selectedDetectionType,
      ocr_level: ocrLevel
    }));
  }, [selectedExtractionType, selectedDetectionType, ocrLevel]);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { credentials } = useAuth();
  const { username, password } = credentials;
  const creds = btoa(`${username}:${password}`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        page_no: formData.page_no === 'all' ? '' : formData.page_no,
      };

      const response = await fetch(`https://dev-doc-ai-api.smartpulse.cloud/v2/detract`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Basic ${creds}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Invalid credentials. Please check your username and password.');
        } else {
          alert('Error sending form data');
        }
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFormData({
        file_url: "",
        page_no: "",
        callback_url: "",
        extraction_type: "text",
        detection_type: "table",
        long_img: "0",
        long_img_aspect_ratio: "1.8",
        table_confidence: "0.6",
        thresh: [0.2, 0.2, 0.2, 0.2, 0.5],
        configfile_url: "",
        coordinates: {},
        stucture: "table",
        detection_padding: "0, 40, 20, 30",
        long_img_extraction: "0",
        bb_padding: "0,0,120,120",
        eps: "-1",
        upper_lim: "0.1",
        lower_lim: "0.7",
        col_width: "-1",
        aspect_ratio: "0.4",
        long_img_padding: "25,25,50,50",
        filter_threshold: "0.01",
        useTFN: 1,
        thresh_tatr: 0.05,
        transpose_transform: 0,
        ocr_level: "span"
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Card sx={{ padding: 3, maxWidth: 600, width: '100%', boxShadow: 3, borderRadius: 2 }}>
                <CardHeader title="Detract" />
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
                      <Tooltip sx={{ padding: 0, marginLeft: 1 }} title="Select the type of data you want to extract.">
                        <IconButton aria-label="info">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
                      <RadioGroup
                        name="extraction_type"
                        value={selectedExtractionType}
                        onChange={(event) => setSelectedExtractionType(event.target.value)}
                      >
                        <FormControlLabel value="text" control={<Radio />} label="Text" />
                        <FormControlLabel value="image" control={<Radio />} label="Image" />
                      </RadioGroup>
                    </FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                      <FormLabel component="legend">Detection Type:</FormLabel>
                      <Tooltip sx={{ padding: 0, marginLeft: 1 }} title="Select the type of data you want to detect.">
                        <IconButton aria-label="info">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
                      <RadioGroup
                        name="detection_type"
                        value={selectedDetectionType}
                        onChange={(event) => setSelectedDetectionType(event.target.value)}
                      >
                        <FormControlLabel value="table" control={<Radio />} label="Table" />
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                        <FormControlLabel value="yolox" control={<Radio />} label="YOLOX" />
                      </RadioGroup>
                    </FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                      <FormLabel component="legend">OCR Level:</FormLabel>
                      <Tooltip sx={{ padding: 0, marginLeft: 1 }} title="Select the OCR level.">
                        <IconButton aria-label="info">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
                      <RadioGroup
                        name="ocr_level"
                        value={ocrLevel}
                        onChange={(event) => setOcrLevel(event.target.value)}
                      >
                        <FormControlLabel value="span" control={<Radio />} label="Span" />
                        <FormControlLabel value="word" control={<Radio />} label="Word" />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      name="configfile_url"
                      type="text"
                      label="Config File URL"
                      value={formData.configfile_url}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="coordinates"
                      type="text"
                      label="Coordinates"
                      value={formData.coordinates}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      required
                      name="stucture"
                      type="text"
                      label="Structure"
                      value={formData.stucture}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
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

export default Detract;
