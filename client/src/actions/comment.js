import api from '../api'
export const commentCreated = (comment) =>({
    type: 'COMMENT_CREATED',
    comment
})

export const createComment = (details) => dispatch =>
    api.comment.createComment(details).then(newComment => dispatch(commentCreated(newComment)));