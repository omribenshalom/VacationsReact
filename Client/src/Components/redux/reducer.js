import { actionType } from './action';

const initialState = {userData:[] , vacations:[]}

export function saveDataReducer ( state = initialState , action ) {
    const { type , payload } = action
    let newState = {...state}
    switch (type) {
        case actionType.SAVE_USER_DATA:
            // console.log("payload.isAdmin - " , payload.isAdmin)
            // console.log("payload.token - " , payload.token)
            newState.userData = payload
            break
        case actionType.DELETE_USER_DATA:
            // console.log("delete user data.")
            newState.userData = ''
            break
        case actionType.SAVE_VACATIONS:
            // console.log("save vacation. payload - " , payload)
            newState.vacations = payload
            break
        case actionType.VACATIONS_UPDATE:
            // console.log("update vacation. payload - " , payload)
            newState.vacations = payload
            break
        default:
            return state;
    } 
    return newState
};

