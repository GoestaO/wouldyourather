import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';

class QuestionListItem extends React.Component {

  render() {
    const {question_id, question} = this.props
    return (<Card>
      <CardBody>
        <CardTitle>Would You Rather...</CardTitle>
        <CardText>{question.optionOne.text}...</CardText>
      </CardBody>
      <Link role="button" className="card-link" to={`/questions/${question_id}`}>View it</Link>
    </Card>);
  }
}
function mapStateToProps({
  questions
}, {question_id}) {

  const question = questions[question_id];
  return {question}
}

export default connect(mapStateToProps)(QuestionListItem)
