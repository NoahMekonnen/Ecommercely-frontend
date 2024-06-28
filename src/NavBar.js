import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = ({ searchFilter, handleChange, handleSearch, user, setShowCart, showCart }) => {
  const [navStyle, setNavStyle] = useState({ width: '100vw' })
  useEffect(() => {
    if (showCart) {
      setNavStyle({ width: '92%' })
    } else {
      setNavStyle({ width: '100%' })
    }
  }, [showCart])

  return (
    <Navbar expand="lg" className="Nav bg-body-tertiary" data-bs-theme="dark"
      style={navStyle}>
      <Container fluid>
        <Navbar.Brand href="/">
          {user.username ? `Welcome ${user.username}` : 'Ecommercely'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >
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
                  Account Information
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
          onSubmit={handleSearch}>
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