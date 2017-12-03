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
            },
            status: ''
        }
      this.redirect();
    }
    redirect = () => {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhr.status == 403) {
                    window.location.replace('http://localhost:8080/registration');
                }
            }
        })

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
                        { regExp: '^.{0,5}$', message: 'Your name is at least 6 character', valid: false }
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.username}
                ></Input>
                <Input
                    type="password"
                    label="Password"
                    property="password1"
                    validateAndMessage={[
                        { regExp: '^.{0,5}$', message: 'Your password is at least 6 characters', valid: false }
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
                {(this.state.status != '') &&
                    <p>{this.state.status}</p>
                }
                <button onClick = {this.submit}>Sign Up</button>
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
    checkValidate = () => {
        const validate = this.state.validate;
        const info = this.state.info;

        for (let key in validate){
            if (!validate[key]) return false;    
        }
        if (info.password1 !=  info.password2) return false;
        return true;
    }
    handleStatus = (status) => {
        let message = 'Registered Successfully';
        if (status === 1) message = 'Username existed';
        if (status === 1) 
        this.setState({
            status: message
        })
    }
    submit = () => {
        let handleStatus = this.handleStatus;
        if (!this.checkValidate()) return;
        let userInfo = {
            username: this.state.userInfo.username,
            password: this.state.userInfo.password1
        };

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 1) {
                if (xhr.status === 400) handleStatus(1);
                else handleStatus(2);
            }
        });

        xhr.open("POST", "http://localhost/8080/api/signup");
        xhr.send(JSON.stringify(userInfo));
    }
}