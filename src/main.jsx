import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import { ContentProvider } from './contexts/ContentContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ContentProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#07132B',
                color: '#FEF3C7',
                border: '1px solid rgba(212, 160, 23, 0.4)',
                fontSize: '13px',
                fontWeight: '500'
              },
              success: {
                iconTheme: {
                  primary: '#D4A017',
                  secondary: '#07132B',
                },
              },
            }}
          />
        </ContentProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
