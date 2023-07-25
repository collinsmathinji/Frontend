import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DiabeticStatsContextProvider } from './context/DiabeticStats'; // Update the import to use DiabeticStatsContextProvider
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DiabeticStatsContextProvider> 
        <App />
      </DiabeticStatsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
