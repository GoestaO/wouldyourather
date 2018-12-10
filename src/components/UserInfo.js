import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserInfo extends Component {
  render() {
    return (<div>{this.props.authedUserDetails && (<img src={this.props.authedUserDetails.avatarURL} alt="avatar of the user" className="avatar-nav"/>)}
      {this.props.authedUserDetails && (this.props.authedUserDetails.name)}
    </div>)

  }
}

const mapStateToProps = ({authedUser, users}) => {
  return {authedUserDetails: users[authedUser]}
}

export default connect(mapStateToProps)(UserInfo);
