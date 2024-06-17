import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Spacecrafts from "./Spacecrafts";
import NewSpacecraftForm from "./NewSpacecraftForm";
import Navbar from "./Navbar";

function App() {
  const [spacecrafts,setSpacecrafts] = useState([
    {
      "id": "1",
      "name": "Odyssey",
      "speed": 25000,
      "fuel_log": 12500,
      "equipment": "Long-range scanner, Cryogenic stasis pods, Sample collection arm",
      "image": "https://i.pinimg.com/originals/f9/11/14/f911146d86d4d343c816083fefef2b55.jpg"
    },
    {
      "id": "2",
      "name": "Voyager II",
      "speed": 32000,
      "fuel_log": 9800,
      "equipment": "High-resolution camera, Radiation shield, Interstellar radio",
      "image": "https://cdn.mos.cms.futurecdn.net/fbWjohVvdk7ekhuoP5vAk7.jpg"
    },
    {
      "id": "3",
      "name": "Aurora",
      "speed": 45000,
      "fuel_log": 28000,
      "equipment": "Plasma drive, Nanobot repair system, Quantum entanglement communicator",
      "image": "https://aspiringyouths.com/wp-content/uploads/2019/10/Image-of-Spacecraft-or-Satellite.jpg"
    },
    {
      "id": "4",
      "name": "Pioneer",
      "speed": 18000,
      "fuel_log": 6000,
      "equipment": "Solar panels, Asteroid mining laser, Hydroponic garden",
      "image": "https://www.businessinsider.in/photo/77273053/the-astronauts-who-flew-spacexs-crew-dragon-to-the-space-station-are-set-to-come-home-on-sunday-watch-their-fiery-return-flight-live-.jpg?imgsize=216123"
      },
      {
      "id": "5",
      "name": "Galactica",
      "speed": 38000,
      "fuel_log": 15000,
      "equipment": "Hyperspace engine, Drone fleet, Bio-dome",
      "image": "https://i.pinimg.com/originals/41/14/f3/4114f3fec8e59ed9b581f005c5ebbff1.jpg"
      }
  ]);

  const handleDelete = (id) => {
    const updatedSpacecrafts = spacecrafts.filter((craft) => craft.id !== id);
    setSpacecrafts(updatedSpacecrafts);
  };


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Spacecrafts spacecrafts={spacecrafts} setSpacecrafts={setSpacecrafts} onDelete={handleDelete} />} />
        <Route 
          path="/spacecrafts/new" 
          element={<NewSpacecraftForm spacecrafts={spacecrafts} setSpacecrafts={setSpacecrafts} />} 
        />
      </Routes>
    </div>
  );
}

export default App;