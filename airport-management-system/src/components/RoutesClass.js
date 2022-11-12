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


function isLoggedIn(props) {
    if (props.response.login.response?.isLogged) {
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
        
    <BrowserRouter history= {useLocation}>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route exact path='/login' element={<Login/>} />
    <Route exact path='/register' element={<Signup/>} />
    <Route path='/dashboard' element={!isLoggedIn(this.props) ? <Navigate to='/login'><Login/> </Navigate>: <DashboardPage/>} />
  </Routes>
      </BrowserRouter>

  )
    };


}
const mapStateToProps = (response) => ({response});

  export default connect(mapStateToProps)(RoutesClass);