import {RECEIVE_USERS} from '../actions/users'

import {CREATE_QUESTION, ANSWER_QUESTION} from '../actions/questions';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case CREATE_QUESTION:
      const {question} = action;
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: [
            ...state[question.author].questions,
            question.id
          ]
        }
      }
    case ANSWER_QUESTION:
      let {authedUser, qid, answer} = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    default:
      return state
  }
}
