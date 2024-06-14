import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  const [celestialBodies, setCelestialBodies] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [destinations, setDestinations] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const auth = await checkAuth();
      setIsLoggedIn(auth);
    };
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