import React from 'react';
import { Link } from 'react-router';
import { Col } from 'react-bootstrap'
import SingleMouse from '../SingleMouse/SingleMouse';

export default class AllMice extends React.Component {
    render () {
        return (
            <div>
                <h3>List of mice in the colony</h3>
                {this.props.mice.map(mouse => (
                    <div key={mouse.id}>
                        <Link to={`/mice/${mouse.id}`}>
                            <SingleMouse mouse={mouse} />
                        </Link>
                    </div>
                    )
                )}
            </div>
        )
    }
}
