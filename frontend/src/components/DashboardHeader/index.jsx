import React from 'react';

import './styles.css';
import SettingsIcon from '../../assets/icons/settings.svg';
import { useNavigate } from 'react-router-dom';

function DashboardHeader ({ btnText, onClick }) {

    const navigate = useNavigate();
    const profile = () =>{
        navigate("/profile")
    }
    return(
        <div className='dashbord-header-container'>
            {btnText && 
                <button className='dashbord-header-btn' onClick={onClick}>{btnText}</button>
            }
            <div className='dashbord-header-right'>
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon' />
                <img
                    className='dashbord-header-avatar'
                    src='https://i.pinimg.com/564x/66/6e/6a/666e6abd7b819527c28ddebc4399b42f.jpg' 
                    onClick={profile} />
            </div>
        </div>
    )
}



export default DashboardHeader;
