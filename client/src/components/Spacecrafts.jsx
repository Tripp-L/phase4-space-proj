import React, { useState, useEffect } from 'react';
import Spacecraft from './Spacecraft';

function Spacecrafts() {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [newSpacecraft, setNewSpacecraft] = useState({
        name: '',
        speed: 0,
        fuel_log: 0,
        equipment: '',
    });

    useEffect(() => {
        fetch('/spacecrafts')
        .then(response => response.json())
        .then(data => setSpacecrafts(data))
        .catch(error => console.error('Error fetching spacecraft:', error));
    }, []);

    const handleUpdate = (updatedSpacecraft) => {
        setSpacecrafts(prevSpacecrafts =>
            prevSpacecrafts.map(s => s.id === updatedSpacecraft.id ? updatedSpacecraft :  s)
        );
    };

    const handleDelete = (id) => {
        setSpacecrafts(prevSpacecrafts => prevSpacecrafts.filter(s => s.id !== id));
    };

    const handleAddSpacecraft = async () => {
        try {
            const response = await fetch('/spacecrafts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSpacecraft),
            });

            if (response.ok) {
                const newSpacecraftData = await response.json();
                setSpacecrafts([...spacecrafts, newSpacecraftData]);
                setNewSpacecraft({
                    name: '',
                    speed: 0,
                    fuel_log: 0,
                    equipment: '',
                });
                } else {
                    console.error('Failed to add spacecraft:', response)
                }
            } catch (error) {
              console.error('Error adding spacecraft:', error);
            }
          };
        
          return (
            <div className="spacecrafts">
              <h2>Your Spacecrafts</h2>
              <div>
                <h3>Add New Spacecraft</h3>
                <input type="text" value={newSpacecraft.name} onChange={(e) => setNewSpacecraft({ ...newSpacecraft, name: e.target.value })} placeholder="Name" />
                <input type="number" value={newSpacecraft.speed} onChange={(e) => setNewSpacecraft({ ...newSpacecraft, speed: parseInt(e.target.value) })} placeholder="Speed" />
                <input type="number" value={newSpacecraft.fuel_log} onChange={(e) => setNewSpacecraft({ ...newSpacecraft, fuel_log: parseInt(e.target.value) })} placeholder="Fuel Log" />
                <input type="text" value={newSpacecraft.equipment} onChange={(e) => setNewSpacecraft({ ...newSpacecraft, equipment: e.target.value })} placeholder="Equipment" />
                <button onClick={handleAddSpacecraft}>Add Spacecraft</button>
              </div>
        
              {spacecrafts.map(spacecraft => (
                <Spacecraft 
                  key={spacecraft.id}
                  spacecraft={spacecraft}
                  onUpdate={handleUpdate} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          );
        }
        
export default Spacecrafts;