import {combineReducers} from 'redux';
import user from './reducers/user';
import thread from './reducers/thread'
import comment from'./reducers/comment'

export default combineReducers({
    user,
    thread,
    comment
})