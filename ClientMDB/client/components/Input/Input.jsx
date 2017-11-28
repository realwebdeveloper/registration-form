import React, { Component } from 'react';
import InputStyle from './Input.scss'

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state ={
      value:"",
      message:"",
      validate: false
    }
  }
  render() {
    const {label, property, validateAndMessage, type, changeHandle, validate} = this.props;
    return (
      <div className={InputStyle.div}>
        <label>{label}</label>
        <div>
            <input
              value = {this.state.value}
              type  = {type}
              onChange = {this._changeHandle.bind(this, label)}
              onBlur = {this._changeHandle.bind(this, label)}
            />
            {!this.state.validate && <label>{this.state.message}</label>}
        </div>
      </div>
    );
  }
  _changeHandle = (label, e) => {
    debugger
    let newValue = e.target.value;
    let newMessage = "";
    let newValidate = true;
    newValue = newValue.split(" ").filter(function(c) {return c!=""}).join(' ');
    for (let i = 0; i < this.props.validateAndMessage.length; ++i) {
      let element = this.props.validateAndMessage[i];
      let checkRegExp = new RegExp(element.regExp);
      if (checkRegExp.test(newValue)) {
        newMessage = element.message;
        newValidate = element.valid;
        break;
      }
    }
    this.setState({
      value: e.target.value,
      message: newMessage,
      validate: newValidate
    }, () => {
      this.props.changeHandle(this.props.property, this.state.value, this.state.validate);
    });
  }
}