import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Nav.css'; 

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar mb-3">
      <Container className="navrow">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-items">
            <Nav.Link as={Link} to="/" className="nav-link">
              <img src="path/to/home-image.jpg" alt="Home" className="nav-image" />
              <span className="nav-text">Home</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/player" className="nav-link">
              <img src="path/to/player-image.jpg" alt="Player" className="nav-image" />
              <span className="nav-text">Player</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/destinations" className="nav-link">
              <img src="path/to/destinations-image.jpg" alt="Destinations" className="nav-image" />
              <span className="nav-text">Destinations</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/missions" className="nav-link">
              <img src="path/to/missions-image.jpg" alt="Missions" className="nav-image" />
              <span className="nav-text">Missions</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/spacecrafts" className="nav-link">
              <img src="path/to/spacecrafts-image.jpg" alt="Spacecrafts" className="nav-image" />
              <span className="nav-text">Spacecrafts</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;