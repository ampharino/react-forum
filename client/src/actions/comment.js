import api from '../api'
export const commentCreated = (comment) =>({
    type: 'COMMENT_CREATED',
    comment
})

export const commentEdited = (comment) =>({
    type:'COMMENT_EDITED',
    comment
})

export const commentDeleted = () => ({
    type: 'COMMENT_DELETED',
})

export const createComment = (details) => dispatch =>
    api.comment.createComment(details).then(newComment => dispatch(commentCreated(newComment)));

export const editComment = (details) => dispatch =>
    api.comment.editComment(details).then(newComment => dispatch(commentEdited(newComment)))

export const deleteComment = (details) => dispatch =>
    api.comment.deleteComment(details).then( () => dispatch(commentDeleted()))