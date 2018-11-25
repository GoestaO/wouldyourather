import {VisibilityFilters, SET_VISIBILITY_FILTER} from '../actions/visibilityFilter';

export default function visibilityFilter(state = VisibilityFilters.SHOW_UNANSWERED, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
