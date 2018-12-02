import {saveQuestionAnswer, saveQuestion} from '../utils/api';
import {addQuestionToUserQuestions, addAnswerToUser} from './users';

// action constants
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const CREATE_QUESTION = 'CREATE_QUESTION';

// action creators
export function receiveQuestions(questions) {
  return {type: RECEIVE_QUESTIONS, questions}
}

function answerQuestion(authedUser, qid, answer) {
  return {type: ANSWER_QUESTION, authedUser, qid, answer}
}

function createNewQuestion(question) {
  return {type: CREATE_QUESTION, question}
}

// TODO: check if optimistic update doable
export function answerQuestionAsync(authedUser, qid, answer) {
  return(dispatch) => {
    dispatch(answerQuestion(authedUser, qid, answer));
    return saveQuestionAnswer(authedUser, qid, answer)
  }
}

// Optimistic update not possible as we have to wait for the formattedQuestion with the correct question id. The api is the single source of truth
export function createNewQuestionAsync({optionOneText, optionTwoText, author}) {
  return(dispatch) => {
    return saveQuestion({optionOneText, optionTwoText, author}).then((question) => {
      dispatch(createNewQuestion(question));
    })
  }
}
