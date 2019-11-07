import React from 'react';
import ToggleSwitch from '../../components/ui/toggle-switch/ToggleSwitch';
import Dropdown from '../../components/ui/dropdown/Dropdown';
import { IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosArrowDropup, IoIosArrowDropdown } from 'react-icons/io';

export default function ComponentTest() {
    
    let contents = ['Link 1', 'Link 2', 'Link 3'];
    return (
        <main style={{ justifyContent : 'space-around' }}>
            <ToggleSwitch
                width={150}
                icon
                onState={{ key : 'bukas', label : 'Bukas', color : '#ff3456', selected : false, iconComponent : <IoIosArrowDropup/> }}
                offState={{ key : 'cerado', label : 'Cerado', color : '#5634ff', selected : true, iconComponent : <IoIosArrowDropdown/> }}
                onToggle={(toggleStatus) => { console.log(toggleStatus) }}
                labelStyle={{
                    fontFamily : "'Roboto', 'sans-serif'"
                }}></ToggleSwitch>
            <Dropdown width={200} contents={contents}
                      onSelect={(value : string) => { console.log(value) }}
                      mapContentToDropdown={(content : string) => ({ key : content, label : content, value : content })}/>
        </main>
    );
}