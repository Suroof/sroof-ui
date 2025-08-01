import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/variables.css';
import './i18n/i18n'; // 初始化国际化
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
