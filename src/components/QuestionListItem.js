import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class QuestionListItem extends React.Component {

  render() {
    const {question_id, question} = this.props
    return (<Link to={`/questions/${question_id}`}>Question
      <div className="question">
        <div>Would you rather</div>
        <div>
          <p>
            {question.optionOne.text}...
          </p>
        </div>
      </div>
    </Link>);
  }
}
function mapStateToProps({
  questions
}, {question_id}) {

  const question = questions[question_id];
  return {question}
}

export default connect(mapStateToProps)(QuestionListItem)
