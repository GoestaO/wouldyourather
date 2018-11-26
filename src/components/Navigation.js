import React from 'react'
// import {NavLink} from 'react-router-dom'
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
export default function Navigation() {
  return (<div>
    <Navbar color="light" expand="md">
      <NavbarBrand href="/">Home</NavbarBrand>

      <Nav className="ml-left" navbar>
        <NavItem>
          <NavLink href="/new">New Question</NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto">
        <NavItem>
          Login/Logout
        </NavItem>

      </Nav>

    </Navbar>
  </div>)
}
