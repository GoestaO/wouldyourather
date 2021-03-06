import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container} from 'reactstrap';
import {Table} from 'reactstrap';

class Leaderboard extends Component {

  render() {
    const {authedUser, userRanking} = this.props;
    return (<Container>
      <h2>Leaderboard</h2>
      <Table responsive="responsive" id="leaderboard">
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Name</th>
            <th>Questions asked</th>
            <th>Questions answered</th>
            <th>Total points</th>
          </tr>
        </thead>
        <tbody>
          {
            userRanking.map((entry, index) => <tr key={entry[0]} className={entry[0] === authedUser
              ? "table-info"
              : null}>
              <td>{index+1}</td>
              <td>
                <img src={entry[2]} alt="avatar of the user" className="avatar"/>
                {entry[1]}
              </td>
              <td>{entry[3]}</td>
              <td>{entry[4]}</td>
              <td>{entry[5]}</td>
            </tr>)
          }
        </tbody>
      </Table>
    </Container>)
  }
}

const mapStateToProps = ({authedUser, users, questions}) => {
  // sorts by the total points descending
  const Comparator = (a, b) => {
    if (a[5] < b[5])
      return 1;
    if (a[5] > b[5])
      return -1;
    return 0;
  }
  let userRanking = createUserRanking(questions, users);
  userRanking = userRanking.sort(Comparator);
  return {authedUser, userRanking, users}
}

const countAnsweredQuestionsOfUser = (users, userId) => {
  return Object
    .keys(users[userId].answers)
    .length
}

const countOwnQuestionsOfUser = (users, userId) => {
  const user = users[userId];
  return user.questions.length;
}

// Returns an array with the structure [Name of user, avatarURL, numOwnQuestions, numAnsweredQuestions, totalPoints]
const createUserRanking = (questions, users) => {
  let ranking = [];
  Object
    .keys(users)
    .forEach((userId) => {
      let numOwnQuestions = countOwnQuestionsOfUser(users, userId);
      let numAnsweredQuestions = countAnsweredQuestionsOfUser(users, userId);
      let totalPoints = numOwnQuestions + numAnsweredQuestions;
      ranking.push([
        userId, users[userId].name,
        users[userId].avatarURL,
        numOwnQuestions,
        numAnsweredQuestions,
        totalPoints
      ]);
    })
  return ranking;
}

export default connect(mapStateToProps)(Leaderboard)
