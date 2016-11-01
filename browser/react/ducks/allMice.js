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
        fetch('/api/mice')
        .then(res => res.json())
        .then(fetchedMice => dispatch(loadAllMice(fetchedMice)))
        .catch(err => console.log(err))
    }
    return thunk;
}

export const addNewMouse = function(data) {
    const thunk = function(dispatch){
        const body = JSON.stringify(data),
            method = 'POST',
            headers = new window.Headers({
                'Content-Type': 'application/json'
            });

        return fetch('/api/mice', {method, body, headers})
        .then(res => res.json())
        .then(newMouse => {
            const action = receiveNewMouse(newMouse);
            dispatch(action)
        })
    }
    return thunk;
}

// REDUCER --------------------------------------------------------
export default function allMiceReducer(state=[], action){
    switch (action.type){
        case LOAD_ALL_MICE: return  action.loadedMice
        case ADD_NEW_MOUSE: return [...state.mice, action.newMouse]
        default: return state
    }
}
