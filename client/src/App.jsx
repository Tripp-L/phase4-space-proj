import React, { useState, createContext, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Spacecrafts from './components/Spacecrafts';
import NewSpacecraftForm from './components/NewSpacecraftForm';
import Mission from './components/Mission';
import CelestialBody from './components/CelestialBody';
import Home from './components/Home';
import Player from './components/Player';
import './components/spacecrafts.css';
import './components/Mission.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'; 

const SpaceContext = createContext();
export const useSpace = () => useContext(SpaceContext);

function App() {
  const [spacecrafts, setSpacecrafts] = useState([
    {
      id: "1",
      name: "Odyssey",
      speed: 25000,
      fuel_log: 12500,
      equipment: "Long-range scanner, Cryogenic stasis pods, Sample collection arm",
      image: "https://i.pinimg.com/originals/f9/11/14/f911146d86d4d343c816083fefef2b55.jpg"
    },
    {
      id: "2",
      name: "Voyager II",
      speed: 32000,
      fuel_log: 9800,
      equipment: "High-resolution camera, Radiation shield, Interstellar radio",
      image: "https://cdn.mos.cms.futurecdn.net/fbWjohVvdk7ekhuoP5vAk7.jpg"
    },
    {
      id: "3",
      name: "Aurora",
      speed: 45000,
      fuel_log: 28000,
      equipment: "Plasma drive, Nanobot repair system, Quantum entanglement communicator",
      image: "https://aspiringyouths.com/wp-content/uploads/2019/10/Image-of-Spacecraft-or-Satellite.jpg"
    },
    {
      id: "4",
      name: "Pioneer",
      speed: 18000,
      fuel_log: 6000,
      equipment: "Solar panels, Asteroid mining laser, Hydroponic garden",
      image: "https://www.businessinsider.in/photo/77273053/the-astronauts-who-flew-spacexs-crew-dragon-to-the-space-station-are-set-to-come-home-on-sunday-watch-their-fiery-return-flight-live-.jpg?imgsize=216123"
    },
    {
      id: "5",
      name: "Galactica",
      speed: 38000,
      fuel_log: 15000,
      equipment: "Hyperspace engine, Drone fleet, Bio-dome",
      image: "https://i.pinimg.com/originals/41/14/f3/4114f3fec8e59ed9b581f005c5ebbff1.jpg"
    }
  ]);

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

  return (
    <SpaceContext.Provider value={{ celestialBodies, totalDistance, destinations, toggleCelestialBody, spacecrafts }}>
        <div className="App">
          <Navbar />
          <Container className="mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/player" element={<Player />} />
              <Route path="/destinations" element={<CelestialBody />} />
              <Route path="/missions" element={<Mission />} />
              <Route path="/spacecrafts" element={<Spacecrafts spacecrafts={spacecrafts} onDelete={handleDeleteSpacecraft} />} />
              <Route path="/spacecrafts/new" element={<NewSpacecraftForm spacecrafts={spacecrafts} setSpacecrafts={setSpacecrafts} />} />
            </Routes>
          </Container>
        </div>  
    </SpaceContext.Provider>
  );
}

export default App;