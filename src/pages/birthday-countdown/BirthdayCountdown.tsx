import React, { Fragment } from 'react';
import styles from './BirthdayCountdown.module.scss'
import Group from '../../models/Group';
import GenerationSelectionContainer from '../../components/selection/GenerationSelection';
import Countdown from '../../components/countdown/CountdownComponent';
import AppState from '../../store/state/AppState';
import { connect } from 'react-redux';

class BirthdayCountdownPageComponent extends React.Component<Group> {
    render() {
        let { name, members, color, id } = this.props;
        let titleStyle : React.CSSProperties = {
            color : color
        }

        return (
            <Fragment>
                <header className={styles.titleContainer} style={titleStyle}>
                    <h2>{name}</h2>
                    <h6>アイドルバースデーカウントダウン</h6>
                    <GenerationSelectionContainer></GenerationSelectionContainer>
                </header>
                <main className={styles.groupContainer}>
                { members.map( member => <Countdown key={member.id} member={member} groupColor={color} groupId={id}></Countdown>) }
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = (state : AppState) => {
    return {
        ...state.selectedGroup
    }
}

const BirthdayCountdownPage = connect(
    mapStateToProps
)(BirthdayCountdownPageComponent);
export default BirthdayCountdownPage;

