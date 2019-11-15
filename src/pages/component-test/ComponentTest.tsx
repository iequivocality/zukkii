import React from 'react';
import ToggleSwitch from '../../components/ui/toggle-switch/ToggleSwitch';
import Dropdown from '../../components/ui/dropdown/Dropdown';
import { IoIosSunny, IoIosMoon } from 'react-icons/io';
import Util from '../../Util';

export default function ComponentTest() {
    
    let contents = ['Link 1', 'Link 2', 'Link 3'];
    return (
        <main style={{ justifyContent : 'space-around' }}>
            <div style={{ width : '50px', height : '50px', backgroundColor : Util.computeShade('#B00020', 0.4) }}>

            </div>
            <ToggleSwitch
                width={75}
                icon value
                onState={{ key : 'light', color : '#ecf0f1', switchStyle : { backgroundColor : "#f1c40f" }, iconComponent : <IoIosSunny color="#f1c40f"/> }}
                offState={{ key : 'dark', color : '#34495e', switchStyle : { backgroundColor : "#ffffff" }, iconComponent : <IoIosMoon color="#ffffff"/> }}
                onToggle={(toggleStatus) => { console.log(toggleStatus) }}></ToggleSwitch>
            <Dropdown width={200} contents={contents}
                      onSelect={(value : string) => { console.log(value) }}
                      mapContentToDropdown={(content : string) => ({ key : content, label : content, value : content })}/>
        </main>
    );
}