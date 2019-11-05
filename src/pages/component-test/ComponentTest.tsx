import React from 'react';
import ToggleSwitch from '../../components/ui/toggle-switch/ToggleSwitch';
import Dropdown from '../../components/ui/dropdown/Dropdown';

export default function ComponentTest() {
    
    let contents = ['Link 1', 'Link 2', 'Link 3'];
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
            <Dropdown width={200} contents={contents}
                      onSelect={(value : string) => { console.log(value) }}
                      mapContentToDropdown={(content : string) => ({ label : content, value : content })}/>
        </main>
    );
}