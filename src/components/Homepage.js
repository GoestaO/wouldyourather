import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {loadInitalDataAsync} from '../actions/shared';
import QuestionList from './QuestionList';
import Question from './Question';
import QuestionListItem from './QuestionListItem';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Col} from 'reactstrap';
class Homepage extends React.Component {


  render() {

    return (<div>
      <Col sm="6 offset-md-3">
        <QuestionList/>
      </Col>
    </div>)
  }
}

export default Homepage;
