import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSpacecraft, updateSpacecraft, deleteSpacecraft } from "../services/api";
import { useAuth } from '../hooks/useAuth';
import './Spacecraft.css'; 


function Spacecraft() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
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

  useEffect(() => {
    const fetchSpacecraft = async () => {
      try {
        const data = await getSpacecraft(id, token);
        setSpacecraft(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching spacecraft:", error);
        if (error.response && error.response.status === 404) {
          setError("Spacecraft not found.");
        } else {
          setError("An error occurred while fetching spacecraft data.");
        }
      }
    };

    fetchSpacecraft();
  }, [id, token]); // Fetch data again if token changes

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const updatedSpacecraft = await updateSpacecraft(id, formData, token);
      setSpacecraft(updatedSpacecraft);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating spacecraft:", error);
      setError("An error occurred while updating the spacecraft."); // Display error message
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this spacecraft?")) {
      try {
        await deleteSpacecraft(id, token);
        navigate("/spacecrafts"); // Redirect after successful deletion
      } catch (error) {
        console.error("Error deleting spacecraft:", error);
        setError("An error occurred while deleting the spacecraft.");
      }
    }
  };

  if (!spacecraft) {
    return <div>{error || "Loading..."}</div>;
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
