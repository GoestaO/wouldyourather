import {getInitialData} from '../utils/api';
import {receiveUsers} from './users';
import {receiveQuestions} from './questions';
import {setAuthedUser} from './authedUser';
import {setVisibilityFilter, VisibilityFilters} from './visibilityFilter';
import {showLoading, hideLoading} from 'react-redux-loading';

// TODO: Login screen instead of hard coded
const AUTHED_ID = 'sarahedo';

export function loadInitalDataAsync() {
  return(dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({users, questions}) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(setVisibilityFilter(VisibilityFilters.SHOW_UNANSWERED));
      dispatch(hideLoading());
    })
  }
}
