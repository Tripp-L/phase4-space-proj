import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSpacecrafts } from '../services/api';

function Spacecrafts() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpacecrafts = async () => {
      try {
        const data = await getSpacecrafts();
        setSpacecrafts(data);
      } catch (error) {
        console.error("Error fetching spacecraft:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpacecrafts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/spacecrafts/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setSpacecrafts(spacecrafts.filter(spacecraft => spacecraft.id !== id));
      } else {
        console.error('Failed to delete spacecraft:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting spacecraft:', error);
    }
  };

  if (loading) return <div>Loading spacecrafts...</div>;

  return (
    <div>
      <h2>Your Spacecrafts</h2>
      <ul>
        {spacecrafts.map((spacecraft) => (
          <li key={spacecraft.id}>
            <Link to={`/spacecrafts/${spacecraft.id}`}>{spacecraft.name}</Link>
            <button onClick={() => handleDelete(spacecraft.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* Add a form to create new spacecrafts (or a button that navigates to a new component) */}
    </div>
  );
}

export default Spacecrafts;