import React, { useState, useRef } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy.js';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar.js';
import axios from 'axios';

function Result(props) {
  const downloadLinkRef = useRef(null);
  const textFieldRef = useRef(null);
  const [copiedValues, setCopiedValues] = useState({});
  const history = useHistory();

  const handleDownloadClick = () => {
    const downloadUrl = textFieldRef.current.value;

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'final.json'); // Specify file name here
    // Append link to the body
    document.body.appendChild(link);
    // Programmatically click the link to trigger the download
    link.click();
    // Clean up
    link.parentNode.removeChild(link);
  };

  const handleCopyClick = (key, value) => {
    navigator.clipboard.writeText(value);
    setCopiedValues((prevCopiedValues) => ({
      ...prevCopiedValues,
      [key]: true,
    }));
  };

  const handleAnalyzeClick = () => {
    const receivedData = props.location.state;
    const configUrl = receivedData.configfile_url;
    const startIndex = configUrl.indexOf('https://bucket-document-ai-dev.s3.amazonaws.com/');
    if (startIndex === -1) {
      alert('Invalid configfile_url format.');
      return;
    }
    const apiUrlPart = configUrl.substring(startIndex + 'https://bucket-document-ai-dev.s3.amazonaws.com/'.length);

    // Construct the final API URL
    const configfileUrl = `http://localhost:5000/api/${apiUrlPart}`;

    axios
      .get(configfileUrl, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        const jsonData = response.data;
        console.log('Fetched JSON data:', jsonData); // Log fetched data

        // Assuming jsonData has a signed_url field
        const signedUrl = jsonData.signed_url;
        textFieldRef.current.value = signedUrl; // Set the signed URL in text field

        setTimeout(() => {
          history.push({
            pathname: '/analyze',
            state: { data: jsonData },
          });
        }, 100);
      })
      .catch((error) => {
        console.error('Error fetching JSON data:', error);
        alert('There was an error fetching the JSON data. Please check the console for more details.');
      });
  };

  const receivedData = props.location.state;
  console.log('Received data in Result component:', receivedData); // Log received data

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ marginTop: '100px' }}>
        <form>
          <Grid container spacing={2}>
            {Object.entries(receivedData).map(([key, value]) => (
              <Grid item xs={12} key={key}>
                <TextField
                  label={key}
                  variant="outlined"
                  fullWidth
                  defaultValue={value}
                  InputProps={{ readOnly: true }}
                />
                <Button
                  onClick={() => handleCopyClick(key, value)}
                  startIcon={<FileCopyIcon />}
                  disabled={copiedValues[key]}
                  sx={{ ml: 1 }}
                >
                  {copiedValues[key] ? 'Copied' : 'Copy'}
                </Button>
              </Grid>
            ))}
            <Grid item xs={12}>
              <TextField
                label="configfile_url"
                variant="outlined"
                fullWidth
                inputRef={textFieldRef}
                defaultValue={receivedData.configfile_url}
                InputProps={{ readOnly: true }}
              />
              <Button
                onClick={() => handleCopyClick('configfile_url', receivedData.configfile_url)}
                startIcon={<FileCopyIcon />}
                disabled={copiedValues['configfile_url']}
                sx={{ ml: 1 }}
              >
                {copiedValues['configfile_url'] ? 'Copied' : 'Copy'}
              </Button>
              {receivedData.status === 'completed' && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownloadClick}
                    sx={{ mr: 1 }}
                  >
                    Download
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAnalyzeClick}
                  >
                    Analyze
                  </Button>
                </div>
              )}
              <a
                ref={downloadLinkRef}
                style={{ display: 'none', padding: '3px' }}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download Link
              </a>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default Result;
