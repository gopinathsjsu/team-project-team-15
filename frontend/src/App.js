import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch  } from 'react-router-dom';
import { connect , Provider} from 'react-redux';
import './App.css';
import SideBar from './components/Sidebar/index.jsx';
import sidebar_menu from './constants/sidebar-menu.js';
import AddFlight from './pages/Flights/AddFlight.jsx';
import UpdateFlight from './pages/Flights/UpdateFlight.jsx';
import FlightsList from "./pages/Flights/DisplayFlights.jsx";
import { useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import Home from './Home.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import DashboardPage from './components/Dashboard.js';
import RoutesClass from './components/RoutesClass';

function isLoggedIn(props) {
  if (localStorage.getItem('type')) {
    console.log(props.response.login.response?.isLogged)
    return true;
  }
  console.log("hello not logged")
  return false;
}

function App (props) {
  return(
    <Router>
      <header style={{fontFamily: 'san-serif',padding: '10px',
      color: 'white',textAlign:'center',
      fontSize: '48px', backgroundColor: '#007AFF'}}>Airport Management System</header>
      <div style={{paddingBottom: '50px'}}></div>
      <Routes>
        <Route path="/" element={!isLoggedIn(props) ? <Home/> : <Navigate to='/dashboard'><RoutesClass/> </Navigate>} />
        <Route exact path='/login' element={!isLoggedIn(props) ? <Login/> : <Navigate to='/dashboard'><RoutesClass/> </Navigate>} />
        <Route exact path='/register' element={<Signup/>} />
        <Route path='/dashboard/*' element={!isLoggedIn(props) ? <Navigate to='/login'><Login/> </Navigate>:<RoutesClass/>} />
      </Routes>
      {/* <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={< FlightsList/>} />
                  <Route exact path="/AddFlight" element={< AddFlight/>} />
                  <Route exact path="/update/:FLIGHT_CODE" element={< UpdateFlight/>} />
                  <Route exact path="/profile" element={<div></div>} />
                  <Route path='/dashboard' element={!isLoggedIn(props) ? <Navigate to='/login'><Login/> </Navigate>: <DashboardPage/>} />
              </Routes>
          </div>
      </div> */}
    </Router>
  )
}

const mapStateToProps = (response) => ({response});

  export default connect(mapStateToProps)(App);
