import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Container, Table, Badge, Progress} from 'reactstrap';

class QuestionStatistics extends Component {

  render() {
    const {
      question,
      votesOptionOne,
      votesOptionTwo,
      votesOptionOnePercent,
      votesOptionTwoPercent,
      voteAuthedUser
    } = this.props;

    return (<Container>
      {
        (question) && (<div>
          <h2>Question Statistics</h2>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Option</th>
                <th>Votes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                voteAuthedUser === "optionOne"
                  ? (<tr className="table-info">
                    <td>
                      <Badge color="secondary">Your answer</Badge>
                    </td>
                    <td>{question.optionOne.text}</td>
                    <td>{votesOptionOne}</td>
                    <td>
                      <Progress value={votesOptionOnePercent.toFixed(0)}/> {votesOptionOnePercent.toFixed(0)}
                      %
                    </td>
                  </tr>)
                  : (<tr>
                    <td></td>
                    <td>{question.optionOne.text}</td>
                    <td>{votesOptionOne}</td>
                    <td><Progress value={votesOptionOnePercent.toFixed(0)}/> {votesOptionOnePercent.toFixed(0)}%</td>
                  </tr>)
              }
              {
                voteAuthedUser === "optionTwo"
                  ? (<tr className="table-info">
                    <td>
                      <Badge color="secondary">Your answer</Badge>
                    </td>
                    <td>{question.optionTwo.text}</td>
                    <td>{votesOptionTwo}</td>
                    <td><Progress value={votesOptionTwoPercent.toFixed(0)}/>{votesOptionTwoPercent.toFixed()}%</td>
                  </tr>)
                  : (<tr>
                    <td></td>
                    <td>{question.optionTwo.text}</td>
                    <td>{votesOptionTwo}</td>
                    <td><Progress value={votesOptionTwoPercent.toFixed(0)}/> {votesOptionTwoPercent.toFixed(0)}%</td>
                  </tr>)
              }
            </tbody>
          </Table>
        </div>)
      }
    </Container>)
  }
}
function mapStateToProps({
  questions,
  authedUser,
  users
}, {question_id}) {
  const question = questions[question_id];
  const voteAuthedUser = users[authedUser].answers[question_id];
  const votesOptionOne = question
    ? question.optionOne.votes.length
    : 0;
  const votesOptionTwo = question
    ? question.optionTwo.votes.length
    : 0;
  const votesTotal = votesOptionOne + votesOptionTwo;
  const votesOptionOnePercent = votesTotal > 0
    ? votesOptionOne / votesTotal * 100
    : 0;
  const votesOptionTwoPercent = votesTotal > 0
    ? votesOptionTwo / votesTotal * 100
    : 0;
  return {
    question,
    votesOptionOne,
    votesOptionTwo,
    votesTotal,
    votesOptionOnePercent,
    votesOptionTwoPercent,
    authedUser,
    voteAuthedUser
  }
}

export default withRouter(connect(mapStateToProps)(QuestionStatistics));
