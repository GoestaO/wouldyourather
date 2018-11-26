import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {loadInitalDataAsync} from '../actions/shared';
import QuestionList from './QuestionList';
import Question from './Question';
import QuestionListItem from './QuestionListItem';
import LoadingBar from 'react-redux-loading';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Homepage extends React.Component {

  componentDidMount() {
    console.log(this.props.loading);
    if (this.props.loading === true) {
        this
          .props
          .dispatch(loadInitalDataAsync())
    }
  }
  render() {
    // const showUnansweredQuestions = this.state.showUnansweredQuestions;
    return (<div>

      {
        this.props.loading
          ? null
          : (<QuestionList/>)
      }
    </div>)
  }
}
function mapStateToProps(state) {
  return {
    loading: (state.authedUser === null) && (Object.keys(state.questions).length === 0) && (Object.keys(state.users).length === 0)
  }
}
export default connect(mapStateToProps)(Homepage);
