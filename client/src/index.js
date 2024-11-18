import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='599482580299-25f2th6dnul61sa0c7ljgs3homaf17k9.apps.googleusercontent.com'>
      <MantineProvider>
        <App />
      </MantineProvider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
