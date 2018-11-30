import {saveQuestionAnswer, saveQuestion} from '../utils/api';

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

// TODO: Optimistic update
export function answerQuestionAsync(authedUser, qid, answer) {
  return(dispatch) => {
    dispatch(answerQuestion(authedUser, qid, answer));
    return saveQuestionAnswer(authedUser, qid, answer)
  }
}

// TODO: Optimistic update
export function createNewQuestionAsync({optionOneText, optionTwoText, author}) {
  return(dispatch) => {
    return saveQuestion({optionOneText, optionTwoText, author}).then((formattedQuestion) => dispatch(createNewQuestion(formattedQuestion)));
  }
}
