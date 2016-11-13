/* global ga */

import React, { Component } from 'react';
import {Grid, Row} from 'react-bootstrap';

// import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Legend, Bar} from 'recharts';


const data = [
      {name: '0', smaDrug: 100, smaVehicle: 100, WT: 100},
      {name: '10', smaDrug: 85, smaVehicle: 65, WT: 100},
      {name: '20', smaDrug: 85, smaVehicle: 55, WT: 100},
      {name: '30', smaDrug: 80, smaVehicle: 45, WT: 100},
      {name: '40', smaDrug: 80, smaVehicle: 40, WT: 95},
      {name: '50', smaDrug: 70, smaVehicle: 35, WT: 95},
      {name: '60', smaDrug: 68, smaVehicle: 30, WT: 95},
];

const data2= [
      {name: 'Overall', smaDrug: 78, smaVehicle: 49, WT: 97}
];


export default class mainComponent extends Component {
    constructor(props){
        super(props);
        this.state = { kaplanChart: [] }
    }

    render() {

        return (
          <div>
              <div>
                    <h4>Kaplan-Meier Survival Curves</h4>
                    <LineChart width={600} height={200} data={data} syncId="anyId"
                          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                      <Brush />
                      <XAxis dataKey="name" label="Days"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Line type='monotone' dataKey='smaDrug' stroke='#504ac6' fill='#504ac6' strokeWidth='2'/>
                      <Line type='monotone' dataKey='smaVehicle' stroke='#c6504a' fill='#c6504a'  strokeWidth='2'/>
                      <Line type='monotone' dataKey='WT' stroke='#4ac650' fill='#4ac650'  strokeWidth='2'/>
                    </LineChart>

                    <AreaChart width={600} height={200} data={data} syncId="anyId"
                          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Area type='monotone' dataKey='WT' stackId="1" stroke='#4ac650' fill='#4ac650'/>
                      <Area type='monotone' dataKey='smaDrug' stackId="1" stroke='#82ca9d' fill='#504ac6' />
                      <Area type='monotone' dataKey='smaVehicle' stackId="1" stroke='#82ca9d' fill='#c6504a' />
                    </AreaChart>
              </div>
              <div>
                  <h4>Average Survival</h4>
                  <BarChart width={600} height={300} data={data2}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey='smaDrug' fill='#504ac6' />
                   <Bar dataKey='smaVehicle' fill='#c6504a' />
                   <Bar dataKey='WT' fill='#4ac650' />
                  </BarChart>
              </div>
          </div>

        )
    }
}
