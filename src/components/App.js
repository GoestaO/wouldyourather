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
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import NewPoll from './NewPoll'

class App extends Component {
  componentDidMount() {
    this
      .props
      .dispatch(loadInitalDataAsync(), () => console.log(this.props.loading));
  }

  render() {
    return (<Router>
      <Fragment>
        <LoadingBar/>
        <Navigation/>
        <div className="App">

          {
            this.props.loading === true
              ? null
              : (<div>
                <Route path='/login' component={Login}/>
                <PrivateRoute exact={true} authed = {this.props.authedUser} path='/' component={Homepage}/>
                <PrivateRoute authed = {this.props.authedUser} path='/questions/:question_id' component={Question}/>
                <PrivateRoute authed = {this.props.authedUser} path='/statistics/:question_id' component={PollStatistics}/>
                <PrivateRoute exact={true} authed={this.props.authedUser} path='/add' component={NewPoll} />
                  </div>)
          }
        </div>
      </Fragment>
    </Router>)
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loadingBar.default === 1,
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(App);
