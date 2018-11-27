import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Col} from 'reactstrap';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

class QuestionListItem extends React.Component {

  render() {
    const {question_id, question} = this.props
    return (<Link to={`/questions/${question_id}`}>
      <Card>
        <CardBody>
          <CardTitle>Would you rather</CardTitle>
          <CardText>{question.optionOne.text}...</CardText>
        </CardBody>
      </Card>
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
