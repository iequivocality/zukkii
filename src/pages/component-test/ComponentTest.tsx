import React from 'react';
import styles from './ComponentTest.module.scss'
import OrbitingObjects from '../../components/svg/OrbitingObjects';
import FirebaseApp from '../../data/firebase';

export default function ComponentTest() {
    FirebaseApp.database().ref('members').orderByChild("group/hinatazaka").equalTo(true).once('value').then<firebase.database.DataSnapshot>((snapshot : firebase.database.DataSnapshot) => {
        console.log("MEMBERS")
        console.log(snapshot.val())
        return snapshot;
    }); 

    return (
        <main style={{ justifyContent : 'space-around' }}>
            <OrbitingObjects distance={120} numberOfCircles={75} radius={2} className={styles.circle1} color={"#5BBEE4"}/>
            <OrbitingObjects distance={150} numberOfCircles={75} radius={2} className={styles.circle2} color={"#7c32a2"}/>
        </main>
    );
}