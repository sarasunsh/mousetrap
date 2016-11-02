'use strict';

import React from 'react';
import { connect } from'react-redux';
import ExperimentForm from './ExperimentForm';
import ExperimentFormDecorator from './FormDecorator';
import { addNewArm, removeArm } from '../../ducks/experiment';

const mapStateToProps = function(state){
    return {
        exptArms: state.exptArms
    }
}

const mapDispatchToProps = function (dispatch) {
  return {
    createArm: function(newArm) {
        const action = addNewArm(newArm);
        dispatch(action);
    },
    deleteArm: function(deletedArm) {
        console.log(deletedArm)
        const action = removeArm(deletedArm)
        dispatch(action)
    }
  }
};

const StatefulExperimentForm = ExperimentFormDecorator(ExperimentForm)

const ExperimentFormContainer = connect(mapStateToProps, mapDispatchToProps)(StatefulExperimentForm);
export default ExperimentFormContainer;
