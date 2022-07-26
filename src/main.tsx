import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './styles/global.css';
import { theme } from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <App />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
