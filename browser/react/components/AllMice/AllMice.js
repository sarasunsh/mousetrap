import React from 'react';
import { Link } from 'react-router';

export default class AllMice extends React.Component {
    render () {
        console.log('I LOVE YOU', this.props.mice)
        return (
            <div>
                <h3>List of mice in the colony</h3>
                <ul className="list-unstyled">
                {this.props.mice.map(mouse => (
                    <li key={mouse.id}><Link to={`/mice/${mouse.id}`}>
                        {mouse.gender}, {mouse.genotype}, {mouse.strain}
                    </Link></li>
                    )
                )}
                </ul>
            </div>
        )
    }
}
