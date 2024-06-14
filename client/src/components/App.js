import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Mission from './Mission';
import Spacecrafts from './Spacecrafts';
import Spacecraft from './Spacecraft';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SpaceContext = createContext();
export const useSpace = () => useContext(SpaceContext);

async function checkAuth() {
  const response = await fetch('/api/check-auth');
  const data = await response.json();
  return data.isAuthenticated;
}

function App() {
  const [celestialBodies, setCelestialBodies] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [destinations, setDestinations] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      const auth = await checkAuth();
      setIsLoggedIn(auth);
    }
    checkLoginStatus();
  }, []);

  return (
    <BrowserRouter>
      <SpaceContext.Provider value={{ celestialBodies, totalDistance, destinations }}>
        <div className="App">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/mission" element={isLoggedIn ? <Mission /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/spacecrafts" element={isLoggedIn ? <Spacecrafts /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/spacecrafts/:id" element={<Spacecraft />} />
          </Routes>
        </div>
      </SpaceContext.Provider>
    </BrowserRouter>
  );
}

export default App;