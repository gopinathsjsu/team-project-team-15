import React, { Component } from 'react';
import { Navigate, useLocation, useNavigate} from 'react-router-dom';
import { logoutUserAction } from '../actions/authenticationAction.js';
import { connect } from 'react-redux';



function DashboardPage (props){
  const navigate  = useNavigate();
    return (
      <div style={{textAlign:'center'}}>
        {props.response.login.response?.isSuccess}
        {props.response.register.response?.isSuccess}
        <div><button onClick={()=>{
          localStorage.removeItem('token');
  navigate('/login');props.dispatch(logoutUserAction());}}>Log out</button></div>
      </div>
    );
}

const mapStateToProps = (response) => ({response});

  export default connect(mapStateToProps)(DashboardPage);