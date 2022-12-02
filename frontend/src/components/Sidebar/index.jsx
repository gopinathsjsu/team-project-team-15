import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../../actions/authenticationAction';
import SideBarItem from './sidebar-item';

import './styles.css';
import logo from '../../assets/images/AirlineLogo.png';
import LogoutIcon from '../../assets/icons/logout.svg';

function SideBar (props) {
    const location = useLocation();
    const navigate  = useNavigate();
    const [active, setActive] = useState(1);

    useEffect(() => {
        props.menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }

    return(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                    <img
                        src={logo}
                        alt="logo" />
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {props.menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                {(item.id === 2 && (localStorage.getItem('type') === "PASSENGERS" ) )  ? null :
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />}
                            </div>
                        ))}
                    </div>

                    <div className='sidebar-footer'>
                        <span className='sidebar-item-label' onClick={()=> {localStorage.removeItem('token');
  navigate('/login');props.dispatch(logoutUserAction()); }}>Logout</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon' />
                    </div>
                </div>
            </div>
        </nav>
    )
}
const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(SideBar);