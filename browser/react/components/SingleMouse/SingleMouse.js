import React, { Component } from 'react';
import { Button} from 'react-bootstrap';



export default class SingleMouse extends Component {

  render () {
    const {mouse, reportDeath} = this.props
    return (
        <div className="card">
          <img className="card-img-top" src='http://www-tc.pbs.org/wgbh/nova/assets/img/genes-behavior/image-03-small.jpg' alt="Card image cap"/>
          <div className="card-block">
            <h4 className="card-title">ID#{ mouse.id }</h4>
            <p className="card-text">{ mouse.genotype } + { mouse.gender }: { mouse.birthdate } </p>
            <button className="btn btn-primary" onClick={() => reportDeath(mouse.id)}>Report death</button>
          </div>
        </div>
    )
  }
}


