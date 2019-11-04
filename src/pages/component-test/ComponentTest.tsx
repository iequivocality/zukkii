import React from 'react';
import ToggleSwitch from '../../components/ui/toggle-switch/ToggleSwitch';
import Dropdown from '../../components/ui/dropdown/Dropdown';

export default function ComponentTest() {
    return (
        <main style={{ justifyContent : 'space-around' }}>
            <ToggleSwitch
                width={150}
                onState={{ label : 'Bukas', color : '#ff3456' }}
                offState={{ label : 'Cerado', color : '#5634ff' }}
                onToggle={(toggleStatus) => { console.log(toggleStatus) }}
                labelStyle={{
                    fontFamily : "'Roboto', 'sans-serif'"
                }}></ToggleSwitch>
            <Dropdown></Dropdown>
        </main>
    );
}