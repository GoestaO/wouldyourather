import {CREATE_QUESTION, ANSWER_QUESTION} from './questions';

// action constants
export const RECEIVE_USERS = 'RECEIVE_USERS';

// action creators
export function receiveUsers(users) {
  return {type: RECEIVE_USERS, users}
}

export function addQuestionToUserQuestions(question) {
  return {type: CREATE_QUESTION, question}
}

export function addAnswerToUser(authedUser, qid, answer) {
  return {type: ANSWER_QUESTION, authedUser, qid, answer}
}
