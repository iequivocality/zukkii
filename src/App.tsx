import React from 'react';
import './App.scss';
import Countdown from './components/countdown/CountdownComponent';
import Member from './models/Member';
import Group from './models/Group';
import GenerationSelection from './components/selection/GenerationSelection';
import { connect } from 'react-redux';
import AppState from './store/state/AppState';
import FirebaseApp from './data/firebase';

class App extends React.Component<AppState> {
  componentDidMount() {
    FirebaseApp.database().ref('members').once('value').then(function (snapshot) {
      console.log("MEMBERS")
      console.log(snapshot.val());
      let objects = [];
      for (let key of Object.keys(snapshot.val())) {
        console.log(snapshot.val()[key])
        objects.push(snapshot.val()[key])
      }
      console.log(objects)
    })
  }

  render() {
    let { selectedGroup } = this.props;
    let members : Array<Member> = [
      {
        id : 1,
        group : "日向坂46",
        name : "井口眞緒",
        birthdate : "1995-11-10",
        prefecture : "新潟県",
        kana : "いぐち まお",
        height : "163cm",
        bloodType : "AB型",
        generation: 1
      },
      {
        id : 2,
        group : "日向坂46",
        name : "潮紗理菜",
        birthdate : "1997-12-26",
        prefecture : "神奈川県",
        kana : "うしお さりな",
        height : "157cm",
        bloodType : "O型",
        generation: 1
      },
      {
        id : 4,
        group : "日向坂46",
        name : "影山優佳",
        birthdate : "2000-05-08",
        prefecture : "東京都",
        kana : "かげやま ゆうか",
        height : "156cm",
        bloodType : "O型",
        generation: 1
      },
      {
        id : 5,
        group : "日向坂46",
        name : "加藤史帆",
        birthdate : "1998-02-02",
        prefecture : "東京都",
        kana : "かとう しほ",
        height : "160cm",
        bloodType : "A型",
        generation: 1
      },
      {
        id : 6,
        group : "日向坂46",
        name : "齊藤京子",
        birthdate : "1997-09-05",
        prefecture : "東京都",
        kana : "さいとう きょうこ",
        height : "154cm",
        bloodType : "A型",
        generation: 1
      },
      {
        id : 7,
        group : "日向坂46",
        name : "佐々木久美",
        birthdate : "1996-01-22",
        prefecture : "千葉県",
        kana : "ささき くみ",
        height : "167cm",
        bloodType : "O型",
        generation: 1
      },
      {
        id : 8,
        group : "日向坂46",
        name : "佐々木美玲",
        birthdate : "1999-12-17",
        prefecture : "兵庫県",
        kana : "ささき みれい",
        height : "164cm",
        bloodType : "O型",
        generation: 1
      },
      {
        id : 9,
        group : "日向坂46",
        name : "高瀬愛奈",
        birthdate : "1998-09-20",
        prefecture : "大阪府",
        kana : "たかせ まな",
        height : "157cm",
        bloodType : "A型",
        generation: 1
      },
      {
        id : 10,
        group : "日向坂46",
        name : "高本彩花",
        birthdate : "1998-11-02",
        prefecture : "神奈川県",
        kana : "たかもと あやか",
        height : "162cm",
        bloodType : "B型",
        generation: 1
      },
      {
        id : 11,
        group : "日向坂46",
        name : "東村芽依",
        birthdate : "1998-08-23",
        prefecture : "奈良県",
        kana : "ひがしむら めい",
        height : "153cm",
        bloodType : "O型",
        generation: 1
      },
      {
        id : 12,
        group : "日向坂46",
        name : "金村美玖",
        birthdate : "2002-09-10",
        prefecture : "埼玉県",
        kana : "かねむら みく",
        height : "162cm",
        bloodType : "O型",
        generation: 2
      },
      {
        id : 13,
        group : "日向坂46",
        name : "河田陽菜",
        birthdate : "2001-07-23",
        prefecture : "山口県",
        kana : "かわた ひな",
        height : "153cm",
        bloodType : "B型",
        generation: 2
      },
      {
        id : 14,
        group : "日向坂46",
        name : "小坂菜緒",
        birthdate : "2002-09-07",
        prefecture : "大阪府",
        kana : "こさか なお",
        height : "161cm",
        bloodType : "O型",
        generation: 2
      },
      {
        id : 15,
        group : "日向坂46",
        name : "富田鈴花",
        birthdate : "2001-01-18",
        prefecture : "神奈川県",
        kana : "とみた すずか",
        height : "164cm",
        bloodType : "A型",
        generation: 2
      },
      {
        id : 16,
        group : "日向坂46",
        name : "丹生明里",
        birthdate : "2001-02-15",
        prefecture : "埼玉県",
        kana : "にぶ あかり",
        height : "156cm",
        bloodType : "AB型",
        generation: 2
      },
      {
        id : 17,
        group : "日向坂46",
        name : "濱岸ひより",
        birthdate : "2002-09-28",
        prefecture : "福岡県",
        kana : "はまぎし ひより",
        height : "166cm",
        bloodType : "A型",
        generation: 2
      },
      {
        id : 18,
        group : "日向坂46",
        name : "松田好花",
        birthdate : "1999-04-27",
        prefecture : "京都府",
        kana : "まつだ このか",
        height : "157cm",
        bloodType : "A型",
        generation: 2
      },
      {
        id : 19,
        group : "日向坂46",
        name : "宮田愛萌",
        birthdate : "1998-04-28",
        prefecture : "東京都",
        kana : "みやた まなも",
        height : "158cm",
        bloodType : "A型",
        generation: 2
      },
      {
        id : 20,
        group : "日向坂46",
        name : "渡邉美穂",
        birthdate : "2000-02-24",
        prefecture : "埼玉県",
        kana : "わたなべ みほ",
        height : "158cm",
        bloodType : "A型",
        generation: 2
      },
      {
        id : 21,
        group : "日向坂46",
        name : "上村ひなの",
        birthdate : "2004-04-12",
        prefecture : "東京都",
        kana : "かみむら ひなの",
        height : "161cm",
        bloodType : "AB型",
        generation: 3
      }
    ];

    let sampleGroup : Group = {
      id : 1,
      name : "日向坂46",
      color : "#5BBEE4",
      members : members,
      generations : 3
    }

    let titleStyle : React.CSSProperties = {
      color : sampleGroup.color
    } 

    // console.log(JSON.stringify(sampleGroup))

    return (
      <div className="app-container">
        <header className="title-container" style={titleStyle}>
          <h2>{selectedGroup.name}</h2>
          <h6>アイドルバースデーカウントダウン</h6>
          <GenerationSelection></GenerationSelection>
        </header>
        <main className="group-container">
          { selectedGroup.members.map( member => <Countdown key={member.id} member={member} group={sampleGroup}></Countdown>) }
        </main>
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
