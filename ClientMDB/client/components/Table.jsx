import React, { Component } from 'react';

export default class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const {listUserInfo} = this.props;
    return (
      <div>
        <thead>
          <th> Name </th>
          <th> Email </th>
          <th> DOB </th>
          <th> Gender </th>
          <th> City </th>
        </thead>
        <tbody>
          {
            listUserInfo.map((element, index) => {
              return (
                <tr key={index}>
                  {
                    Object.keys(element).map(key => {
                      return (
                        <td>{element.key}</td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </div>
    );
  }
}