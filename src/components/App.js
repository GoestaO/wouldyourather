import React, {Component, Fragment} from 'react';
import logo from '../logo.svg';
import '../App.css';
import Homepage from './Homepage';
import Question from './Question';
import LoadingBar from 'react-redux-loading';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Nav from './Nav';

class App extends Component {
  render() {
    return (<Router>
      <Fragment>
        <LoadingBar/>
        <Nav/>
        <div className="App">
          {
            this.props.loading
              ? null
              : <div>
                <Route path='/' exact component={Homepage}/>
                <Route path='/question/:id' component={Question}/>
              </div>
          }
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
