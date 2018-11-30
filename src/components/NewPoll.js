import React, {Component} from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Button
} from 'reactstrap';
import {connect} from 'react-redux';
import {createNewQuestionAsync} from '../actions/questions';

// ** The form is available at/add.
// ** The application shows the text “Would You Rather” and has a form for creating two options.
// ** Upon submitting the form, a new poll is created and the user is taken to the home page.
// ** The new polling question appears in the correct category on the home page
// ** Submit the form only, when

class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOneText: '',
      optionTwoText: ''
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
  }

  render() {
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
