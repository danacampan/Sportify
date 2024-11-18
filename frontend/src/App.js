import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Loginpage from './pages/Loginpage';
import AddEvent from './pages/AddEvent';
import Homepage from './pages/Homepage';

function AppWrapper() {
  const isLoggedIn = false;

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
                <Link to="/add" className="nav-link">
                  Adauga eveniment
                </Link>

                <NavDropdown title="Profile">
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
