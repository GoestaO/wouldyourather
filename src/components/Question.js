import React from 'react';
import {connect} from 'react-redux';
import {answerQuestionAsync} from '../actions/questions';
import {Redirect, withRouter} from 'react-router-dom';
import { Button } from 'reactstrap';

class Question extends React.Component {

  // stateful component to store the answer
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      redirectToStatistics: false
    }
  }

  //TODO: Wenn Frage schon beantwortet, radiobutton mit der Antwort vorselektieren

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
    const {question_id, question, author, authedUser} = this.props;
    const {redirectToStatistics} = this.state;
    if (redirectToStatistics === true) {
      return (<Redirect to={`/statistics/${question_id}`}/>)
    }

    return (

      (question && author && authedUser !== null)
      ? (<div className="question">
        <h2>Would you rather</h2>
        <div>
          <img src={author.avatarURL} alt={`Avatar of ${author.name}`} className='avatar'/>
          <span>{author.name}</span>
        </div>
        <form onSubmit={(e) => this.answerQuestion(e)}>
          <div className="question-options">
            <label>
              <input type="radio" name="answer" value="optionOne" onChange={this._handleRadio}/>{question && question.optionOne.text}
            </label>
            <label>
              <input type="radio" name="answer" value="optionTwo" onChange={this._handleRadio}/>{question && question.optionTwo.text}
            </label>

          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>)
      : null);
  }
}

function mapStateToProps({
  questions,
  users,
  authedUser
}, ownProps) {
  const {question_id} = ownProps.match.params;
  const question = questions[question_id];
  const author = question
    ? users[question.author]
    : null;
  return {question_id, question, author, authedUser}
}
export default withRouter(connect(mapStateToProps)(Question));
