import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import AppState from './store/state/AppState';
import FirebaseApp from './data/firebase';
import Util from './Util';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BirthdayCountdownPage from './pages/birthday-countdown/BirthdayCountdown';

class App extends React.Component<AppState> {
  componentDidMount() {
    FirebaseApp.database().ref('members').once('value').then<firebase.database.DataSnapshot>((snapshot : firebase.database.DataSnapshot) => {
      console.log(Util.convertObjectToArray(snapshot.val()));
      return snapshot;
    })
  }

  render() {
    return (
      <div className="app-container">
        <Router>
            <Route path="/" component={BirthdayCountdownPage}></Route>
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
