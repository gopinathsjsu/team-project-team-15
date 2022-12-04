import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { connect} from 'react-redux';
import { Navigate } from 'react-router-dom';

import './App.css';
import Home from './Home.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
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

      <div></div>
      <Routes>
        <Route path="/" element={!isLoggedIn(props) ? <Home/> : <Navigate to='/dashboard'><RoutesClass/> </Navigate>} />
        <Route exact path='/login' element={!isLoggedIn(props) ? <Login/> : <Navigate to='/dashboard'><RoutesClass/> </Navigate>} />
        <Route exact path='/register' element={<Signup/>} />
        <Route path='/dashboard/*' element={!isLoggedIn(props) ? <Navigate to='/login'><Login/> </Navigate>:<RoutesClass/>} />
      </Routes>

    </Router>
  )
}

const mapStateToProps = (response) => ({response});

  export default connect(mapStateToProps)(App);
