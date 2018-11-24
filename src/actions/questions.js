// action constants

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

// action creators
export function receiveQuestions(questions) {
  return {type: RECEIVE_QUESTIONS, questions}
}
