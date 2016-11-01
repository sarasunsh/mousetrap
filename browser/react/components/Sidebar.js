'use strict';

import React from 'react';
import { Link } from 'react-router';


export default function (props) {
  return (
    <sidebar>
      <img src="mouse2.svg" className="logo" />
      <section>
        <h4 className='menu-item'>
          <Link to="/addmouse">Add New Litter</Link>
        </h4>
      </section>
      <section>
        <h4 className='menu-item'>
          <Link to="/mice">Colony Log</Link>
        </h4>
      </section>
      <section>
        <h4 className='menu-item'>
          <Link to="/mice">Breeding Pairs</Link>
        </h4>
      </section>
      <section>
        <h4 className='menu-item'>
          <Link to="/experiment">Experimental Design</Link>
        </h4>
      </section>
      <section>
        <h4 className='menu-item'>
          <Link to="/mice">Gantt Charts</Link>
        </h4>
      </section>
      <section>
        <h4 className='menu-item'>
          <Link to="/mice">Analytics</Link>
        </h4>
      </section>
    </sidebar>

  )
}
