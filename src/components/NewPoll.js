import React, {Component} from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button
} from 'reactstrap';
import {connect} from 'react-redux';
import {createNewQuestionAsync} from '../actions/questions';
import {Redirect} from 'react-router-dom';


class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOneText: '',
      optionTwoText: '',
      redirectToHome: false
    }
  }

  handleChangeOptionOne = (e) => {
    const input = e.currentTarget.value;
    this.setState(() => ({optionOneText: input}))
  }
  handleChangeOptionTwo = (e) => {
    const input = e.currentTarget.value;
    this.setState(() => ({optionTwoText: input}))
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      optionOneText: this.state.optionOneText,
      optionTwoText: this.state.optionTwoText,
      author: this.props.authedUser
    };
    this
      .props
      .dispatch(createNewQuestionAsync(question));
    this.setState(() => ({redirectToHome: true}));
  }

  render() {
    if (this.state.redirectToHome === true) {
      return (<Redirect to="/"/>)
    }
    return (<Col sm="6 offset-md-3">
      <Form className="form " onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Create New Poll</h2>
        <FormGroup>
          <Label>Would You Rather</Label>
        </FormGroup>
        <FormGroup>
          <Label>Option One</Label>
          <Input type="text" name="optionOne" id="optionOne" onChange={(e) => this.handleChangeOptionOne(e)}/>
        </FormGroup>
        <FormGroup>
          <Label>Option Two</Label>
          <Input type="text" name="optionTwo" id="optionTwo" onChange={(e) => this.handleChangeOptionTwo(e)}/>
        </FormGroup>
        <Button color="primary" type="submit" disabled={this.state.optionOne === '' || this.state.optionTwo === ''}>Submit</Button>
      </Form>
    </Col>);
  }
}
const mapStateToProps = ({authedUser}) => {
  return {authedUser: authedUser};
}

export default connect(mapStateToProps)(NewPoll)
