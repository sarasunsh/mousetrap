'use strict';

import React from 'react';
import { connect } from'react-redux';
import NewMouseForm from './NewMouseForm';
import { addNewMouse } from '../../ducks/allMice';

// Here the HOC takes the 'dumb' playlist component and gives it a local state to track the title and then event handlers for when the title is changed and when it is submitted. It also passes down the addNewPlaylist action creator so the new title can be sent to the store after submission
function NewMouseDecorator(NewMouseFormComponent) {
    return class StatefulNewMouseForm extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                gender: 'male',
                genotype: '',
                invalid: true,
                vegas: false
            }
            this.handleGenderChange = this.handleGenderChange.bind(this);
            this.handleGenotypeChange = this.handleGenotypeChange.bind(this);
            this.handleSubmitWithState = this.handleSubmitWithState.bind(this);
        }

        handleGenderChange(evt){
            this.setState({
                gender: evt.target.value
            });
        }

        handleGenotypeChange(evt){
            this.setState({
                genotype: evt.target.value,
                invalid: evt.target.value.length > 16
            });
        }

        handleSubmitWithState(evt){
            // evt.preventDefault();
            const newMouse = {
                gender:this.state.gender,
                genotype: this.state.genotype.toUpperCase(),
                strain: 'C57'
            }
            this.props.createMouse(newMouse);
            this.setState({
                gender: 'male',
                genotype: '',
                invalid: true
            })
        }

        render(){
            return (
                <NewMouseFormComponent
                    handleGenotypeChange={this.handleGenotypeChange}
                    handleGenderChange={this.handleGenderChange}
                    handleSubmit={this.handleSubmitWithState}
                    genderText={this.state.gender}
                    genotypeText={this.state.genotype}
                    invalid={this.state.invalid}
                    vegas={this.state.vegas}
                />
            )
        }
    }
}

const mapStateToProps = function(state){
    return {
        test: state.mice
    }
}

const mapDispatchToProps = function (dispatch) {
  return {
    createMouse: function(mouseObj) {
        const action = addNewMouse(mouseObj);
        dispatch(action);
    }
  }
};

const StatefulNewMouseForm = NewMouseDecorator(NewMouseForm)
const NewMouseFormContainer = connect(mapStateToProps, mapDispatchToProps)(StatefulNewMouseForm);
export default NewMouseFormContainer;
