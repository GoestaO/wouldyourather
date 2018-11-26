import React from 'react';
import {connect} from 'react-redux';
import QuestionListItem from './QuestionListItem';
import {VisibilityFilters, toggleVisibility} from '../actions/visibilityFilter';
import {ButtonGroup, Button, ListGroup, ListGroupItem} from 'reactstrap';

class QuestionList extends React.Component {

  toggleVisibilityFilter = () => {
    const filter = this.props.visibilityFilter;
    this
      .props
      .dispatch(toggleVisibility(filter));
  }

  render() {
    return (<div>
      {
        this.props.visibilityFilter === VisibilityFilters.SHOW_UNANSWERED
          ? (<h3>Unanswered Questions</h3>)
          : (<h3>Answered Questions</h3>)
      }

      <Button color="info" onClick={() => this.toggleVisibilityFilter()}>Toggle visiblity</Button>
      <ListGroup>
        {this.props.questionIds && (this.props.questionIds.map((questionId) => <ListGroupItem key={questionId}><QuestionListItem question_id={questionId}/></ListGroupItem>))}
      </ListGroup>
    </div>);
  }
}
function mapStateToProps({questions, authedUser, visibilityFilter}) {
  let {filteredQuestions, filteredQuestionIds} = [];

  // Filter questions by checking votes contain authed User
  if (Object.keys(questions).length > 0) {
    const questionArray = getNestedObjectAsArray(questions);
    switch (visibilityFilter) {
      case VisibilityFilters.SHOW_ANSWERED:
        filteredQuestions = questionArray.filter((question) => question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
        break;
      case VisibilityFilters.SHOW_UNANSWERED:
        filteredQuestions = questionArray.filter((question) => !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))
        break;
    }

  }


  // Sort by timestamp desc and return the ids only
  if (filteredQuestions && filteredQuestions.length > 0) {
    filteredQuestionIds = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp).map((question) => question.id)
  }

  return {questionIds: filteredQuestionIds, authedUser: authedUser, visibilityFilter}
}

const getNestedObjectAsArray = obj => {
  let list = [];
  for (var key in obj) {
    list.push(obj[key]);
  }
  return list;
}

export default connect(mapStateToProps)(QuestionList);
