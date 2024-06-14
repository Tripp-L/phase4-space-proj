import React, { createContext, useContext, useState, useEffect } from 'react';
import Mission from './Mission';
import CelestialBody from './CelestialBody';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SpaceContext = createContext();

export const useSpace = () => useContext(SpaceContext);

function App() {
  
  const [celestialBodies, setCelestialBodies] = useState(() => {
    const localData = localStorage.getItem('celestialBodies');
    return localData ? JSON.parse(localData) : [];
  });
  const [totalDistance, setTotalDistance] = useState(() => {
    const localData = localStorage.getItem('totalDistance');
    return localData ? parseFloat(localData) : 0;
  });
  const [destinations, setDestinations] = useState(() => {
    return localStorage.getItem('destinations') || '';
  });
  const [showMission, setShowMission] = useState(true);

  useEffect(() => {
    
    localStorage.setItem('celestialBodies', JSON.stringify(celestialBodies));
    updateDestinations(celestialBodies);
  }, [celestialBodies]);

  const toggleCelestialBody = (body) => {
    const exists = celestialBodies.find(item => item.id === body.id);
    let updatedCelestialBodies;
    if (exists) {
      updatedCelestialBodies = celestialBodies.filter(item => item.id !== body.id);
    } else {
      updatedCelestialBodies = [...celestialBodies, body];
    }
    setCelestialBodies(updatedCelestialBodies);
  };

  const updateDestinations = (bodies) => {
    const total = bodies.reduce((acc, curr) => acc + parseFloat(curr.distance), 0);
    setTotalDistance(total);
    localStorage.setItem('totalDistance', total.toString());
    const names = bodies.map(b => b.name).join(', ');
    setDestinations(names);
    localStorage.setItem('destinations', names);
  };

  return (
    <SpaceContext.Provider value={{ celestialBodies, totalDistance, destinations, toggleCelestialBody }}>
      <div className="App">
        <button onClick={() => setShowMission(true)}>Show Missions</button>
        <button onClick={() => setShowMission(false)}>Show Celestial Bodies</button>
        {showMission ? <Mission /> : <CelestialBody />}
      </div>
    </SpaceContext.Provider>
  );
}

export default App;