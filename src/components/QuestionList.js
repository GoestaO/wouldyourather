import React from 'react';
import {connect} from 'react-redux';
import QuestionListItem from './QuestionListItem';
import {VisibilityFilters, toggleVisibility} from '../actions/visibilityFilter';
import {Button, ButtonGroup, ListGroup, ListGroupItem} from 'reactstrap';
import {getObjectAsArray} from '../utils/helpers';

class QuestionList extends React.Component {

  toggleVisibilityFilter = (filter) => {
    this
      .props
      .dispatch(toggleVisibility(filter));
  }

  render() {
  const {visibilityFilter} = this.props;
    return (<div>
      {
        visibilityFilter === VisibilityFilters.SHOW_UNANSWERED
          ? (<h3>Unanswered Questions</h3>)
          : (<h3>Answered Questions</h3>)
      }

      <ButtonGroup>
        <Button color="primary" onClick={() => this.toggleVisibilityFilter(VisibilityFilters.SHOW_UNANSWERED)} active={visibilityFilter === VisibilityFilters.SHOW_UNANSWERED}>Show unanswered</Button>
        <Button color="primary" onClick={() => this.toggleVisibilityFilter(VisibilityFilters.SHOW_ANSWERED)} active={visibilityFilter === VisibilityFilters.SHOW_ANSWERED}>Show answered</Button>
      </ButtonGroup>
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
    const questionArray = getObjectAsArray(questions);
    switch (visibilityFilter) {
      case VisibilityFilters.SHOW_ANSWERED:
        filteredQuestions = questionArray.filter((question) => question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
        break;
      case VisibilityFilters.SHOW_UNANSWERED:
        filteredQuestions = questionArray.filter((question) => !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))
        break;
      default:
        filteredQuestions = []
    }

  }

  // Sort by timestamp desc and return the ids only
  if (filteredQuestions && filteredQuestions.length > 0) {
    filteredQuestionIds = filteredQuestions
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((question) => question.id)
  }

  return {questionIds: filteredQuestionIds, authedUser: authedUser, visibilityFilter}
}

export default connect(mapStateToProps)(QuestionList);
