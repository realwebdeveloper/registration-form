import React, { Component } from 'react';
import Form from '../Form/Form.jsx';
import Table from '../Table/Table.jsx';
import './App.scss'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserInfo: []
    }
    this.getServerData();
    this.redirect();
  }
  redirect = () => {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        debugger
        if (xhr.status == 403) {
          window.location.replace('http://localhost:8080/login');
        }
      }
    })

    xhr.open("GET", "http://localhost:8080/redirect");
    xhr.setRequestHeader("authKey", localStorage.authKey);
    xhr.send();
  }
  render() {
    return (
      <div className='page'>
        {/* <button onClick={this.logOut}>Log out</button> */}
        <Form addUserInfo={this._addUserInfo}/>
        <Table 
          listUserInfo = {this.state.listUserInfo}
        />
         {/* <button onClick={this.getServerData}>GET</button> */}
      </div>
    );
  }
  _addUserInfo = (userInfo) => {
    debugger
    let newListUserInfo = this.state.listUserInfo.map((user, index) => {
      return user;
    })
    for (let key in userInfo.validate) {
      if (userInfo.validate[key] == false) return;
    }
    this.pushToServer(userInfo.info)
  }
  pushToServer = (data) => {
    debugger
    let getServerData = this.getServerData;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      console.log(this.readyState);
      if (this.readyState === 1) {
        location.reload();
        getServerData();
      }
    })

    xhr.open("POST", "http://localhost:8080/api/uploadUserInfo");
    xhr.setRequestHeader("accept", "application/json");
    xhr.send(JSON.stringify(data));
  }
  updateListUserInfo = (data) => {
    debugger
    this.setState({
      listUserInfo: data
    })
  }
  getServerData = () => {
    debugger
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
  logOut = () => {
    localStorage.removeItem('authKey');
    this.redirect();
  }
}