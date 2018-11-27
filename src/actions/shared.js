import {getInitialData} from '../utils/api';
import {receiveUsers} from './users';
import {receiveQuestions} from './questions';
import {setAuthedUser} from './authedUser';
import {setVisibilityFilter, VisibilityFilters} from './visibilityFilter';
import {showLoading, hideLoading} from 'react-redux-loading';

const AUTHED_ID = null;

export function loadInitalDataAsync() {
  return(dispatch) => {
    dispatch(showLoading());
    dispatch(setAuthedUser(AUTHED_ID));
    return getInitialData().then(({users, questions}) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setVisibilityFilter(VisibilityFilters.SHOW_UNANSWERED));
      dispatch(hideLoading());
    })
  }
}
