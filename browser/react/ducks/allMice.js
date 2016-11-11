import axios from 'axios';
import { browserHistory } from 'react-router';

import { LOAD_ALL_MICE, ADD_NEW_MOUSE } from '../constants';

// ACTION-CREATORS--------------------------------------------------------
export const loadAllMice = function(fetchedMice){
    return {
        type: LOAD_ALL_MICE,
        loadedMice: fetchedMice
    }
}

export const receiveNewMouse = function(newMouse){
    return {
        type: ADD_NEW_MOUSE,
        newMouse: newMouse
    }
}

// DISPATCHERS/THUNKS --------------------------------------------------------
export const fetchMiceFromServer = function(){
    const thunk = function(dispatch) {
        axios.get('/api/mice')
        .then(res => dispatch(loadAllMice(res.data)))
        .catch(err => console.log(err))
    }
    return thunk;
}

export const addNewMouse = function(data) {
    const thunk = function(dispatch){
        axios.post('/api/mice', data)
        .then(res => {
            const action = receiveNewMouse(res.data);
            dispatch(action);
            browserHistory.push(`/mice/${res.data.id}`);
        })
    }
    return thunk;
}

// REDUCER --------------------------------------------------------
export default function allMiceReducer(state=[], action){
    switch (action.type){
        case LOAD_ALL_MICE: return  action.loadedMice
        case ADD_NEW_MOUSE: return [...state, action.newMouse]
        default: return state
    }
}
