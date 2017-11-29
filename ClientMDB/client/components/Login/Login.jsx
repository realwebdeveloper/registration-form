import React from 'react';
import Input from '../Input/Input.jsx'


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
    }
    render() {
        return (
            <div className='Login'>
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
                <button>Log In</button>
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