import React, { Component } from 'react';

export default class Choice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      validate: false
    }
  }
  render() {
    const {label, optionList, type, property} = this.props;
    return (
      <div>
        <label> {label} </label>
        <div>
          {
            optionList.map((element, index) => {
              return (
                <div key={index}>
                  <input 
                    type = {type}
                    name = {property}
                    value = {element.value}
                    onClick = {() => {this._changeHandle(label, element.value)}}
                  />
                  <label>{element.key}</label>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
  _changeHandle(label, value) {
    this.setState({
      value: value,
      validate: true
    },() => {
      this.props.changeHandle(this.props.property, this.state.value, this.state.validate);
    })
  }
}