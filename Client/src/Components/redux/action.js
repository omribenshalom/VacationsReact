export const actionType = {
    SAVE_USER_DATA: 'SAVE_USER_DATA',
    DELETE_USER_DATA: 'DELETE_USER_DATA',
    SAVE_VACATIONS: 'SAVE_VACATIONS',
    VACATIONS_UPDATE: 'VACATIONS_UPDATE'
};

export const saveUserData = (data) => {
    // console.log("saveUserData => (action) => data => ", data)
    return {
        type: actionType.SAVE_USER_DATA,
        payload: data
    }
};

export const deleteUserData = () => {
    // console.log("deleteUserData => (action) => data => ")
    return {
        type: actionType.DELETE_USER_DATA,
    }
};

export const saveVacations = (data) => {
    // console.log("saveVacations => (action) => data => ", data)
    return {
        type: actionType.SAVE_VACATIONS,
        payload: data
    }
};

export const vacationsUpdate = (vacationsCopy) => {
    // console.log("followVacationUpdate, action, vacationsCopy => ", vacationsCopy)
    return {
        type: actionType.VACATIONS_UPDATE,
        payload: vacationsCopy
    }
};