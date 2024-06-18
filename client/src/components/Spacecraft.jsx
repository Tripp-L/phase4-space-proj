// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function Spacecraft({ onDelete, spacecrafts }) {
//   const { id } = useParams();
//   const [spacecraft, setSpacecraft] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     speed: 0,
//     fuel_log: 0,
//     equipment: "",
//     repair_status: "",
//   });
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchSpacecraft = async () => {
//       setIsLoading(true);
//       try {
//         const foundSpacecraft = spacecrafts.find((sc) => sc.id === parseInt(id, 10));
//         if (!foundSpacecraft) {
//           throw new Error("Spacecraft not found");
//         }
//         setSpacecraft(foundSpacecraft);
//         setFormData(foundSpacecraft);
//       } catch (error) {
//         console.error("Error fetching spacecraft:", error);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//       fetchSpacecraft();

//   }, [id, spacecrafts]); 

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await fetch(`http://localhost:3000/spacecrafts/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const updatedSpacecraft = await response.json();
//         setSpacecraft(updatedSpacecraft);
//         setIsEditing(false);
//       } else {
//         throw new Error("Failed to update spacecraft");
//       }
//     } catch (error) {
//       console.error("Error updating spacecraft:", error);
//       setError(error.message);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this spacecraft?")) {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/spacecrafts/${id}`,
//           { method: "DELETE" }
//         );
//         if (response.ok) {
//           onDelete(id);
//         } else {
//           throw new Error("Failed to delete spacecraft");
//         }
//       } catch (error) {
//         console.error("Error deleting spacecraft:", error);
//         setError(error.message);
//       }
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="spacecraft">
//       <h2>{spacecraft.name}</h2>
//       <img
//         src={`http://localhost:3000/images/${spacecraft.image}`}
//         alt={spacecraft.name}
//       />

//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type="submit">Save Changes</button>
//           <button type="button" onClick={() => setIsEditing(false)}>
//             Cancel
//           </button>
//           {error && <p className="error-message">{error}</p>}
//         </form>
//       ) : (
//         <div>
//           <p>Speed: {spacecraft.speed}</p>
//           <p>Fuel Log: {spacecraft.fuel_log}</p>
//           <p>Equipment: {spacecraft.equipment}</p>
//           <p>Repair Status: {spacecraft.repair_status}</p>
//           <button onClick={() => setIsEditing(true)}>Edit</button>
//           <button onClick={handleDelete}>Delete</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Spacecraft;


