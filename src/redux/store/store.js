import {createStore , combineReducers , applyMiddleware } from 'redux'
import {
    userReducer,
    loaderReducer,
    tasksReducer
} from '../reducers'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";


const rootReducer = combineReducers({
    user:userReducer,
    loading: loaderReducer,
    tasks: tasksReducer
})


export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)