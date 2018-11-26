import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
class Navigation extends Component {
  render() {
    return (<div>
      <Navbar color="light" expand="md">
        <Link to="/">Home</Link>

        <Nav className="ml-left" navbar>
          <NavItem>
            <NavLink href="/new">New Question</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/leaderboard">Leaderboard</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto">
          <NavItem className="mr-5">
            {this.props.authedUserDetails &&(<img src={this.props.authedUserDetails.avatarURL} className="avatar"/>)}
        {this.props.authedUserDetails &&(this.props.authedUserDetails.name)}
          </NavItem>
          <NavItem>
            <Button>Logout</Button>
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
