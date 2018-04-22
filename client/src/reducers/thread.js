export default function thread(state={}, action={}){
    switch(action.type){
        case 'THREAD_CREATED':
            return action.thread;
        case 'THREAD_UPDATED':
            return action.thread;
        case 'THREAD_DELETED':
            return {};
        default:
            return state;
    }
}