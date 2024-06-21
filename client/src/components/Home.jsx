import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import "./Home.css"

function Home() {
  const [showSignup, setShowSignup] = useState(true);

  return (
    <div className="welcome" style={{ padding: '20px' }}>
      <h1>Welcome to Space Explorer</h1>
      <p>Explore the universe with our advanced spacecrafts and missions.</p>
      {showSignup ? <Signup onSignup={() => setShowSignup(false)} /> : <Login />}
    </div>
  );
}

export default Home;