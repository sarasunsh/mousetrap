import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import SingleMouseDetail from './SingleMouseDetail';

export default class SingleMouse extends Component {

  render () {
    const {mouse, reportDeath} = this.props
    return (
        <div>
          <SingleMouseDetail mouse={mouse} />
          <Button bsSize='small' className="btn btn-primary" onClick={() => reportDeath(mouse.id)}>Report death</Button>
        </div>
    )
  }
}
