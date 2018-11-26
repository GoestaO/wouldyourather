import React, {Component, Fragment} from 'react';
import logo from '../logo.svg';
import '../App.css';
import Homepage from './Homepage';
import Question from './Question';
import LoadingBar from 'react-redux-loading';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Navigation from './Navigation';
import PollStatistics from './PollStatistics';
import {loadInitalDataAsync} from '../actions/shared';

class App extends Component {
  componentDidMount() {

    console.log("fetching data");
    this.props.dispatch(loadInitalDataAsync())

  }
  render() {
    return (<Router>
      <Fragment>
        <LoadingBar/>
        <Navigation/>
        <div className="App">
              <div>
                  <Route exact path='/' component={Homepage}/>
                  <Route path='/questions/:question_id' component={Question}/>
                  <Route path='/statistics/:question_id' component={PollStatistics}/>
                </div>
    
        </div>

      </Fragment>
    </Router>)
  }
}

function mapStateToProps(state) {
  return {
    loading: state.authedUser === null
  }
}

export default connect(mapStateToProps)(App);
