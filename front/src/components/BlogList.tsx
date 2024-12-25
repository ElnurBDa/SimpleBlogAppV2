import React, { useEffect, useState } from "react";
import axios from "axios";
import { BlogPost } from "../types";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [apiBaseUrl, setApiBaseUrl] = useState<string>("");

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(config => setApiBaseUrl(config.apiUrl))
      .catch(error => console.error('Error loading config:', error));
  }, []);

  useEffect(() => {
    if (apiBaseUrl) {
      axios
        .get(`${apiBaseUrl}/blogposts/`)
        .then((response) => setPosts(response.data))
        .catch((error) => console.error("Error fetching blog posts:", error));
    }
  }, [apiBaseUrl]);

  const generateGradient = (text: string) => {
    const hash = text.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color1 = `hsl(${hash % 360}, 70%, 50%)`;
    const color2 = `hsl(${(hash + 120) % 360}, 70%, 50%)`;
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Blog Posts</Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card component={Link} to={`/blogposts/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <CardContent
                style={{
                  background: generateGradient(post.title),
                  color: "#fff",
                  padding: "16px",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">{post.content.substring(0, 100)}...</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogList;
