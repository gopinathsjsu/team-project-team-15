import React, { useEffect, useState } from "react";

import DropdownList from '../../utils/dropdown/Dropdowndup';
import axios from "axios";

const DropdownSmart = () => {
  const [content, setContents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/gates/EnabledGates").then((res) => {
      //   let a = res.data.df;
      //   setContents(a);
      console.log(res.data);
      setContents(res.data);
    });
  }, []);

  return <DropdownList content={content}></DropdownList>;
};

export default DropdownSmart;


/*import React, {useState, useEffect} from 'react';
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
                <table>
                <tr><div className='dropdown'>
                    <td><label>Select Terminal :</label></td>
                    <Dropdown
                        isSearchable
                        isSingle
                        placeHolder="Select Terminal"
                        options={options}
                        onChange={(value) => console.log(value)}
                    /> 
                </div></tr>
                <tr><div className='dropdown'>
                    <td><label>Select gates to be enabled :</label></td>
                    <Dropdown
                        isSearchable
                        isMulti
                        placeHolder="Select One/ more gates"
                        options={options}
                        onChange={(value) => console.log(value)}
                    />
                </div></tr>
                <div>
                    <button className='dashbord-btn' > Update </button>
                    <button className='dashbord-btn' > Cancel </button>
                </div>
                </table>
            </div>
           
        </div>
    )
}

export default EnableGate;*/