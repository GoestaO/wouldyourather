import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {setAuthedUser} from '../actions/authedUser';
import {connect} from 'react-redux';

class LogoutButton extends Component {

  logout = () => {
    this
      .props
      .dispatch(setAuthedUser(null));
  }

  render() {
    return (<div>{
        this.props.authedUser === null
          ? null
          : (<div>
            <Button className="btn my-2 my-sm-0 nav-button" onClick={() => this.logout()}>Logout</Button>
          </div>)
      }</div>)
  }
}

const mapStateToProps = ({authedUser}) => {
  return {authedUser}
}

export default connect(mapStateToProps)(LogoutButton)
