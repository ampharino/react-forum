export default function comment(state={}, action={}){
    switch(action.type){
        case 'COMMENT_CREATED':
            return action.comment;
        case 'COMMENT_EDITED':
            return action.comment;
        case 'COMMENT_DELETED':
            return state
        default:
            return state;
    }
}