import { LOAD_ALL_ARMS, ADD_NEW_ARM, DELETE_ARM } from '../constants';

// ACTION-CREATORS--------------------------------------------------------
export const loadAllArms = function(fetchedArms){
    return {
        type: LOAD_ALL_ARMS,
        loadedArms: fetchedArms
    }
}

export const receiveNewArm = function(newArm){
    return {
        type: ADD_NEW_ARM,
        newArm: newArm
    }
}

export const removeDeletedArm = function(deletedArm){
    return {
        type: DELETE_ARM,
        deletedArm: deletedArm
    }
}

// DISPATCHERS/THUNKS --------------------------------------------------------
export const fetchArmsFromServer = function(){
    const thunk = function(dispatch) {
        fetch('/api/experiment')
        .then(res => res.json())
        .then(fetchedArms => dispatch(loadAllArms(fetchedArms)))
        .catch(err => console.log(err))
    }
    return thunk;
}

export const addNewArm = function(data) {
    const thunk = function(dispatch){
        const body = JSON.stringify(data),
            method = 'POST',
            headers = new window.Headers({
                'Content-Type': 'application/json'
            });
        return fetch('/api/experiment', {method, body, headers})
        .then(res => {
            return res.json()
        })
        .then(newArm => {
            const action = receiveNewArm(newArm);
            dispatch(action)
        })
    }
    return thunk;
}

export const removeArm = function(data) {
    const thunk = function(dispatch){
        const body = JSON.stringify(data),
            method = 'DELETE',
            headers = new window.Headers({
                'Content-Type': 'application/json'
            });
        return fetch('/api/experiment', {method, body, headers})
        .then(res => {
            return res.json()
        })
        .then(deletedArm => {
            const action = removeDeletedArm(deletedArm);
            dispatch(action)
        })
    }
    return thunk;
}

// export const addPlaylist = data =>
//   dispatch => {
//     const body = JSON.stringify(data),
//           method = 'POST',
//           headers = new window.Headers({
//             'Content-Type': 'application/json'
//           });

//     return fetch('/api/playlists', { method, body, headers })
//       .then(res => res.json())
//       .then(playlist => {
//         dispatch(receiveNewPlaylist(playlist));
//         browserHistory.push(`/playlists/${playlist.id}`);
//       });
//   };

// REDUCER --------------------------------------------------------
export default function experimentArmReducer(state=[], action){
    switch (action.type){
        case LOAD_ALL_ARMS: return  action.loadedArms
        case ADD_NEW_ARM: return [...state, action.newArm]
        case DELETE_ARM: return state.filter(arm => arm.id !== action.deletedArm.id)
        default: return state
    }
}
