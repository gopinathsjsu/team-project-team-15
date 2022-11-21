import React from 'react';

import './styles.css';
import SettingsIcon from '../../assets/icons/settings.svg';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { logoutUserAction } from '../../actions/authenticationAction';

function DashboardHeader (props) {

    const navigate = useNavigate();
    const profile = () =>{
        navigate("/profile")
    }
    return(
        <div className='dashbord-header-container'>
            {(localStorage.getItem('type') != "customer" ) ? props.btnText && 
                <button className='dashbord-header-btn' onClick={props.onClick}>{props.btnText}</button>
            : null}
            
            <div className='dashbord-header-right'>
            <button className='dashbord-header-btn' onClick={()=>{
  navigate('/login');props.dispatch(logoutUserAction());}}>{"Logout"}</button>
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon' />
                <img
                    className='dashbord-header-avatar'
                    src='https://i.pinimg.com/564x/66/6e/6a/666e6abd7b819527c28ddebc4399b42f.jpg' 
                    onClick={profile} />
                <div>{localStorage.getItem('user')}</div>
            </div>
        </div>
    )
}


const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(DashboardHeader);
