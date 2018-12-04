import React, {Component, Fragment} from 'react';
import '../App.css';
import Homepage from './Homepage';
import Question from './Question';
import LoadingBar from 'react-redux-loading';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Navigation from './Navigation';
import PollStatistics from './PollStatistics';
import {loadInitalDataAsync} from '../actions/shared';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard';
import NoMatch from './NoMatch';

class App extends Component {
  componentDidMount() {
    this
      .props
      .dispatch(loadInitalDataAsync());
  }

  render() {
    const {authedUser} = this.props;
    return (<Router basename={process.env.PUBLIC_URL}>
      <Fragment>
        <LoadingBar/>
        <Navigation/>
        <div className="App">

          {
            this.props.loading === true
              ? null
              : (<div>
                <Switch>
                  <Route path='/login' component={Login}/>
                  <PrivateRoute authed = {authedUser} exact path='/' component={Homepage}/>
                  <PrivateRoute authed = {authedUser} exact path='/questions/:question_id' component={Question}/>
                  <PrivateRoute authed = {authedUser} exact path='/statistics/:question_id' component={PollStatistics}/>
                  <PrivateRoute authed={authedUser} exact path='/add' component={NewPoll} />
                  <PrivateRoute authed={authedUser} exact path="/leaderboard" component={Leaderboard}/>

                  {/* https://tylermcginnis.com/react-router-handling-404-pages */}
                  <Route component={NoMatch}/>
                </Switch></div>)
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
