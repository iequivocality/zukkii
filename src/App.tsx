import React from 'react';
import './App.scss';
import Countdown from './components/countdown/CountdownComponent';
import Member from './models/Member';

export default class App extends React.Component {
  render() {
    let sample : Member = {
      id : 20,
      group : "Hinatazaka46",
      name : "渡邉美穂",
      birthdate : "2000-02-24",
      prefecture : "埼玉県",
      kana : "わたなべ みほ",
      height : "158cm",
      bloodType : "A型",
      photoPath : "https://cdn.hinatazaka46.com/images/14/cb7/8f333335a81cd5a194aca2b17455d/400_320_102400.jpg"
    }

    return (
      <div className="app-container">
        <Countdown {...sample}></Countdown>
        <Countdown {...sample}></Countdown>
        <Countdown {...sample}></Countdown>
        <Countdown {...sample}></Countdown>
        <Countdown {...sample}></Countdown>
        <Countdown {...sample}></Countdown>
      </div>
    );
  }
}
