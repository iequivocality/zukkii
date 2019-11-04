import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import AppState from './store/state/AppState';
import { BrowserRouter as Router, Route, Switch, RouteProps } from 'react-router-dom';
import BirthdayCountdownPage from './pages/group-countdown/GroupCountdown';
import BirthdaySelectionPage from './pages/birthday-selection/BirthdaySelection';
import { fetchGroups } from './store/actions';
import NotFoundComponent from './pages/no-found/NotFound';
import ComponentTest from './pages/component-test/ComponentTest';

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
    path: "/test",
    component : ComponentTest
  },
  {
    path: "404",
    component : NotFoundComponent
  },
  {
    path: "*",
    component : NotFoundComponent
  }
];

interface AppProps {
  loadGroups : () => void
}


class App extends React.Component<AppState & AppProps> {
  componentDidMount() {
    this.props.loadGroups();
  }

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
};

const mapDispatchToProps = (dispatch : any) => {
  return {
    loadGroups : () => {
      dispatch(fetchGroups());
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default AppContainer;
