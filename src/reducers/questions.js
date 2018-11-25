import {RECEIVE_QUESTIONS, ANSWER_QUESTION} from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ANSWER_QUESTION:
      let authedUser = action.authedUser;
      let qid = action.qid
      let foundQuestion = state[qid]
      let answer = action
        .answer
        console
        .log(state[qid][answer].votes);
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer]
              .votes
              .concat(authedUser)
          }
        }
      }
    default:
      return state
  }
}