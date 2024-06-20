
import React, { useState } from 'react';
import axios from 'axios';
import "./signup.css"

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/signup', { username, email, password });
      if (response.status === 201) {
        setMessage(`Signup successful: Welcome ${response.data.username}`);
        // Redirect or show success message
      } else {
        setMessage('Signup failed');
      }
    } catch (error) {
      setMessage(`Signup failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <form className="signup" onSubmit={handleSignup}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Signup</button>
      <p>{message}</p>
    </form>
  );
}

export default Signup;