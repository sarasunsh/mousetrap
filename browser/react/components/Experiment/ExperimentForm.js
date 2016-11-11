import React from 'react';
import { Link } from 'react-router';
import { Accordion, Panel, Col, Button } from 'react-bootstrap';

export default class ExperimentForm extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            open: false
        };
    }

    render () {
        return (

          <div>
            <Button bsStyle="primary" onClick={ ()=> this.setState({ open: !this.state.open })}>
              Add another arm
            </Button>
            <Panel collapsible expanded={this.state.open}>
                <form className='form-horizontal' onSubmit={this.props.handleSubmit}>
                    <label>Genotype</label>
                    <input
                        className="form-control"
                        type='text'
                        value={this.props.genotype}
                        onChange={this.props.handleGenotypeChange}
                    />
                    <label>Treatment</label>
                    <input
                        className="form-control"
                        type='text'
                        value={this.props.treatment}
                        onChange={this.props.handleTreatmentChange}
                    />
                    <label>Description</label>
                    <input
                        className="form-control"
                        type='text'
                        value={this.props.description}
                        onChange={this.props.handleDescriptionChange}
                    />
                    <label>Enrollment Goal</label>
                    <input
                        className="form-control"
                        type='text'
                    /><br></br>
                    <Button
                        type="submit"
                        className="btn btn-success"
                        disabled={this.props.invalid}
                    > Create Experimental Arm
                    </Button>
                </form>
            </Panel>
          </div>

        )
    }
}
