import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import EventPage from './pages/EventPage';
import AddEvent from './pages/AddEvent';
import Homepage from './pages/Homepage';
import Profilepage from './pages/Profilepage';

function AppWrapper() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const isLoggedIn = user !== null;
  const isOrganizer = user && user.role === 'organizer';

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const showNavbar = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showNavbar && (
        <header>
          <Navbar className="navbar days-one-regular d-flex" variant="dark">
            <Link
              to={isLoggedIn ? '/' : '/login'}
              className="navbar-brand days-one-regular"
            >
              Sportify
            </Link>
            <Nav className="me-auto w-100 justify-content-end">
              {isLoggedIn ? (
                <>
                  {isOrganizer && (
                    <Link to="/add" className="nav-link mr-2">
                      Adauga eveniment
                    </Link>
                  )}

                  <NavDropdown title="Setari" className="mx-5">
                    <Link className="dropdown-item" to="/profile">
                      Profil
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={handleLogout}
                    >
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
      )}

      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<AddEvent />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/profile" element={<Profilepage />} />
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
