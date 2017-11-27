import React, { Component } from 'react';
import Form from './Form.jsx'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserInfo: []
    }
  }
  render() {
    return (
      <div>
        <Form addUserInfo={this._addUserInfo}/>
        <Table 
          listUserInfo = {this.state.listUserInfo}
        />
      </div>
    );
  }
  _addUserInfo(userInfo) {
    let newListUserInfo = this.state.listUserInfo.map((user, index) => {
      return user;
    })
    for (key in userInfo.validate) {
      if (userInfo.validate[key] == false) return;
    }
    this.pushToServer(userInfo.info)
  }
  pushToServer = (data) => {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
      }
    })

    xhr.open("POST", "http://localhost:8080/api/uploadUserInfo");
    xhr.setRequestHeader("accept", "application/json");
    xhr.send(JSON.stringify(data));
  }
  updateUserInfoList = (data) => {
    this.setState({
      listUserInfo: data
    })
  }
  getSererData = () => {
    let updateListUserInfo = this.updateListUserInfo;

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        updateListUserInfo(JSON.parse(this.responseText))
      }
    })

    xhr.open("GET", "http://localhost:8080/api/ListUserInfo");
    xhr.setRequestHeader("accept", "application/json");
    xhr.send();
  }
}