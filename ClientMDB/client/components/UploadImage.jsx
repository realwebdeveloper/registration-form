import React, { Component } from 'react';

export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.src
    }
  }
  render() {
    const {src, label} = this.props;
    return (
      <div>
        <img src={this.state.src} alt={label}/>
        <label>
          <input type='file' accept='image/*'
            onClick = {this._changeHandle.bind(this)}
          />
          {label}
        </label>
      </div>
    );
  }
  _changeHandle = (e) => {
<<<<<<< HEAD
    img = window.URL.createObjectURL(e.target.files[0]);
    this.setState({
      src: img,
      validate: true
    }, () => {
      this.props.changeHandle(this.props.property, this.state.src, this.state.validate);
    })
  }
  getBase64Image() {
    var img = document.getElementById("user-picture");
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
=======
    
>>>>>>> c1357beb7639b0449495b8ad9b34ef869c2e84ea
  }
}