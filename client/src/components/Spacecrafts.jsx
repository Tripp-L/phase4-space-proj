import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Spacecrafts({ onDelete, userData }) {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpacecrafts = async () => {
      try {
        const response = await fetch('http://localhost:3000/spacecrafts');
        if (!response.ok) { 
          throw new Error(`Failed to fetch spacecraft: ${response.statusText}`);
        }
        const data = await response.json();

        if (userData) {
          setSpacecrafts(data.filter(spacecraft => spacecraft.userId === userData.id));
        } else {
          setSpacecrafts(data);
        }
      } catch (error) {
        console.error('Error fetching spacecraft:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpacecrafts();
  }, [userData]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/spacecrafts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete(id); 
      } else {
        console.error("Failed to delete spacecraft:", response.statusText);
        setError("Failed to delete spacecraft.");
      }
    } catch (error) {
      console.error("Error deleting spacecraft:", error);
      setError("An error occured while deleting the spacecraft.");
    }
  };

  if (loading) return <div>Loading spacecrafts...</div>;
  if (error) return <div className="error-message">{error}</div>; 

  return (
    <div>
      <h2>Your Spacecrafts</h2>

      {spacecrafts.length === 0 ? (
        <div>No spacecraft available.</div>
      ) : (
        <ul>
          {spacecrafts.map((spacecraft) => (
            <li key={spacecraft.id}>
              <Link to={`/spacecrafts/${spacecraft.id}`}>{spacecraft.name}</Link>
              <button onClick={() => handleDelete(spacecraft.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {/* Button to create a new spacecraft (implementation in parent component) */}
      <Link to="/spacecrafts/new"><button>Create New Spacecraft</button></Link>
    </div>
  );
}

export default Spacecrafts;