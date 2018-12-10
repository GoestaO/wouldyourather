import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Nav, Navbar, NavItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import UserInfo from './UserInfo';


const Navigation = () => {
    return (<div>
      <Navbar color="light" expand="md">
        <Link to="/">Dashboard</Link>
        <Nav className="ml-left" navbar>
          <NavItem className="ml-2">
            <Link to="/add">New Question</Link>
          </NavItem>
          <NavItem className="ml-2">
            <Link to="/leaderboard">Leaderboard</Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto">
          <NavItem className="mr-5">
            <UserInfo/>
          </NavItem>
          <NavItem>
            <LogoutButton />
          </NavItem>
        </Nav>
      </Navbar>
    </div>)
}

export default Navigation;
