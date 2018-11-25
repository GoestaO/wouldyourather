import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadInitalDataAsync} from '../actions/shared';

class PollStatistics extends Component {

  render() {
    const {
      question,
      votesOptionOne,
      votesOptionTwo,
      votesTotal,
      votesOptionOnePercent,
      votesOptionTwoPercent
    } = this.props;
    //TODO: eigenes Voting hervorheben
    return (<div>
      {
        (question) && (<div>Statistics
          <table>
            <thead>
              <tr>
                <td>Option</td>
                <td>#</td>
                <td>%</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{question.optionOne.text}</td>
                <td>{votesOptionOne}</td>
                <td>{votesOptionOnePercent}</td>
              </tr>
              <tr>
                <td>{question.optionTwo.text}</td>
                <td>{votesOptionTwo}</td>
                <td>{votesOptionTwoPercent}</td>
              </tr>
            </tbody>
          </table>
        </div>)
      }
    </div>)
  }
}

function mapStateToProps({
  questions,
  authedUser
}, props) {
  const {question_id} = props.match.params;
  const question = questions[question_id];
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
    votesOptionTwoPercent
  }
}

export default connect(mapStateToProps)(PollStatistics);
