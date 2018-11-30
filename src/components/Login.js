import React, {Component} from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import {connect} from 'react-redux';
import {getObjectAsArray} from '../utils/helpers';
import {setAuthedUser} from '../actions/authedUser';
import {Redirect} from 'react-router-dom';

// Once the user logs in, the home page is shown
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: '',
      redirectToHome: false
    }
  }

  _handleDropDown = (e) => {
    this.setState({selectedUserId: e.currentTarget.value});
  }

  login = (e) => {
    e.preventDefault();
    const selectedUserId = this.state.selectedUserId;
    this
      .props
      .dispatch(setAuthedUser(selectedUserId));
    this.setState({selectedUserId: '', redirectToHome: true})
  }

  render() {
    if (this.state.redirectToHome === true) {
      return (<Redirect to="/"/>)
    }
    return (<Container className="App col-sm-4">
      <h2>Sign In</h2>
      <Form className="form md-3" onSubmit={(e) => this.login(e)}>
        <Col>
          <FormGroup>
            <Label for="users">Select User:</Label>
            <Input type="select" name="select" id="users" onChange={(e) => this._handleDropDown(e)}>o
              <option>{this.props.authedUser}</option>
              {(this.props.usersIds) && (this.props.usersIds.map((id) => <option key={id}>{id}</option>))}
            </Input>
          </FormGroup>
        </Col>
        <Button>Submit</Button>
      </Form>
    </Container>);
  }
}

const mapStateToProps = ({users, authedUser}) => {
  return {
    usersIds: Object
      .keys(users)
      .filter((id) => id !== authedUser)
      .sort(),
    authedUser
  }
}

export default connect(mapStateToProps)(Login);
