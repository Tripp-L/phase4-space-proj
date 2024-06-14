import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Missions from './Missions';
import Spacecrafts from './Spacecrafts.jsx';
import Explore from './Explore';
import Spacecraft from './Spacecraft.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SpaceContext = createContext();
export const useSpace = () => useContext(SpaceContext);

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

  const toggleCelestialBody = (body) => {
    const exists = celestialBodies.some(item => item.id === body.id);
    let updatedCelestialBodies = exists ? celestialBodies.filter(item => item.id !== body.id) : [...celestialBodies, body];
    setCelestialBodies(updatedCelestialBodies);
    updateDestinations(updatedCelestialBodies);
  };

  const updateDestinations = (bodies) => {
    const total = bodies.reduce((acc, curr) => acc + parseFloat(curr.distance), 0);
    setTotalDistance(total);
    const names = bodies.map(b => b.name).join(', ');
    setDestinations(names);
  };

  return (
    <Router>
      <SpaceContext.Provider value={{ celestialBodies, totalDistance, destinations, toggleCelestialBody }}>
        <div className="App">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/missions" element={isLoggedIn ? <Missions /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/spacecrafts" element={isLoggedIn ? <Spacecrafts /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/explore" element={isLoggedIn ? <Explore /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/spacecrafts/:id" element={<Spacecraft />} />
          </Routes>
        </div>
      </SpaceContext.Provider>
    </Router>
  );
}

export default App;