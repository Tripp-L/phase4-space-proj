import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
