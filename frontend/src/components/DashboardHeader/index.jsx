import React from 'react';

import './styles.css';
import SettingsIcon from '../../assets/icons/settings.svg';
import { useNavigate } from 'react-router-dom';

function DashboardHeader ({ btnTextH, btnText1, btnText2, btnText4, onClickH, onClick1, onClick2, onClick4 }) {

    const navigate = useNavigate();
    const profile = () =>{
        navigate("/profile")
    }
    return(
        <div className='dashbord-header-container'>
            {btnTextH && 
                <button className='dashbord-header-btn' onClick={onClickH}>{btnTextH}</button>
            }
            &nbsp;&nbsp;&nbsp;
            {btnText1 && 
                <button className='dashbord-header-btn' onClick={onClick1}>{btnText1}</button>
            }
            &nbsp;&nbsp;&nbsp;
            {btnText2 && 
                <button className='dashbord-header-btn' onClick={onClick2}>{btnText2}</button>
            }
            &nbsp;&nbsp;&nbsp;
            {btnText4 && 
                <button className='dashbord-header-btn' onClick={onClick4}>{btnText4}</button>
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
