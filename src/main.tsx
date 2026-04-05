import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './app/page';
import './app/globals.css';
import { ThemeProvider } from './components/theme-provider';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { Toaster } from './components/ui/sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <UserProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <LandingPage />
          <Toaster />
        </ThemeProvider>
      </UserProvider>
    </LanguageProvider>
  </React.StrictMode>
);
