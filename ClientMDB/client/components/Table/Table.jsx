import React, { Component } from 'react';
import './Table.scss';

export default class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const {listUserInfo} = this.props;
    return (
      <div className = 'Table'>
        <table>
          <thead>
            <tr>
              <th> Name </th>
              <th> Email </th>
              <th> DOB </th>
              <th> Gender </th>
              <th> City </th>
            </tr>
          </thead>
          <tbody>
            {
              listUserInfo.map((element, index) => {
                return (
                  <tr key={index}>
                    {
                      Object.keys(element).map(key => {
                        if (key != '_id'){
                          return (
                            <td key={element[key]}>{element[key]}</td>
                          ); 
                        }
                        else {
                          return (null);
                        }
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}