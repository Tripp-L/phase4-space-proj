import React from "react";
import { Link, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MyNavbar({ isLoggedIn, setIsLoggedIn }) {


  const handleLogout = async () => {
    try {
      const response = await fetch("/logout"); 
      if (response.ok) {
        setIsLoggedIn(false);
        Route("/");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
    <Container>
      {/* <Navbar.Brand as={Link} to="/">Interstellar Explorer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/missions">Missions</Nav.Link>
              <Nav.Link as={Link} to="/spacecrafts">Spacecrafts</Nav.Link>
              <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default MyNavbar;