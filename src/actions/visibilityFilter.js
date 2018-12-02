export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
  SHOW_UNANSWERED: 'SHOW_UNANSWERED',
  SHOW_ANSWERED: 'SHOW_ANSWERED'
}

export function setVisibilityFilter(filter) {
  return {type: SET_VISIBILITY_FILTER, filter}
}

export function toggleVisibility(filter) {
  let newFilter = '';
  switch (filter) {
    case VisibilityFilters.SHOW_ANSWERED:
      newFilter = VisibilityFilters.SHOW_UNANSWERED
      break;
    case VisibilityFilters.SHOW_UNANSWERED:
      newFilter = VisibilityFilters.SHOW_ANSWERED
      break;
    default:
      newFilter = VisibilityFilters.SHOW_UNANSWERED
  }
  return(dispatch) => {
    dispatch(setVisibilityFilter(newFilter));
  }
}
