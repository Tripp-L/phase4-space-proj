import React, { createContext, useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MyNavbar from './Navbar';
import Spacecrafts from './Spacecrafts';
import Spacecraft from './Spacecraft';
import Mission from './Mission';
import './Mission.css';
import CelestialBody from './CelestialBody';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SpaceContext = createContext();
export const useSpace = () => useContext(SpaceContext);

function App() {
  const [spacecrafts, setSpacecrafts] = useState([]);
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
  const [activeComponent, setActiveComponent] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const fetchSpacecrafts = async () => {
      try {
        const response = await fetch('http://localhost:3000/spacecrafts');
        const data = await response.json();
        setSpacecrafts(data);
      } catch (error) {
        console.error('Error fetching spacecraft:', error);
      }
    };

    fetchSpacecrafts();
  }, []);

  useEffect(() => {
    localStorage.setItem('celestialBodies', JSON.stringify(celestialBodies));
    updateDestinations(celestialBodies);
  }, [celestialBodies]);

  const handleDeleteSpacecraft = (deletedSpacecraftId) => {
    setSpacecrafts(spacecrafts.filter(spacecraft => spacecraft.id !== deletedSpacecraftId));
  };

  const toggleCelestialBody = (body) => {
    const exists = celestialBodies.find(item => item.id === body.id);
    let updatedCelestialBodies = exists ? celestialBodies.filter(item => item.id !== body.id) : [...celestialBodies, body];
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

  const renderComponent = () => {
    switch (activeComponent) {
      case 'missions':
        return <Mission />;
      case 'celestialBodies':
        return <CelestialBody />;
      case 'spacecrafts':
        return <Spacecrafts spacecrafts={spacecrafts} onDelete={handleDeleteSpacecraft} />;
      case 'spacecraft':
        return <Spacecraft onDelete={handleDeleteSpacecraft} />;
      default:
        return null;
    }
  };

  return (
    <SpaceContext.Provider value={{ celestialBodies, totalDistance, destinations, toggleCelestialBody, spacecrafts }}>
      <div className="App">
        {showNavbar && <MyNavbar />}
        <div className="button-container">
          <button onClick={() => setActiveComponent('missions')}>Show Missions</button>
          <button onClick={() => setActiveComponent('celestialBodies')}>Show Celestial Bodies</button>
          <button onClick={() => setActiveComponent('spacecrafts')}>Show Spacecrafts</button>
          <button onClick={() => setActiveComponent('spacecraft')}>Show Spacecraft</button>
          <button onClick={() => setShowNavbar(!showNavbar)}>{showNavbar ? 'Hide Navbar' : 'Show Navbar'}</button>
        </div>
        {renderComponent()}
      </div>
    </SpaceContext.Provider>
  );
}

export default App;