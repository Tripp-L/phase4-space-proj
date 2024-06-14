import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Spacecraft({ onDelete }) {
  const { id } = useParams();
  const [spacecraft, setSpacecraft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    speed: 0,
    fuel_log: 0,
    equipment: "",
    repair_status: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSpacecraft = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/spacecrafts/${id}`);
        if (!response.ok) {
          throw new Error('Spacecraft not found');
        }
        const data = await response.json();
        setSpacecraft(data);
        setFormData(data); // Initialize form data with fetched data
      } catch (error) {
        console.error('Error fetching spacecraft:', error);
        setError(error.message);
        } finally {
          setIsLoading(false);
      }
    };

    if (id) { // Only fetch if id is available
      fetchSpacecraft();
    }
  }, [id]); 

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/spacecrafts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data in request body
      });

      if (response.ok) {
        const updatedSpacecraft = await response.json();
        setSpacecraft(updatedSpacecraft);
        setIsEditing(false);
      } else {
        throw new Error('Failed to update spacecraft');
      }
    } catch (error) {
      console.error("Error updating spacecraft:", error);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this spacecraft?")) {
      try {
        const response = await fetch(`http://localhost:3000/spacecrafts/${id}`, { method: 'DELETE' });
        if (response.ok) {
          onDelete(id); // Redirect after successful deletion
        } else {
          throw new Error('Failed to delete spacecraft');
        }
      } catch (error) {
        console.error("Error deleting spacecraft:", error);
        setError(error.message);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="spacecraft">
      <h2>{spacecraft.name}</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {/* Input fields for name, speed, fuel_log, equipment, and repair_status */}
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="speed">Speed:</label>
            <input type="number" id="speed" name="speed" value={formData.speed} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="fuel_log">Fuel Log:</label>
            <input type="number" id="fuel_log" name="fuel_log" value={formData.fuel_log} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="equipment">Equipment:</label>
            <textarea id="equipment" name="equipment" value={formData.equipment} onChange={handleInputChange}></textarea>
          </div>
          <div>
            <label htmlFor="repair_status">Repair Status:</label>
            <input type="text" id="repair_status" name="repair_status" value={formData.repair_status} onChange={handleInputChange} />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      ) : (
        <div>
          <p>Speed: {spacecraft.speed}</p>
          <p>Fuel Log: {spacecraft.fuel_log}</p>
          <p>Equipment: {spacecraft.equipment}</p>
          <p>Repair Status: {spacecraft.repair_status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Spacecraft;

