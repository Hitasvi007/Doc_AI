import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Home from './Navbar.js';
import { TextField, Button, Container, CircularProgress, Box } from '@mui/material';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useAuth } from '../AuthContext.js';

function QandA() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        pro_type: "text",
        img_path: "",
        configfile_url: "",
        callback_url: "",
        TOP: 3,
        OCR: "default",
        query: [],
        extraction_type: "generative",
        pdf_path: "",
        page_num: "all",
        input_context: [],
        search_kwargs: 1,
        vecto_db: "FAISS",
        embeddings: "sentence-transformers/all-mpnet-base-v2",
        chunk_size: 1,
        Chunk_overlap: 1,
        Custom_chunks: [],
        open_ai_model: "text-davinci-003",
        GQA_model_name: "google/flan-t5-large",
        VQA_model_name: "Ernie",
        Extractive_QA_model_name: "deepset/roberta-base-squad2",
        temperature: 0
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: (name === 'query' || name === 'input_context') ? [value] : value,
        }));
    };

    const { credentials } = useAuth();
    const { username, password } = credentials;
    const creds = btoa(`${username}:${password}`);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`https://dev-doc-ai-api.smartpulse.cloud/v2/qa_questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Basic ${creds}`
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                if (response.status === 401) {
                    alert('Invalid credentials. Please check your username and password.');
                } else {
                    alert('Error sending form data');
                }
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                setIsLoading(false);
                const data = await response.json();
                history.push({
                    pathname: '/result',
                    state: data,
                });
            } else {
                alert('Error sending form data');
                setIsLoading(false);
            }
        } catch (error) {
            alert('Error sending form data');
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
                        <CardHeader title="Q&A" />
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    name="pro_type"
                                    type="text"
                                    label="Pro Type"
                                    value={formData.pro_type}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="img_path"
                                    type="text"
                                    label="Image Path"
                                    value={formData.img_path}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="configfile_url"
                                    type="text"
                                    label="Config File URL"
                                    value={formData.configfile_url}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="callback_url"
                                    type="text"
                                    label="Callback URL"
                                    value={formData.callback_url}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="TOP"
                                    type="number"
                                    label="TOP"
                                    value={formData.TOP}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="OCR"
                                    type="text"
                                    label="OCR"
                                    value={formData.OCR}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="query"
                                    type="text"
                                    label="Query"
                                    value={formData.query[0] || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="extraction_type"
                                    type="text"
                                    label="Extraction Type"
                                    value={formData.extraction_type}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="pdf_path"
                                    type="text"
                                    label="PDF Path"
                                    value={formData.pdf_path}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="page_num"
                                    type="text"
                                    label="Page Number"
                                    value={formData.page_num}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="input_context"
                                    type="text"
                                    label="Input Context"
                                    value={formData.input_context[0] || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="search_kwargs"
                                    type="number"
                                    label="Search KWArgs"
                                    value={formData.search_kwargs}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="vecto_db"
                                    type="text"
                                    label="Vecto DB"
                                    value={formData.vecto_db}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="embeddings"
                                    type="text"
                                    label="Embeddings"
                                    value={formData.embeddings}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="chunk_size"
                                    type="number"
                                    label="Chunk Size"
                                    value={formData.chunk_size}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="Chunk_overlap"
                                    type="number"
                                    label="Chunk Overlap"
                                    value={formData.Chunk_overlap}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="Custom_chunks"
                                    type="text"
                                    label="Custom Chunks"
                                    value={formData.Custom_chunks}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="open_ai_model"
                                    type="text"
                                    label="Open AI Model"
                                    value={formData.open_ai_model}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="GQA_model_name"
                                    type="text"
                                    label="GQA Model Name"
                                    value={formData.GQA_model_name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="VQA_model_name"
                                    type="text"
                                    label="VQA Model Name"
                                    value={formData.VQA_model_name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="Extractive_QA_model_name"
                                    type="text"
                                    label="Extractive QA Model Name"
                                    value={formData.Extractive_QA_model_name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    name="temperature"
                                    type="number"
                                    label="Temperature"
                                    value={formData.temperature}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ minWidth: 200 }}
                                    >
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

export default QandA;
