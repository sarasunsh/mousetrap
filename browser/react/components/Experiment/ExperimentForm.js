import React from 'react';
import { Link } from 'react-router';


export default class ExperimentForm extends React.Component {
    render () {
        console.log('component', this.props)
        return (
            <div className='well'>
                <div>
                    <h4>Experimental Design</h4>
                    {this.props.exptArms.map( arm => (
                        <div key={arm.id}>
                            <h5>{arm.id}: {arm.genotype}+{arm.treatment}</h5>
                            <button
                                className="btn btn-default"
                                onClick={this.props.deleteArm}>
                                <span className="glyphicon glyphicon-remove"></span>
                            </button>
                        </div>
                        )
                    )}
                </div><br></br>
                <form className='form-horizontal' onSubmit={this.props.handleSubmit}>
                    <legend>Add Another Arm</legend>
                    <label>Description</label>
                    <input
                        className="form-control"
                        type='text'
                        value={this.props.description}
                        onChange={this.props.handleDescriptionChange}
                    /><br></br>
                    <label>Enrollment Goal</label>
                    <input
                        className="form-control"
                        type='text'
                    /><br></br>
                    <label>Genotype</label>
                    <input
                        className="form-control"
                        type='text'
                        value={this.props.genotype}
                        onChange={this.props.handleGenotypeChange}
                    /><br></br>
                    <label>Treatment</label>
                    <input
                        className="form-control"
                        type='text'
                        value={this.props.treatment}
                        onChange={this.props.handleTreatmentChange}
                    /><br></br>
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={this.props.invalid}
                    > Create Experimental Arm
                    </button>
                </form>
            </div>
        )
    }
}
