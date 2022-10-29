import { 
    USER_LOGGED_IN,
    USER_LOG_OUT,
    LOADING_OFF,
    LOADING_ON,
    REGISTERED,
    GET_DATA,
    GET_TASKS
} from "../types";

const InithialUser = {
    isLoggedIn: false,
    isRegistered: false,
    data:{},
}

const InithialTasks = {
    data: []
}

export const userReducer = (user = InithialUser , action) =>{
    switch (action.type){
        case USER_LOGGED_IN:
            return action.payload
        case USER_LOG_OUT :
            return action.payload
        case REGISTERED:
            return action.payload
        case GET_DATA: 
            return action.payload
        default :
            return user;
    }
}


export const loaderReducer = (loading = false , action) =>{
    switch (action.type){
        case LOADING_ON:
            return true
        case LOADING_OFF:
            return false
        default :
            return loading;
    }
}


export const tasksReducer = (tasks = InithialTasks, action) =>{
    switch (action.type){
        case GET_TASKS:
            return action.payload
        default :
            return tasks;
    }
}