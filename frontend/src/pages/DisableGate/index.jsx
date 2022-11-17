import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import Dropdown from '../../utils/dropdown/Dropdown';
import '../styles.css';

function EnableGate() {
    const options = [
        { value: "green", label: "Green" },
        { value: "blue", label: "Blue" },
        { value: "red", label: "Red" },
        { value: "yellow", label: "Yellow" },
        { value: "orange", label: "Orange" },
        { value: "pink", label: "Pink" },
        { value: "purple", label: "Purple" },
        { value: "grey", label: "Grey" }
      ];
      
    return(
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="Home" />
           
            <div className='dashboard-content-dropdown'>
                <div className='dropdown'>
                    <label>Select Terminal :</label>
                    <Dropdown
                        isSearchable
                        isSingle
                        placeHolder="Select Terminal"
                        options={options}
                        onChange={(value) => console.log(value)}
                    />
                    
                </div>
                <div className='dropdown'>
                    <label>Select gates to be disabled:</label>
                    <Dropdown
                        isSearchable
                        isMulti
                        placeHolder="Select One/ more gates"
                        options={options}
                        onChange={(value) => console.log(value)}
                    />
                </div>
                <div>
                    <button className='dashbord-btn' > Update </button>
                    <button className='dashbord-btn' > Cancel </button>
                </div>
            </div>
           
        </div>
    )
}

export default EnableGate;