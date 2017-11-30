import React from 'react';
import Input from '../Input/Input.jsx';
import './Login.scss'

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            info: {
                username: '',
                password: ''
            },
            validate: {
                username: false,
                password: false
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
            <div className='Login'>
                <h1>Log In</h1>
                <Input
                    type="text"
                    label="Username"
                    property="username"
                    validateAndMessage={[
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.username}
                ></Input>
                <Input
                    type="password"
                    label="Password"
                    property="password"
                    validateAndMessage={[
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.password}
                ></Input>
                <button
                    onClick = {this.login}
                >Log In</button>
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
        });
    }
    login = () => {
        debugger
    
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
    
        xhr.onreadystatechange = function () {
            if (this.readyState == this.HEADERS_RECEIVED) {
                localStorage.setItem('authKey',xhr.getResponseHeader("authKey"));
                console.log(xhr.getResponseHeader("authKey"));
                console.log(xhr.getAllResponseHeaders());
            }
        }
    
        xhr.open("GET", "http://localhost:8080/api/login");
        // xhr.setRequestHeader("username", data.username);
        // xhr.setRequestHeader("password", data.password);
        xhr.send();
      }
}