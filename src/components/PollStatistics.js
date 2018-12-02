import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadInitalDataAsync} from '../actions/shared';
import {withRouter} from 'react-router-dom';
import {Container, Table, Badge} from 'reactstrap';

class PollStatistics extends Component {

  render() {
    const {
      question,
      votesOptionOne,
      votesOptionTwo,
      votesTotal,
      votesOptionOnePercent,
      votesOptionTwoPercent,
      voteAuthedUser
    } = this.props;

    return (<Container>
      {
        (question) && (<div><h2>Statistics for would you rather ...</h2>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Option</th>
                <th>Number of votes</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {
                voteAuthedUser === "optionOne"
                  ? (<tr className="table-info">
                    <td>
                      <Badge color="secondary">Your response</Badge>
                    </td>
                    <td>{question.optionOne.text}</td>
                    <td>{votesOptionOne}</td>
                    <td>{votesOptionOnePercent.toFixed(2)}</td>
                  </tr>)
                  : (<tr>
                    <td></td>
                    <td>{question.optionOne.text}</td>
                    <td>{votesOptionOne}</td>
                    <td>{votesOptionOnePercent.toFixed(2)}</td>
                  </tr>)
              }
              {
                voteAuthedUser === "optionTwo"
                  ? (<tr className="table-info">
                    <td>
                      <Badge color="secondary">Your response</Badge>
                    </td>
                    <td>{question.optionTwo.text}</td>
                    <td>{votesOptionTwo}</td>
                    <td>{votesOptionTwoPercent.toFixed(2)}</td>
                  </tr>)
                  : (<tr>
                    <td></td>
                    <td>{question.optionTwo.text}</td>
                    <td>{votesOptionTwo}</td>
                    <td>{votesOptionTwoPercent.toFixed(2)}</td>
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
}, props) {
  const {question_id} = props.match.params;
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

export default withRouter(connect(mapStateToProps)(PollStatistics));
