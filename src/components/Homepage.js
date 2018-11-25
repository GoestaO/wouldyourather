import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {loadInitalDataAsync} from '../actions/shared';
import QuestionList from './QuestionList';
import Question from './Question';
import QuestionListItem from './QuestionListItem';
import LoadingBar from 'react-redux-loading';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './Nav';

class Homepage extends React.Component {

  componentDidMount() {
    this
      .props
      .dispatch(loadInitalDataAsync());
  }
  render() {
    return (<div>
      <QuestionList/>
    </div>)
  }
}
function mapStateToProps(state) {
  return {
    loading: state.authedUser === null
  }
}
export default connect(mapStateToProps)(Homepage);
