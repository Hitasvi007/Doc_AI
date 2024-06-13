import React, { useState, useRef } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';

function Result(props) {
  const downloadLinkRef = useRef(null);
  const textFieldRef = useRef(null);
  const [copiedValues, setCopiedValues] = useState({});
  const history = useHistory(); // useHistory hook

  const handleDownloadClick = () => {
    const downloadUrl = textFieldRef.current.value;
    downloadLinkRef.current.href = downloadUrl;
    downloadLinkRef.current.click();
  };

  const handleCopyClick = (key, value) => {
    navigator.clipboard.writeText(value);
    setCopiedValues((prevCopiedValues) => ({
      ...prevCopiedValues,
      [key]: true
    }));
  };

  const handleAnalyzeClick = () => {
    const configfileUrl = textFieldRef.current.value;
  
    fetch(configfileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonData => {
        history.push({
          pathname: '/analyze',
          state: { data: jsonData }
        });
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
        // Optionally, log response details if available:
        // console.log('Response details:', error.response);
      });
  };
  
  
  const receivedData = props.location.state;

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
                    onClick={handleAnalyzeClick} // Call the analyze function
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
