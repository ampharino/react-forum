export default function thread(state={}, action={}){
    switch(action.type){
        case 'THREAD_CREATED':
            return action.thread;
        default:
            return state;
    }
}