import React, { Component } from 'react';
import Form from './Form.jsx'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <Form addUserInfo={this._addUserInfo}/>
    );
  }
  _addUserInfo(userInfo) {
    let newListUserInfo = this.state.listUserInfo.map((user, index) => {
      return user;
    })
    for (key in userInfo.validate) {
      if (userInfo.validate[key] == false) return;
    }
    pushToServer(userInfo.info)
  }
}