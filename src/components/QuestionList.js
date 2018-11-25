import React from 'react';
import {connect} from 'react-redux';
import QuestionListItem from './QuestionListItem';

class QuestionList extends React.Component {

  render() {
    return (<div>
      QuestionList
      <ul className='dashboard-list'>
        {
          this
            .props
            .questionIds
          .map((questionId) => <li key={questionId}><QuestionListItem id={questionId}/></li>)
        }
      </ul>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    questionIds: Object.keys(state.questions).sort((a, b) => state.questions[b].timestamp - state.questions[a].timestamp),
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(QuestionList);
