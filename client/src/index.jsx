import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import routes from '../routes'

import { createBrowserRouter, RouterProvider } from "react-router-dom";



const router = createBrowserRouter(routes)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
// setting up our router and tying them to our routes we defined in routes.js 
