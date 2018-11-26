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
      <Col sm="6 offset-md-3">
        <Card>
          {/* <CardImg top width="5%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap"/> */}
          <CardBody>
            <CardTitle>Would you rather</CardTitle>
            <CardText>{question.optionOne.text}...</CardText>
          </CardBody>
        </Card>
      </Col>
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
