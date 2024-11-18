import React from 'react';
import './index.css';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Loginpage from './pages/Loginpage';
import EventPage from './pages/EventPage';
import AddEvent from './pages/AddEvent';
import Homepage from './pages/Homepage';

function AppWrapper() {
  const isLoggedIn = true;

  return (
    <>
      <header>
        <Navbar className="navbar days-one-regular d-flex" variant="dark">
          <Link to="/" className="navbar-brand days-one-regular">
            Sportify
          </Link>
          <Nav className="me-auto w-100 justify-content-end">
            {isLoggedIn ? (
              <>
                <Link to="/add" className="nav-link mr-2">
                  Adauga eveniment
                </Link>

                <NavDropdown title="Setari" className="mx-5">
                  <Link className="dropdown-item" to="#signout">
                    Deconectare
                  </Link>
                </NavDropdown>
              </>
            ) : (
              <Link to="/login" className="nav-link">
                Autentificare
              </Link>
            )}
          </Nav>
        </Navbar>
      </header>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<AddEvent />} />
        <Route path="/event" element={<EventPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
