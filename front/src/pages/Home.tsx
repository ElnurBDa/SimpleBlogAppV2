import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

const HeroSection = styled(Box)({
  backgroundImage: 'linear-gradient(to bottom right, #0d47a1, #1976d2)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
});

const FeatureCard = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  height: '100%',
});

const Home: React.FC = () => (
  <Container>
    <HeroSection>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>Welcome to Our Blog App</Typography>
        <Typography variant="h5">Explore, create, and share amazing blogs!</Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>Get Started</Button>
      </Box>
    </HeroSection>
    <Box my={12}>
      <Typography variant="h4" gutterBottom textAlign="center">Features</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard elevation={3}>
            <Typography variant="h6" gutterBottom>Easy to Use</Typography>
            <Typography variant="body1">Our platform is user-friendly and easy to navigate.</Typography>
          </FeatureCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard elevation={3}>
            <Typography variant="h6" gutterBottom>Customizable</Typography>
            <Typography variant="body1">Personalize your blog with various themes and layouts.</Typography>
          </FeatureCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard elevation={3}>
            <Typography variant="h6" gutterBottom>Community Driven</Typography>
            <Typography variant="body1">Join a community of like-minded bloggers and readers.</Typography>
          </FeatureCard>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default Home;
