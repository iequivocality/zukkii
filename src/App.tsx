import React from 'react';
import './App.scss';
import Countdown from './components/countdown/Countdown';

export default class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Countdown name="山下美月" birthdate="1999-07-26"></Countdown>
        <Countdown name="山下美月" birthdate="1999-07-26"></Countdown>
        <Countdown name="山下美月" birthdate="1999-07-26"></Countdown>
        <Countdown name="山下美月" birthdate="1999-07-26"></Countdown>
        <Countdown name="山下美月" birthdate="1999-07-26"></Countdown>
        <Countdown name="山下美月" birthdate="1999-07-26"></Countdown>
      </div>
    );
  }
}
