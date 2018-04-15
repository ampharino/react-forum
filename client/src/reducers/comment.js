export default function comment(state={}, action={}){
    switch(action.type){
        case 'COMMENT_CREATED':
            return action.comment;
        default:
            return state;
    }
}