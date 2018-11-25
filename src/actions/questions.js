import {saveQuestionAnswer} from '../utils/api';

// action constants
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

// action creators
export function receiveQuestions(questions) {
  return {type: RECEIVE_QUESTIONS, questions}
}

function answerQuestion(authedUser, qid, answer) {
  return {type: ANSWER_QUESTION, authedUser, qid, answer}
}

// Optimistic update
export function answerQuestionAsync(authedUser, qid, answer) {
  return(dispatch) => {
    dispatch(answerQuestion(authedUser, qid, answer));
    return saveQuestionAnswer(authedUser, qid, answer)
  }
}
