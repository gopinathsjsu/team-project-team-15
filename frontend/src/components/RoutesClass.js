import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useLocation} from 'react-router';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import Login from './Login';
import Signup from './Signup';
import App from '../App'
import configureStore from '../store/configureStore';
import Home from '../Home';
import DashboardPage from './Dashboard';
import SideBar from './Sidebar';
import sidebar_menu from '../constants/sidebar-menu';
import FlightsList from '../pages/Flights/DisplayFlights';
import AddFlight from '../pages/Flights/AddFlight';
import UpdateFlight from '../pages/Flights/UpdateFlight';
import EnableGate from '../pages/Gates/EnableGate';
import DisableGate from '../pages/Gates/DisableGate';

function isLoggedIn(props) {
    if (props.response.login.response?.isLogged || props.response.register.response?.isCreated) {
      console.log(props.response.login.response?.isLogged)
      return true;
    }
    console.log("hello not logged")
    return false;
}

class RoutesClass extends React.Component {
    constructor(props){
      super(props);
    }
    
    render(){
        
        return (
        
          <div className='dashboard-container'>
          <SideBar menu={sidebar_menu} />
            
            <div className='dashboard-body'>
                <Routes>
                    <Route path="/*" element={<div></div>} />
                    <Route exact path="/" element={< FlightsList/>} />
                    <Route exact path="/AddFlight" element={< AddFlight/>} />
                    <Route exact path="/update/:FLIGHT_CODE" element={< UpdateFlight/>} />
                    <Route exact path="/profile" element={<div></div>} />
                    <Route exact path="/enablegate" element={< EnableGate/>} />
                    <Route exact path="/DisableGate" element={< DisableGate/>} />
                </Routes>
            </div>
        </div>

  )
    };


}
const mapStateToProps = (response) => ({response});

  export default connect(mapStateToProps)(RoutesClass);