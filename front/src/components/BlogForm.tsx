import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Container } from '@mui/material';

const BlogForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [apiBaseUrl, setApiBaseUrl] = useState('');

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(config => setApiBaseUrl(config.apiUrl))
      .catch(error => console.error('Error loading config:', error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(`${apiBaseUrl}/blogposts/`, { title, content })
      .then(() => {
        setTitle('');
        setContent('');
        alert('Blog post submitted successfully!');
      })
      .catch((error) => console.error('Error creating blog post:', error));
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={4}>
        <Typography variant="h4" gutterBottom>Create a New Blog Post</Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default BlogForm;
