import { LOAD_ALL_ARMS, ADD_NEW_ARM } from '../constants';

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
            console.log('arm created', newArm)
            const action = receiveNewArm(newArm);
            console.log('action created')
            dispatch(action)
        })
    }
    return thunk;
}

export const addPlaylist = data =>
  dispatch => {
    const body = JSON.stringify(data),
          method = 'POST',
          headers = new window.Headers({
            'Content-Type': 'application/json'
          });

    return fetch('/api/playlists', { method, body, headers })
      .then(res => res.json())
      .then(playlist => {
        dispatch(receiveNewPlaylist(playlist));
        browserHistory.push(`/playlists/${playlist.id}`);
      });
  };

// REDUCER --------------------------------------------------------
export default function experimentArmReducer(state=[], action){
    switch (action.type){
        case LOAD_ALL_ARMS: return  action.loadedArms
        case ADD_NEW_ARM: return [...state, action.newArm]
        default: return state
    }
}
