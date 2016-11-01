import React, { Component } from 'react';

export default class SingleMouse extends Component {

  render () {
    return (
      <div>
        <h2>{ this.props.mouse.genotype }</h2>
        <div>
          <img src='http://media.salon.com/2012/11/shutterstock_57341071.jpg' />
        </div>
      </div>
    )
  }
}
