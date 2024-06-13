import React, { useState, useEffect } from 'react';

function Spacecraft({ spacecraft, onUpdate, onDelete }) {
    const [isEditing, setEditing] = useState(false);
    const [editedSpacecraft, setEditedSpacecraft] = useState({ ...spacecraft});

    useEffect(() => {
        setFormData({ ...spacecraft });
    }, [spacecraft]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/spacecrafts/${spacecraft.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                onUpdate(formData);
                setIsEditing(false);
            } else {
                console.error('Failed to update spacecraft');
            }
        } catch (error) {
            console.error('Error updating spacecraft:', error);
        }
    };

    return (
        <div className="spacecraft">
          <h3>{spacecraft.name}</h3>
          <p>Speed: {spacecraft.speed}</p>
          <p>Fuel Log: {spacecraft.fuel_log}</p>
          <p>Equipment: {spacecraft.equipment}</p>
          <p>Repair Status: {spacecraft.repair_status}</p>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button onClick={() => onDelete(spacecraft.id)}>Delete</button>

          {isEditing && (
            <form onSubmit={handleUpdate}>
                <input
                 type="text"
                 name="name"
                 value={formData.name}
                 onChange={handleInputChange}
                 placeholder="Name"
                />
                <input
                 type="number"
                 name="speed"
                 value={formData.speed}
                 onChange={handleInputChange}
                 placeholder="Speed"
                />
                <input
                 type="text"
                 name="fuel_log"
                 value={formData.fuel_log}
                 onChange={handleInputChange}
                 placeholder="Fuel Log"
                />
                <input
                 type="text"
                 name="equipment"
                 value={formData.equipment}
                 onChange={handleInputChange}
                 placeholder="Equipment"
                />
            </form>
          )}

        </div>
    );
}

export default Spacecraft;

