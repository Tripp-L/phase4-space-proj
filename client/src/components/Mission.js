import React, { useState } from 'react';
import { useSpace } from '../App';
import './Mission.css';

const missions = [
    {
        id: 1,
        name: "Space Quest: Echoes of an Ancient Civilization",
        description: "A long-lost civilization's secrets lie buried beneath the sands of a desolate planet. Your mission: observe the intricate ruins, decipher cryptic symbols, and collect artifacts for analysis. Uncover the truth behind their sudden disappearance and piece together the fragments of their history!",
        distance: '',
        destinations: '',
        tasks: ["Observation", "Equipment Repair", "Surface Test", "Collect Debris", "Alien contact"],
        equipment: ["Night Vision Goggles", "Universal Translator Radio", "Lazer", "Shovels", "Sample Containers", "Cameras", "Grab Poles", "Collection Nets", "Beakers", "Toolbox", "Gift Offerings"],
        imageurl: "https://cdn.mos.cms.futurecdn.net/cf3j6AWGEfJ8LKfTDSekEY.jpg"
       },
       {
        id: 2,
        name: "Stardust Voyage: Cosmic Timeshift",
        description: "A mysterious rift in spacetime threatens to unravel the fabric of reality. Your mission: venture to the edge of the anomaly and conduct surface tests to understand its nature and origin! Can you stabilize the rift before it tears the universe apart?",
        distance: '',
        destinations: '',
        tasks: ["Observation", "Equipment Repair", "Surface Test", "Collect Debris", "Alien contact"],
        equipment: ["Night Vision Goggles", "Universal Translator Radio", "Lazer", "Shovels", "Sample Containers", "Cameras", "Grab Poles", "Collection Nets", "Beakers", "Toolbox", "Gift Offerings"],
        imageurl: "https://www.ingenieur.de/wp-content/uploads/2017/11/2014/1555_Der-Marsrover-Opportunity.jpg"
       },
       {
        id: 3,
        name: "Cosmic Expedition: Is This Life?",
        description: "A dying star system is on the brink of collapse, but rumors of habitable planets persist. Your mission: collect vital resources while conducting thorough surface tests to determine if life could survive in this harsh environment. The clock is ticking, and the fate of countless beings rests in your hands!", 
        distance: '',
        destinations: '',
        tasks: ["Observation", "Equipment Repair", "Surface Test", "Collect Debris", "Alien contact"],
        equipment: ["Night Vision Goggles", "Universal Translator Radio", "Lazer", "Shovels", "Sample Containers", "Cameras", "Grab Poles", "Collection Nets", "Beakers", "Toolbox", "Gift Offerings"],
        imageurl: "https://www.universetoday.com/wp-content/uploads/2020/05/RAT_rover_by_night_pillars-1920x1200.jpg"
       },
       {
        id: 4,
        name: "Nebula Nexus: Beacon of the Unknown",
        description: "A cryptic signal from a previously unknown alien species has been intercepted. Your mission: establish alien contact and decipher their complex communication patterns.  Are they friend, foe, or something in between? Tread carefully, as the fate of humanity could hang in the balance of this first encounter!",
        distance: '',
        destinations: '',
        tasks: ["Observation", "Equipment Repair", "Surface Test", "Collect Debris", "Alien contact"],
        equipment: ["Night Vision Goggles", "Universal Translator Radio", "Lazer", "Shovels", "Sample Containers", "Cameras", "Grab Poles", "Collection Nets", "Beakers", "Toolbox", "Gift Offerings"],
        imageurl: ""
       },
       {
        id: 5,
        name: "Void Voyager: Operation Salvage",
        description: "A vital satellite orbiting a gas giant has malfunctioned, leaving a crucial scientific mission in jeopardy. Your mission: dock with the damaged satellite, conduct equipment repairs, and restore its functionality. The clock is ticking, and the data it holds could unlock the secrets of the universe!",
        distance: '',
        destinations: '',
        tasks: ["Observation", "Equipment Repair", "Surface Test", "Collect Debris", "Alien contact"],
        equipment: ["Night Vision Goggles", "Universal Translator Radio", "Lazer", "Shovels", "Sample Containers", "Cameras", "Grab Poles", "Collection Nets", "Beakers", "Toolbox", "Gift Offerings"],
        imageurl: ""
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
                                        <p className="card-text"><strong>Tasks: </strong></p>
                                        <p className="card-text"><strong>Equipment: </strong></p>
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