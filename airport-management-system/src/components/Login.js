import React, { useState } from "react";
import { Link, Navigate} from "react-router-dom";
import { loginUserAction } from '../actions/authenticationAction';
import "../components/Login.css"
import { connect } from 'react-redux';

class FluidInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        focused: false,
        value: ""
      };
    }
    focusField() {
      const { focused } = this.state;
      this.setState({
        focused: !focused
      });
    }
    handleChange(event) {
      const { target } = event;
      const { value } = target;
      this.setState({
        value: value
      });
    }
    render() {
      const { type, label, style, id } = this.props;
      const { focused, value } = this.state;
      
      let inputClass = "fluid-input";
      if (focused) {
        inputClass += " fluid-input--focus";
      } else if (value != "") {
        inputClass += " fluid-input--open";
      }
      
      return (
        <div className={inputClass} style={style}>
          <div className="fluid-input-holder">
            
            <input 
              className="fluid-input-input"
              type={type}
              id={id}
              onFocus={this.focusField.bind(this)}
              onBlur={this.focusField.bind(this)}
              onChange={this.handleChange.bind(this)}
              autocomplete="off"
            />
            <label className="fluid-input-label" forHtml={id}>{label}</label>
            
          </div>
        </div>
      );
    }
  }

  class FluidDropDown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        focused: false,
        value: ""
      };
    }
    focusField() {
      const { focused } = this.state;
      this.setState({
        focused: !focused
      });
    }
    handleChange(event) {
      const { target } = event;
      const { value } = target;
      this.setState({
        value: value
      });
    }
    render() {
      const { type, label, style, id } = this.props;
      const { focused, value } = this.state;
      
      let inputClass = "fluid-input";
      if (focused) {
        inputClass += " fluid-input--focus";
      } else if (value != "") {
        inputClass += " fluid-input--open";
      }
      
      return (
        <div className={inputClass} style={style}>
          <div className="fluid-input-holder">
            
            <select
              className="fluid-input-input"
              type={type}
              id={id}
              onFocus={this.focusField.bind(this)}
              onBlur={this.focusField.bind(this)}
              onChange={this.handleChange.bind(this)}
              autocomplete="off"
              
            >
                <option value="none" selected disabled hidden></option>
                <option value="airlineEmployee">Airline Employee</option>
                <option value="airportEmployee">Airport Employee</option>
                <option value="customer">Customer</option>
            </select>
            <label className="fluid-input-label" forHtml={id}>{label}</label>
            
          </div>
        </div>
      );
    }
  }
  
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
        Don't have account? <Link to='register'>Register here</Link>
          
        </div>
      );
    }
  }
  const mapStateToProps = (response) => ({response});

  export default connect(mapStateToProps)(Login);
