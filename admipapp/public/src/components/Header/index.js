import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {signout} from '../../actions';
import { useNavigate } from 'react-router-dom';


/**
* @author
* @function Header
**/

export const Header = (props) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(signout());
    

    navigate('/signin');
  }


  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className='nav-item'>
          <span href='/Signout' className='nav-link' onClick={logout}>Signout</span>
        </li>
      </Nav>
    );
  }

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className='Nav-item'>
          <Nav.Link href='/Signin' className='Nav-link' activeClassName="active">Signin</Nav.Link>
        </li>
        <li className='Nav-item'>
          <Nav.Link href='/Signup' className='Nav-link' activeClassName="active">Signup</Nav.Link>
        </li>
      </Nav>
    );
  }

  return (

    <Navbar collapseOnSelect fixed='top' expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
      <Container fluid>
        <Navbar.Brand href="/" className='navbar-brand'>Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}


        </Navbar.Collapse>
      </Container>
    </Navbar>

  )

}