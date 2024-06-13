import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(checkAuth());

  useEffect(() => {
    const checkLoginStatus = async () => {
      const auth = await checkAuth();
      setIsLoggedIn(auth);
    };
    checkLoginStatus();
  }, []);

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/missions" element={isLoggedIn ? <Missions /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/spacecrafts" element={isLoggedIn ? <Spacecrafts /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/explore" element={isLoggedIn ? <Explore /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/spacecrafts/:id" element={<Spacecraft />} />
      </Routes>
    </div>
  );
}

export default App;
