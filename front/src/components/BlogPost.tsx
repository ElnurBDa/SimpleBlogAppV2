import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BlogPost } from "../types";
import { 
  Container, 
  Typography, 
  CircularProgress, 
  Box, 
  Button, 
  Paper
} from "@mui/material";

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [apiBaseUrl, setApiBaseUrl] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(config => setApiBaseUrl(config.apiUrl))
      .catch(error => console.error('Error loading config:', error));
  }, []);

  useEffect(() => {
    if (apiBaseUrl) {
      axios
        .get(`${apiBaseUrl}/blogposts/${id}`)
        .then((response) => setPost(response.data))
        .catch((error) => console.error("Error fetching blog post:", error));
    }
  }, [id, apiBaseUrl]);

  const handleDelete = () => {
    if (apiBaseUrl) {
      setIsDeleting(true);
      axios
        .delete(`${apiBaseUrl}/blogposts/${id}`)
        .then(() => {
          console.log("Blog post deleted");
          setIsDeleting(false);
          navigate("/blogs"); // Redirect to blogs page after deletion
        })
        .catch((error) => {
          console.error("Error deleting blog post:", error);
          setIsDeleting(false);
        });
    }
  };

  const generateGradient = (text: string) => {
    const hash = text.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color1 = `hsl(${hash % 360}, 70%, 50%)`;
    const color2 = `hsl(${(hash + 120) % 360}, 70%, 50%)`;
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };

  if (!post)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container>
      <Paper 
        elevation={3} 
        style={{ 
          padding: "20px", 
          marginTop: "20px", 
          marginBottom: "40px", // Added margin at the bottom
          background: generateGradient(post.title),
          color: "white" // Make text white
        }}
      >
        <Typography variant="h3" gutterBottom style={{ color: "white" }}>
          {post.title}
        </Typography>
        <Typography 
          variant="body1" 
          style={{ 
            whiteSpace: "pre-wrap", 
            marginTop: "10px", 
            wordWrap: "break-word",
            color: "white" // Make text white
          }}
        >
          {post.content}
        </Typography>
      </Paper>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/blogs")}
        >
          Back to Blogs
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Post"}
        </Button>
      </Box>
    </Container>
  );
};

export default BlogPostDetail;
