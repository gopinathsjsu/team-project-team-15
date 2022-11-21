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
import AddFlight from '../pages/Flights/AddFlight.jsx';
import UpdateFlight from '../pages/Flights/UpdateFlight.jsx';
import FlightsList from "../pages/Flights/DisplayFlights.jsx";
import sidebar_menu from '../constants/sidebar-menu';
import './Dashboard.css';
import SideBar from './Sidebar';


function isLoggedIn(props) {
    if (localStorage.getItem('user') !== null) {
      console.log(localStorage.getItem('token'))
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
          
          <BrowserRouter>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path='/login' element={<Login/>} />
              <Route exact path='/register' element={<Signup/>} />
              <Route path='/dashboard' element={!isLoggedIn(this.props) ? <Navigate to='/login'><Login/> </Navigate>:
                <FlightsList/>}/>
              <Route exact path="/AddFlight" element={< AddFlight/>} />
              <Route exact path="/update/:FLIGHT_CODE" element={< UpdateFlight/>} />
              <Route exact path="/profile" element={<div></div>} />
              </Routes>
    </BrowserRouter>
      

  )
    };


}
const mapStateToProps = (response) => ({response});

  export default connect(mapStateToProps)(RoutesClass);