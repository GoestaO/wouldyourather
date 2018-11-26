import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {loadInitalDataAsync} from '../actions/shared';
import QuestionList from './QuestionList';
import Question from './Question';
import QuestionListItem from './QuestionListItem';
import LoadingBar from 'react-redux-loading';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Homepage extends React.Component {

  
  render() {
    // const showUnansweredQuestions = this.state.showUnansweredQuestions;
    return (<div>
      <LoadingBar/>
      <QuestionList/>
    </div>)
  }
}
function mapStateToProps(state) {
  console.log(state.loadingBar.default);
  console.log(state.loadingBar.default === 0);
  return {
    loading: state.loadingBar.default === 0
  }
}
export default connect(mapStateToProps)(Homepage);
