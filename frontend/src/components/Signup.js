import React from "react";
import { registerUserAction } from "../actions/authenticationAction";
import { Navigate} from "react-router-dom";
import { connect } from 'react-redux';

import "../components/Login.css"

  
  class Signup extends React.Component {
    constructor(props){
      super(props);
      this.state={accountType:""}
    }
    handleChange(event) {
      const { target } = event;
      const { value } = target;
      this.setState({
        accountType: value
      });
    }
    onHandleSignup=(event) => {
        event.preventDefault();
    
        let name = event.target.name.value;
        let password = event.target.password.value;
        let accountType  = event.target.accountType.value;
        let employeeID  = event.target.employeeId?.value;
        let email  = event.target.email.value;
        let passport = event.target.passport.value;

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
          name, password, accountType, email, employeeID, passport
        };
        
    
        this.props.dispatch(registerUserAction(data));
  
    }
    
    render() {
      let isSuccess, isCreated;
    if (this.props.response?.register?.hasOwnProperty('response')) {
      isSuccess = this.props.response.register.response.isSuccess;
      isCreated= this.props.response.register.response.isCreated;
      console.log(isCreated)
      
      
      if (isSuccess) {
        localStorage.removeItem('token');
        localStorage.setItem('token', this.props.response.register.response.token);
        localStorage.setItem('user',this.props.response.register.response.isSuccess);
      }
    }
      
      const style = {
        margin: "15px 0"
      };

      return (
        <div className="login-container" style={{backgroundColor:'#cce4ff'}}>
          {!isCreated ? <div>{isSuccess}</div> : <Navigate to="/dashboard"/>}
          
          <div className="title">
           Sign Up
          </div>
          <form class="login-container" onSubmit={this.onHandleSignup}>
          <div><label>Name</label><input type="text" id="name"/></div>
          <div><label>Email</label><input type="text" id="email"/></div>
          <div><label>Password</label><input type="password" id="password"/></div>
          <div><label>Passport</label><input type="passport" id="passport"/></div>
          <div >
          <label>Account Type</label>
            <select
            onChange={this.handleChange.bind(this)}
            name="accountType"
            >
                <option value="none" selected disabled hidden></option>
                <option value="airlineEmployee">Airline Employee</option>
                <option value="airportEmployee">Airport Employee</option>
                <option value="customer">Customer</option>
            </select>
           
            {(this.state.accountType === "airportEmployee" || this.state.accountType === "airlineEmployee") 
            ? <div style={{paddingTop:'20px', paddingBottom: '20px' }} ><div><label>Employee ID</label><input type="text" name="employeeId"/></div></div>
             : null}
          </div>
          <button type="submit" className="login-button">Create Account</button>
          </form>
          
        </div>
      );
    }
  }
  const mapStateToProps = (response) => ({response});
  export default connect(mapStateToProps)(Signup);
