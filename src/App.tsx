import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import AppState from './store/state/AppState';
import { BrowserRouter as Router, Route, Switch, RouteProps } from 'react-router-dom';
import BirthdayCountdownPage from './pages/birthday-countdown/BirthdayCountdown';
import BirthdaySelectionPage from './pages/birthday-selection/BirthdaySelection';
import NoMatchComponent from './pages/no-match/NoMatch';

const AppRoutes : Array<RouteProps> = [
  {
    path: "/",
    component: BirthdaySelectionPage,
    exact: true
  },
  {
    path: "/group/:group",
    component: BirthdayCountdownPage
  },
  {
    path: "404",
    component : NoMatchComponent
  },
  {
    path: "*",
    component : NoMatchComponent
  }
]


class App extends React.Component<AppState> {
  render() {
    return (
      <div className="app-container">
          <Router>
            <Switch>
              {AppRoutes.map((route : RouteProps, key : number) => (
                <Route key={key} {...route}></Route>
              ))}
            </Switch>
          </Router>
      </div>
    );
  }
}

const mapStateToProps = (state : AppState) => {
  return state
}

const AppContainer = connect(
  mapStateToProps
)(App);
export default AppContainer;
