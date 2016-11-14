/* global ga */

import React, { Component } from 'react';
import {Grid, Row} from 'react-bootstrap';

// import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


const data = [
      {name: 'Arm1 - SMA + Vehicle', enrolled: 3, remaining: 2},
      {name: 'Arm2 - SMA + Drug', enrolled: 2, remaining: 3},
      {name: 'Arm3 - WT + Vehicle', enrolled: 1, remaining: 4},
      {name: 'Arm4 - WT + Drug', enrolled: 2, remaining: 3}
];

export default class Gantt extends Component {

    render() {
        return (
          <div>
              <h4>Enrollment Progress</h4>
              <BarChart width={600} height={300} data={data}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Bar dataKey="remaining" stackId="a" fill="#8884d8" />
              <Bar dataKey="enrolled" stackId="a" fill="#82ca9d" />
              </BarChart>
          </div>

        )
    }
}
