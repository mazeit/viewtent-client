import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT, LOGOUT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Company from '../components/Company';
import Login from '../components/Login';
import NewInterview from '../components/NewInterview';
import Interview from '../components/Interview';
import Profile from '../components/Profile';
import InterviewProcess from '../components/InterviewProcess';
import InterviewView from '../components/InterviewView';
import Thankyou from '../components/Thankyou';
import ProfileFavorites from '../components/ProfileFavorites';
import Register from '../components/Register';
import Settings from '../components/Settings';
import { store } from '../store';
import { push } from 'react-router-redux';
import '../assets/css/style.css';
import '../assets/css/custom.css';


const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT }),
  onClickLogout: () => dispatch({ type: LOGOUT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
            onClickLogout={this.props.onClickLogout} />
            <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/company" component={Company} />
            <Route path="/thankyou" component={Thankyou} />
            <Route path="/interview/:id" component={Interview} />
            <Route path="/new-interview" component={NewInterview} />
            <Route path="/review/:applier" component={InterviewView} />
          */}
            </Switch>
        </div>
      );
    }
    return (
      <div>
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
