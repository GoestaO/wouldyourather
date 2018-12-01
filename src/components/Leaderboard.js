import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container} from 'reactstrap';

class Leaderboard extends Component {

  render() {
    return (<Container>Leaderboard</Container>)
  }
}

const mapStateToProps = ({authedUser, users, questions}) => {
  console.log('ranking', userRanking(questions, users));
  return {
    authedUser,
    userRanking: userRanking(questions, users)
  }
}

const countAnsweredQuestionsOfUser = (questions, userId) => {
  let numAnsweredQuestions = 0;
  const questionKeys = Object.keys(questions);
  questionKeys.forEach((key) => {
    let question = questions[key];
    if (question.optionOne.votes.includes(userId) || question.optionTwo.votes.includes(userId)) {
      numAnsweredQuestions++;
    }
  });
  return numAnsweredQuestions;
}

const countOwnQuestionsOfUser = (users, userId) => {
  const user = users[userId];
  return user.questions.length;
}

const userRanking = (questions, users) => {
  let ranking = [];
  Object
    .keys(users)
    .forEach((userId) => {
    let numOwnQuestions = countOwnQuestionsOfUser(users, userId);
    let numAnsweredQuestions = countAnsweredQuestionsOfUser(questions, userId);
    let totalPoints = numOwnQuestions + numAnsweredQuestions;
      ranking.push([userId, numOwnQuestions, numAnsweredQuestions, totalPoints]);
    })
  return ranking;
}

export default connect(mapStateToProps)(Leaderboard)
