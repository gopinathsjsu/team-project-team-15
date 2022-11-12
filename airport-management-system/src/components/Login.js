import React, { useState } from "react";
import { Link, Navigate} from "react-router-dom";
import { loginUserAction } from '../actions/authenticationAction';
import "../components/Login.css"
import { connect } from 'react-redux';



 
  
  class Button extends React.Component {
    render() {
      return (
        <div className={`button ${this.props.buttonClass}`} onClick={this.props.onClick}>
          {this.props.buttonText}
        </div>
      );
    }
  }
  
  class Login extends React.Component {

    onHandleLogin = (event) => {
      event.preventDefault();
  
      let name = event.target.name.value;
      let password = event.target.password.value;
      let accountType  = event.target.accountType.value;

      switch(accountType){
        case "customer":
          accountType="PASSENGERS"
          break;
        case "airlineEmployee":
          accountType="AIRLINE_EMPLOYEE"
          break;
        case "airportEmployee":
          accountType="AIRPORT_EMPLOYEE"
          break;
      }
  
      const data = {
        name, password, accountType
      };
      
  
      this.props.dispatch(loginUserAction(data));
    }

    render() {
      let isSuccess, isLogged;
    if (this.props.response.login.hasOwnProperty('response')) {
      isSuccess = this.props.response.login.response.isSuccess;
      isLogged= this.props.response.login.response.isLogged;
      console.log(isLogged)
      
      
      if (isSuccess) {
        localStorage.removeItem('token');
        localStorage.setItem('token', this.props.response.login.response.token);
        localStorage.setItem('user',this.props.response.login.response.isSuccess);
      }
    }
      
      const style = {
        margin: "15px 0"
      };
      return (
        
        <div className="login-container" style={{backgroundColor:'#cce4ff'}}>
          {!isLogged ? <div>{isSuccess}</div> : <Navigate to="/dashboard" />}
          <div className="title">
           Login
          </div>
          
          <form className="login-container" onSubmit={this.onHandleLogin}>
          <div>
            <label>Name</label>
            <input type="name" name="name"/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <div>
          <label>Account Type</label>
          <select name="accountType">
                <option value="none" selected disabled hidden></option>
                <option value="airlineEmployee">Airline Employee</option>
                <option value="airportEmployee">Airport Employee</option>
                <option value="customer">Customer</option>
            </select>
          </div>
          
            
          <div><button type="submit" className="login-button">Login</button></div>
            
          
        </form>
        Don't have account? <a href='/register'>Register here</a>
          
        </div>
      );
    }
  }
  const mapStateToProps = (response) => ({response});

  export default connect(mapStateToProps)(Login);
