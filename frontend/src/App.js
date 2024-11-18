import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Loginpage from './pages/Loginpage';

function App() {
  const isLoggedIn = false;

  return (
    <BrowserRouter>
      <header>
        <Navbar className="navbar days-one-regular d-flex" variant="dark">
          <LinkContainer to="/">
            <Navbar.Brand className="days-one-regular">Sportify</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto w-100 justify-content-end">
            {isLoggedIn ? (
              <>
                <Link to="/event" className="nav-link">
                  Adauga eveniment
                </Link>

                <NavDropdown title="Profile">
                  <Link className="dropdown-item" to="#signout">
                    Deconectare
                  </Link>
                </NavDropdown>
              </>
            ) : (
              <Link to="/auth" className="nav-link">
                Autentificare
              </Link>
            )}
          </Nav>
        </Navbar>
      </header>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
