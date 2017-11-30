import React from 'react';
import Input from '../Input/Input.jsx';
import './SignUp.scss'

export default class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            info: {
                username: '',
                password1: '',
                password2: ''
            },
            validate: {
                username: false,
                password1: false,
                password2: false
            }
        }
      this.redirect();
    }
    redirect = () => {
      let xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.open("GET", "http://localhost:8080/redirect");
      xhr.setRequestHeader("authKey", localStorage.authKey);
      xhr.send();
    }
    render() {
        return (
            <div className='SignUp'>
                <h1>Sign Up</h1>
                <Input
                    type="text"
                    label="Username"
                    property="username"
                    validateAndMessage={[
                        { regExp: '^.{0,7}$', message: 'Your name is at least 8 character', valid: false }
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.username}
                ></Input>
                <Input
                    type="password"
                    label="Password"
                    property="password1"
                    validateAndMessage={[
                        { regExp: '^.{0,7}$', message: 'Your password is at least 6 characters', valid: false }
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.password1}
                ></Input>
                <Input
                    type="password"
                    label="Confirm password"
                    property="password2"
                    validateAndMessage={[
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.password2}
                ></Input>
                { (this.state.info.password1 != this.state.info.password2) && 
                    <p>2 passwords must be the same</p>
                }
                <button>Sign Up</button>
            </div>
        );
    }
    _changHandle = (property, value, validate) => {
        let newInfo = JSON.parse(JSON.stringify(this.state.info));
        let newValidate = JSON.parse(JSON.stringify(this.state.validate));
        newInfo[property] = value;
        newValidate[property] = validate;
        this.setState({
            info: newInfo,
            validate: newValidate
        })
    }
}