import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Nav, Navbar, NavItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';


class Navigation extends Component {
  render() {
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
            {this.props.authedUserDetails &&(<img src={this.props.authedUserDetails.avatarURL} alt="avatar of the user" className="avatar-nav"/>)}
            {this.props.authedUserDetails &&(this.props.authedUserDetails.name)}
          </NavItem>
          <NavItem>
            <LogoutButton />
          </NavItem>
        </Nav>
      </Navbar>
    </div>)
  }
}

const mapStateToProps = ({authedUser, users}) => {
  return {
    authedUserDetails: users[authedUser],
  }
}

export default connect(mapStateToProps)(Navigation);
