import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import Blogs from './pages/Blogs';
import Submit from './pages/Submit';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static" sx={{ 
        background: 'rgba(0, 0, 255, 0.8)', 
        backdropFilter: 'blur(10px)', 
        borderBottom: '1px solid rgba(0, 0, 255, 0.3)',
        marginBottom: '1rem'
      }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Our Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/blogs">Blogs</Button>
          <Button color="inherit" component={Link} to="/submit">Submit</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/blogposts/:id" element={<BlogDetail />} />
        </Routes>
      </Container>
      <Box sx={{ flexGrow: 1 }} />
      <footer style={{ textAlign: 'center', padding: '1rem', background: '#f5f5f5', position: 'fixed', bottom: 0, width: '100%' }}>
        <Typography variant="body2">© 2024 Our Blog App</Typography>
      </footer>
    </Router>
  );
};

export default App;
