import React from 'react';
import {connect} from 'react-redux';
import {answerQuestionAsync} from '../actions/questions';

class Question extends React.Component {

  // stateful component to store the answer
  constructor(props) {
    super(props);
    this.state = {
      answer: ''
    }
  }

  answerQuestion = (event) => {
    event.preventDefault();
    const answer = this.state.answer;
    const {qid, authedUser} = this.props;
    this
      .props
      .dispatch(answerQuestionAsync(authedUser, qid, answer));
  }

  _handleRadio = (event) => {
    const answer = event.currentTarget.value;
    this.setState({answer: answer})
  }

  render() {
    const {question, author} = this.props;
    return (<div>
      <div className="question-info">{author && author.name}
        asks:</div>
      <h2>Would you rather</h2>
      <form onSubmit={(e) => this.answerQuestion(e)}>
        <div className="question-options">
          <label>
            <input type="radio" name="answer" value="optionOne" onChange={this._handleRadio}/>{question && question.optionOne.text}
          </label>
          <label>
            <input type="radio" name="answer" value="optionTwo" onChange={this._handleRadio}/>{question && question.optionTwo.text}
          </label>

        </div>
        <button type="submit">Submit</button>
      </form>
    </div>);
  }
}

function mapStateToProps({
  questions,
  users,
  authedUser
}, props) {
  const {id} = props.match.params;
  console.log(questions);
  const question = questions[id];
  const author = question
    ? users[question.author]
    : null;
  return {id, question, author, authedUser}
}

export default connect(mapStateToProps)(Question);
