import React, { Component } from 'react';
import Input from './Input.jsx';
import Select from './Select.jsx';
import Choice from './Choice.jsx';
import UploadImage from './UploadImage.jsx'

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        name: '',
        email: '',
        DOB: '',
        gender: '',
        city: ''
      },
      validate: {
        name: false,
        email: false,
        DOB: false,
        gender: false,
        city: true
      }
    }
  }
  render() {
    return (
      <div>
        <UploadImage 
          src = ''
          label = 'Upload Picture'
        />
        <Input 
          type = "text"
          label = "Name"
          property = "name"
          validateAndMessage = {[
            {regExp: '(^| )[a-z]', message: 'Your name need capitalized', valid: false},
            {regExp: '^.{0,7}$', message: 'Your name is at least 8 character', valid: false}
          ]}
          changeHandle = {this._changHandle}
          validate = {this.state.validate.name}
        />
        <Input 
          type = "text"
          label = "Email"
          property = "email"
          validateAndMessage = {[
            {regExp: '^[a-z0-9\.]+[a-z0-9]@[a-z]+\\.([a-z]+\\.)*[a-z0-9]+$', message: '', valid: true},
            {regExp: '\w*', message: 'Your email is not valid', valid: false}
          ]}
          changeHandle = {this._changHandle}
          validate = {this.state.validate.email}
        />
        <Input 
          type = "date"
          label = "DOB"
          property = "DOB"
          validateAndMessage = {[]}
          changeHandle = {this._changHandle}
          validate = {this.state.validate.DOB}
        />
        <Select
          label = "City"
          property = "city"
          optionList = {[
            {key: 'Ho Chi Minh', value: 'hochiminh'}, 
            {key: 'Da Nang', value: 'danang'},
            {key: 'Ha Noi', value: 'hanoi'}
          ]}
          changeHandle = {this._changHandle}
        />
        <Choice
          label = "Gender"
          property = "gender"
          type = 'radio'
          optionList = {[
            {key: 'Male', value: 'male'},
            {key: 'Female', value: 'female'}
          ]}
          changeHandle = {this._changHandle}
          validate = {this.state.validate.gender}
        />
        <button onClick={this._addUserInfo}> Submit </button>
      </div>
    );
  }
  _changHandle(property, value, validate) {
    let newInfo = Object.keys(this.state.info).map(key => {
      return this.state.info[key]
    });
    let newValidate = Object.keys(this.state.validate).map(key => {
      return this.state.validate[key]
    });
    newInfo[property] = value;
    newValidate[property] = validate;
    this.setState({
      info: newInfo,
      validate: newValidate
    })
  }
  _addUserInfo() {
    this.props.addUserInfo(this.state)
  }
}