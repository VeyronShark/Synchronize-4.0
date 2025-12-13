import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import GalleryPage from './pages/GalleryPage';
import EventsPage from './pages/EventsPage';

// Scroll to hash component
function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}



function App() {
  return (
    <Router>
      <ScrollToHash />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(0, 242, 255, 0.3)',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#00f2ff',
              secondary: '#1a1a1a',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1a1a1a',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={
          <Layout>
            <TeamPage />
          </Layout>
        } />
        <Route path="/gallery" element={
          <Layout>
            <GalleryPage />
          </Layout>
        } />
        <Route path="/events" element={
          <Layout>
            <EventsPage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;