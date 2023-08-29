import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './Redux/store.jsx';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Agrega el componente BrowserRouter aquí */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
