import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Spacecrafts from "./Spacecrafts";
import Spacecraft from "./Spacecraft";
import Navbar from "./Navbar";

function App() {
  const [spacecrafts, setSpacecrafts] = useState([]);

  useEffect(() => {
    const fetchSpacecrafts = async () => {
      try {
        const response = await fetch("http://localhost:3000/spacecrafts");
        const data = await response.json();
        setSpacecrafts(data.spacecrafts);
      } catch (error) {
        console.error("Error fetching spacecraft:", error);
      }
    };

    fetchSpacecrafts();
  }, []);

  const handleDeleteSpacecraft = (deletedSpacecraftId) => {
    setSpacecrafts(spacecrafts.filter(spacecraft => spacecraft.id !== deletedSpacecraftId));
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/spacecrafts"> 
          <Route index element={<Spacecrafts spacecrafts={spacecrafts} onDelete={handleDeleteSpacecraft} />} />
          <Route path=":id" element={<Spacecraft spacecrafts={spacecrafts} onDelete={handleDeleteSpacecraft} />} /> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;