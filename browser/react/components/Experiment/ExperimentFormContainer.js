'use strict';

import React from 'react';
import { connect } from'react-redux';
import ExperimentForm from './ExperimentForm';
import { addNewArm } from '../../ducks/experiment';

// Here the HOC takes the 'dumb' form component and gives it a local state to track the title and then event handlers for when the experiment arm details are changed OR when the form is submitted. It also passes down the addNewArm action creator so the new arm can be sent to the store after submission
function ExperimentFormDecorator(ExperimentFormComponent) {
    return class StatefulExperimentForm extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                description: '',
                genotype: '',
                treatment: '',
                invalid: true
            }
            this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
            this.handleGenotypeChange = this.handleGenotypeChange.bind(this);
            this.handleTreatmentChange = this.handleTreatmentChange.bind(this);
            this.handleSubmitWithState = this.handleSubmitWithState.bind(this);
        }

        handleDescriptionChange(evt){
            this.setState({
                description: evt.target.value
            });
        }

        handleGenotypeChange(evt){
            this.setState({
                genotype: evt.target.value,
                invalid: evt.target.value.length > 16
            });
        }

        handleTreatmentChange(evt){
            this.setState({
                treatment: evt.target.value
            });
        }

        handleSubmitWithState(evt){
            evt.preventDefault();
            const newArm = {
                title:this.state.description,
                goal: 5,
                genotype: this.state.genotype.toUpperCase(),
                treatment: this.state.treatment
            }
            this.props.createArm(newArm);
            this.setState({
                description: '',
                genotype: '',
                treatment: '',
                invalid: true
            })
        }

        render(){
            return (
                <ExperimentFormComponent
                    handleDescriptionChange={this.handleDescriptionChange}
                    handleGenotypeChange={this.handleGenotypeChange}
                    handleTreatmentChange={this.handleTreatmentChange}
                    handleSubmit={this.handleSubmitWithState}
                    description={this.state.description}
                    genotype={this.state.genotype}
                    treatment={this.state.treatment}
                    goal={this.state.goal}
                    invalid={this.state.invalid}
                />
            )
        }
    }
}

// const mapStateToProps = function(state){
//     console.log('mapstate', state.exptArms)
//     return {
//         exptArms: state.exptArms,
//         test: 'do you see this'
//     }
// }

const mapDispatchToProps = function (dispatch) {
  return {
    createArm: function(newArm) {
        const action = addNewArm(newArm);
        dispatch(action);
    }
  }
};

const StatefulExperimentForm = ExperimentFormDecorator(ExperimentForm)
const ExperimentFormContainer = connect(null, mapDispatchToProps)(StatefulExperimentForm);
export default ExperimentFormContainer;
