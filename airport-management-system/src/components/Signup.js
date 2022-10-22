import React from "react";

import "../components/Login.css"
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
      } else if (value !== "") {
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
        value: "",
        accountType: ''
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
        accountType: value,
        value: value
      });
    }
    render() {
      const { type, label, style, id } = this.props;
      const { focused, value } = this.state;
      
      let inputClass = "fluid-input";
      if (focused) {
        inputClass += " fluid-input--focus";
      } else if (value !== "") {
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
            {(this.state.accountType === "airportEmployee" || this.state.accountType === "airlineEmployee") 
            ? <div style={{paddingTop:'20px', paddingBottom: '20px' }} ><FluidInput type="text" label="Employee ID" id="EmployeeId" style={style} /></div>
             : null}
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
  
  class Signup extends React.Component {
    
    render() {
      
      const style = {
        margin: "15px 0"
      };

      return (
        <div className="login-container" style={{backgroundColor:'#cce4ff'}}>
          <div className="title">
           Sign Up
          </div>
          <FluidInput type="text" label="First Name" id="name" style={style} />
          <FluidInput type="text" label="Last Name" id="name" style={style} />
          <FluidInput type="text" label="Email" id="name" style={style} />
          <FluidInput type="password" label="password" id="password" style={style} />
          <FluidDropDown label="Account Type" id="Account Type" style={style} />
          <div style={{paddingTop: '60px'}}></div>
          <Button buttonText="Create Account" buttonClass="login-button" />
        </div>
      );
    }
  }
 export default Signup;
