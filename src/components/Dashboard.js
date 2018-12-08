import React from 'react';
import QuestionList from './QuestionList';
import {Col} from 'reactstrap';

const Dashboard = () => {
    return (<div>
      <Col sm="6 offset-md-3">
        <QuestionList/>
      </Col>
    </div>)
  }


export default Dashboard;
