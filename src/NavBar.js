import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';


const NavBar = ({ searchFilter, handleChange, handleSearch, user, setShowCart }) => {
  const [navStyle, setNavStyle] = useState({ width: '100vw' })
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar expand="lg" className="Nav" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >
            <Navbar.Brand href="/">
          {user.username ? `Welcome ${user.username}` : 'Ecommercely'}
        </Navbar.Brand>
            {!user.username &&
              <>
                <Nav.Link as={NavLink} to="/login"
                  className='Nav-Link'>
                  Log in
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signup"
                  className='Nav-Link'>
                  Sign up
                </Nav.Link>
              </>
            }
            {
              user.isSeller &&
              <>
                <Nav.Link as={NavLink} to="/dashboard"
                  className='Nav-Link'>
                  Dashboard
                </Nav.Link>
              </>
            }
            {user.username &&
              <>
                <Nav.Link as={NavLink} to="/logout"
                  className='Nav-Link'>
                  Logout
                </Nav.Link>
                <Nav.Link as={NavLink} to='/profile'
                  className='Nav-Profile Nav-Link'>
                  Account Info
                </Nav.Link>
                <Nav.Link as={NavLink} to='/customer/orders'
                  className='Nav-Link'>
                  My Orders
                </Nav.Link>

              </>
            }
          </Nav>
        </Navbar.Collapse>
        <Form className="Nav-Form d-flex"
          onSubmit={(e) => {
            if (location.pathname != '/') {
              navigate('/')
            }
            handleSearch(e)
          }
        }>
          <Form.Control
            type="search"
            placeholder="Search by product name or category"
            className="Nav-SearchBar me-2"
            aria-label="Search"
            value={searchFilter}
            onChange={handleChange}
          />
          <button className='btn btn-success'>Search</button>
        </Form>
        {
          user.username && !user.isAdmin &&
          <>
            <Button className='Nav-CartIcon-Button'
              onClick={() => setShowCart(status => !status)}>
              <FontAwesomeIcon icon={faCartShopping} />
            </Button>
          </>
        }
        {
          user.isSeller &&
          <Nav.Link as={NavLink} to='/products/new' className="Nav-Add">
            Make Product
          </Nav.Link>
        }
      </Container>
    </Navbar>
  );
}

export default NavBar