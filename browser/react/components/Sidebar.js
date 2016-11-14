'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Button} from 'react-bootstrap';

export default function (props) {
  return (
    <sidebar>
      <Link to="/">
        <img src="mouse2.svg" className="logo" />
      </Link>
      <section>
        <h4 className='menu-item'>
          <Link to="/addmouse">Add New Mouse</Link>
        </h4>
      </section>
      <section>
        <h4 className='menu-item'>
          <Link to="/mice">Colony Log</Link>
        </h4>
      </section>
      <section>
        <h4 className='menu-item'>
          <Link to="/experiment">Experimental Design</Link>
        </h4>
      </section>
      <section>
        <h4 className='menu-item'>
          <Link to="/gantt">Gantt Charts</Link>
        </h4>
      </section>
      <section>
        <h4 className='menu-item'>
          <Link to="/analytics">Analytics</Link>
        </h4>
      </section>
      <section>
        <Button bsStyle="chat" block>
          <Link to="/chat">Chatroom</Link>
        </Button>
      </section>
    </sidebar>

  )
}
