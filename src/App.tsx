import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import AppState from './store/state/AppState';
import FirebaseApp from './data/firebase';
import Util from './Util';
import { BrowserRouter as Router, Route, Switch, RouteProps } from 'react-router-dom';
import BirthdayCountdownPage from './pages/birthday-countdown/BirthdayCountdown';
import Member from './models/Member';

const AppRoutes : Array<RouteProps> = [
  {
    path: "/",
    component: BirthdayCountdownPage
  }
]


class App extends React.Component<AppState> {
  componentDidMount() {
    FirebaseApp.database().ref('members').once('value').then<firebase.database.DataSnapshot>((snapshot : firebase.database.DataSnapshot) => {
      let members = Util.convertObjectToArray<Member>(snapshot.val());
      console.log('unfiltered: ', members);
      let filteredMembers = members.filter((value : Member) => {
        return Object.keys(value.group).findIndex(( value : string ) => ( value === 'hinatazaka')) > -1;
      });
      console.log('filtered: ', filteredMembers);
      return snapshot;
    })
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
}

const AppContainer = connect(
  mapStateToProps
)(App);
export default AppContainer;
