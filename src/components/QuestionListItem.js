import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class QuestionListItem extends React.Component {

  render() {
    const {id, question} = this.props
    return (<Link to={`/question/${id}`}>Question
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
}, {id}) {

  const question = questions[id];
  return {question}
}

export default connect(mapStateToProps)(QuestionListItem)
