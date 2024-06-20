
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Spacecrafts from './components/Spacecrafts';
import NewSpacecraftForm from './components/NewSpaceCraftForm';
import Mission from './components/Mission';
import CelestialBody from './components/CelestialBody';
import Home from './components/Home';
import Player from './components/Player';
import Login from './components/Login';
import Signup from './components/Signup';
import './components/spacecrafts.css';
import './components/Mission.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'; 

const SpaceContext = createContext();
export const useSpace = () => useContext(SpaceContext);

function App() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [celestialBodies, setCelestialBodies] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [destinations, setDestinations] = useState('');

  useEffect(() => {
    const fetchSpacecrafts = async () => {
      try {
        const response = await fetch('http://localhost:5555/spacecrafts');
        const data = await response.json();
        setSpacecrafts(data);
      } catch (error) {
        console.error('Error fetching spacecrafts:', error);
      }
    };

    fetchSpacecrafts();
  }, []);

  useEffect(() => {
    const fetchCelestialBodies = async () => {
      try {
        const response = await fetch('http://localhost:5555/celestial_bodies');
        const data = await response.json();
        setCelestialBodies(data);
      } catch (error) {
        console.error('Error fetching celestial bodies:', error);
      }
    };

    fetchCelestialBodies();
  }, []);

  return (
    <SpaceContext.Provider value={{ celestialBodies, totalDistance, destinations, spacecrafts }}>
      <div className="App">
        <Navbar />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/player" element={<Player />} />
            <Route path="/destinations" element={<CelestialBody />} />
            <Route path="/missions" element={<Mission />} />
            <Route path="/spacecrafts" element={<Spacecrafts spacecrafts={spacecrafts} />} />
            <Route path="/spacecrafts/new" element={<NewSpacecraftForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Container>
      </div>
    </SpaceContext.Provider>
  );
}

export default App;