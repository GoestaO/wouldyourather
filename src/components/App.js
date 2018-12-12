import React, {Component, Fragment} from 'react';
import '../App.css';
import Dashboard from './Dashboard';
import Question from './Question';
import LoadingBar from 'react-redux-loading';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Navigation from './Navigation';
import QuestionStatistics from './QuestionStatistics';
import {loadInitalDataAsync} from '../actions/shared';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard';
import NoMatch from './NoMatch';

export class App extends Component {
  componentDidMount() {
    this
      .props
      .dispatch(loadInitalDataAsync());
  }

  render() {
    const {authedUser} = this.props;
    return (<Router>
      <Fragment>
        <div className="App">
          {
            this.props.loading === true
              ? <LoadingBar/>
              : (<div>
                <Navigation/>
                <Switch>
                  <Route path='/login' component={Login}/>
                  <PrivateRoute authed = {authedUser} exact path='/' component={Dashboard}/>
                  <PrivateRoute authed = {authedUser} exact path='/questions/:question_id' component={Question}/>
                  <PrivateRoute authed = {authedUser} exact path='/statistics/:question_id' component={QuestionStatistics}/>
                  <PrivateRoute authed={authedUser} exact path='/add' component={NewQuestion} />
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
