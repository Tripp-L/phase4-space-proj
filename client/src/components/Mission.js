import React, { useState } from 'react';
import { useSpace } from './App';
import './Mission.css';

const missions = [
    {
        id: 1,
        name: "Space Quest",
        description: "Echoes of an Ancient Civilization: Observe and collect the ruins of a lost civilization to unravel the mysteries of its past!",
        distance: '',
        destinations: '',
        tasks: ["Observation", "Surface Test", "Collect Debris"],
        imageurl: "https://cdn.mos.cms.futurecdn.net/cf3j6AWGEfJ8LKfTDSekEY.jpg"
       },
       {
        id: 2,
        name: "Stardust Voyage",
        description: "Cosmic Timeshift: Stabilize a strange rift in spacetime through surface tests and analysis.",
        distance: '',
        destinations: '',
        tasks: ["Observation", "Surface Test", "Collect Debris"],
        imageurl: "https://www.ingenieur.de/wp-content/uploads/2017/11/2014/1555_Der-Marsrover-Opportunity.jpg"
       },
       {
        id: 3,
        name: "Cosmic Expedition",
        description: "Is This Life?: Collect vital resources from a dying star system while conducting surface tests for habitability.", 
        distance: '',
        destinations: '',
        tasks: ["Observation", "Surface Test", "Collect Debris"],
        imageurl: "https://www.universetoday.com/wp-content/uploads/2020/05/RAT_rover_by_night_pillars-1920x1200.jpg"
       } 
];

const Mission = () => {
    const [visibleDetails, setVisibleDetails] = useState({});
    const { totalDistance, destinations } = useSpace();

    const toggleDetails = id => {
        setVisibleDetails(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className="container">
            <h1 className="mission-title my-3"><span className="emoji">🛰️</span> Missions <span className="emoji">🛰️</span></h1>
            <div className="row">
                {missions.map((mission, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card" onClick={() => toggleDetails(mission.id)}>
                            <img src={mission.imageurl} className="card-img-top" alt={mission.name} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    <span className="emoji">👨‍🚀 </span>
                                    <strong>{mission.name}</strong>
                                    <span className="emoji"> 👩‍🚀</span>
                                </h5>
                                {visibleDetails[mission.id] && (
                                    <>
                                        <p className="card-text">{mission.description}</p>
                                        <p className="card-text"><strong>Distance: </strong><small>{totalDistance} light years</small></p>
                                        <p className="card-text"><strong>Destination: </strong><small>{destinations}</small></p>
                                        <p className="card-text"><strong>Tasks:</strong></p>
                                        <ul>
                                            {mission.tasks.map((task, idx) => (
                                                <li key={idx}>{task}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mission;