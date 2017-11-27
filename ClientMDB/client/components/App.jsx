import React, { Component } from 'react';
import Input from './Input.jsx';
import Select from './Select.jsx';
import Choice from './Choice.jsx';
import UploadImage from './UploadImage.jsx'
import './css/app.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValidate: false
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
          validate = {this.state.nameValidate}
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
          validate = {this.state.emailValidate}
        />
        <Input 
          type = "date"
          label = "DOB"
          property = "DOB"
          validateAndMessage = {[]}
          changeHandle = {this._changHandle}
          validate = {this.state.DOBValidate}
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
        />
      </div>
    );
  }
  _changHandle (property, value, validate) {

  }
}