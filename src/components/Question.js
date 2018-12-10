import React from 'react';
import {connect} from 'react-redux';
import {answerQuestionAsync} from '../actions/questions';
import {Redirect, withRouter} from 'react-router-dom';
import {
  Button,
  Input,
  Form,
  Label,
  Row,
  Col,
  Badge
} from 'reactstrap';

class Question extends React.Component {

  // stateful component to store the answer
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      redirectToStatistics: false
    }
  }

  answerQuestion = (event) => {
    event.preventDefault();
    const answer = this.state.answer;
    const {question_id, authedUser} = this.props;
    this
      .props
      .dispatch(answerQuestionAsync(authedUser, question_id, answer));
    this.setState(() => ({redirectToStatistics: true}))
  }

  _handleRadio = (event) => {
    const answer = event.currentTarget.value;
    this.setState({answer: answer})
  }

  render() {
    const {
      question_id,
      question,
      author,
      authedUser,
      users,
      visibilityFilter
    } = this.props;
    const {redirectToStatistics} = this.state;

    const questionAlreadyAnswered = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser);

    if (redirectToStatistics === true) {
      return (<Redirect to={`/statistics/${question_id}`}/>)
    }
    if (question === undefined) {
      return <Redirect to="/page-not-found"/>
    }

    return (
      (question && author && authedUser !== null)
      ? (<div>
        <div>
          <img src={author.avatarURL} alt={`Avatar of ${author.name}`} className='avatar'/>
        </div>
        <div>
          {author.name}
          {' asks:'}
        </div>
        <h4>Would You Rather</h4>

        <Form onSubmit={(e) => this.answerQuestion(e)}>
          <Row>
            <Col className="col-sm-4 offset-sm-2">
              <Label>
                <Input type="radio" name="answer" value="optionOne" onChange={this._handleRadio} defaultChecked={users[authedUser].answers[question_id] === "optionOne"}/> {question.optionOne.text}
                {
                  users[authedUser].answers[question_id] === "optionOne"
                    ? (<Badge color="secondary">Your answer</Badge>)
                    : null
                }
              </Label>
            </Col>
            OR
            <Col className="col-sm-4">
              <Label>
                <Input type="radio" name="answer" value="optionTwo" onChange={this._handleRadio} defaultChecked={users[authedUser].answers[question_id] === "optionTwo"}/> {question.optionTwo.text}
                {
                  users[authedUser].answers[question_id] === "optionTwo"
                    ? (<Badge color="secondary">Your answer</Badge>)
                    : null
                }
              </Label>
            </Col>
          </Row>
          <Button color="primary" type="submit" disabled={visibilityFilter === "SHOW_ANSWERED" || this.state.answer === '' || questionAlreadyAnswered === true}>Submit</Button>
        </Form>
      </div>)
      : null);
  }
}

function mapStateToProps({
  questions,
  users,
  authedUser,
  visibilityFilter
}, ownProps) {
  const {question_id} = ownProps.match.params;
  const question = questions[question_id];
  const author = question
    ? users[question.author]
    : null;
  return {
    question_id,
    question,
    author,
    authedUser,
    users,
    visibilityFilter
  }
}
export default withRouter(connect(mapStateToProps)(Question));
