import React, { Component } from 'react';

export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const {src, label} = this.props;
    return (
      <div>
        <img src={src} alt={label}/>
        <label>
          <input type='file' accept='image/*'
            onClick = {() => {this._changeHandle(e)}}
          />
          {label}
        </label>
      </div>
    );
  }
  _changeHandle = (e) => {
    
  }
}