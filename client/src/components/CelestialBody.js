import React, { useState } from 'react';
import { useSpace } from '../App'; 

const CelestialBody = () => {
    const [visibleDetails, setVisibleDetails] = useState({});
    const { toggleCelestialBody } = useSpace();  

    const toggleDetails = id => {
        setVisibleDetails(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
        toggleCelestialBody(celestialBodies.find(body => body.id === id));
    };

    const celestialBodies = [
        {
            id: 1,
            name: "Nibiru's Echo",
            description: "A mystical body rumored to have been the home of advanced ancient civilizations.",
            type: "planet",
            distance: "5 million light years",
            imageUrl: "https://t4.ftcdn.net/jpg/05/85/34/33/360_F_585343315_HzKX5Ur6xIY9XancV1FcG85zmhd2Xbku.jpg"
        },
        {
            id: 2,
            name: "Polaris Prime",
            description: "The brightest star in the constellation known as the North Star.",
            type: "star",
            distance: "433 light years",
            imageUrl: "https://storage.googleapis.com/pod_public/1300/154252.jpg"
        },
        {
            id: 3,
            name: "Stellar Whirlpool",
            description: "A mesmerizing galaxy with a prominent supermassive black hole at its center.",
            type: "galaxy",
            distance: "23 million light years",
            imageUrl: "https://as1.ftcdn.net/v2/jpg/05/41/11/68/1000_F_541116858_GaBIJxT4yF5uVcxfFib9imDfN4SzAFVO.jpg"
        }
    ];

    return (
        <div className="container celestial-container">
            <h1 className="celestial-title my-3"><span className="emoji">🌌</span> Celestial Bodies <span className="emoji">🌌</span></h1>
            <div className="row">
                {celestialBodies.map((body) => (
                    <div key={body.id} className="col-md-4 mb-3">
                        <div className="card celestial-card" onClick={() => toggleDetails(body.id)}>
                            <img src={body.imageUrl} className="card-img-top" alt={body.name} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    <span className="emoji">🪐</span>
                                    <strong>{body.name}</strong>
                                    <span className="emoji">🪐</span>
                                </h5>
                                {visibleDetails[body.id] && (
                                    <>
                                        <p className="card-text">{body.description}</p>
                                        <p className="card-text"><strong>Type:</strong> {body.type}</p>
                                        <p className="card-text"><strong>Distance:</strong> {body.distance}</p>
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

export default CelestialBody;