'use strict';

import React from 'react';

// Here the HOC takes the 'dumb' form component and gives it a local state to track the title and then event handlers for when the experiment arm details are changed OR when the form is submitted. It also passes down the createArm action creator that it receives from the container so the new arm can be sent to the store after submission. NOTE: this function does not have direct access to the store; it needs to be given dispatch and props by the container

// ExperimentFormComponent is the "wrapped class" and its instances are wrapped components
// StatefulExperimentForm is the "wrapper class" and its instances are wrapper components
// The function itself is the HOC

// A wrapper component usually handles events on behalf of the wrapped component. It maintains some state and communicates with the wrapped component by passing state values and callbacks to the wrapped component via its props.

// If it is to be compatible with arbitrary components, a higher-order component must provide a way to control the interface between the wrapper and wrapped components to avoid name clash and map the data provided by the wrapper to the props expected by the wrapped component.
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
            // Be careful with deleting or editing important props, you should probably namespace your Higher Order props not to break the WrappedComponent.
            const newProps = {
                handleDescriptionChange: this.handleDescriptionChange,
                handleGenotypeChange: this.handleGenotypeChange,
                handleTreatmentChange: this.handleTreatmentChange,
                handleSubmit: this.handleSubmitWithState,
                description: this.state.description,
                genotype: this.state.genotype,
                treatment: this.state.treatment,
                goal: this.state.goal,
                invalid: this.state.invalid
            }

            return (
                <ExperimentFormComponent
                    {...this.props} {...newProps}
                />
            )
        }
    }
}

export default ExperimentFormDecorator;
