import axios from 'axios';

export default{
    user:{
        login:(credentials) => axios.post('api/auth',{credentials})
            .then(res => res.data.user),

        signup: (user) => axios.post('api/users',{user})
            .then(res => res.data.user)
    },
    thread:{
        createThread:(details) => axios.post('api/threads',{details})
            .then(res => res.data.thread),
        editThread:(details) => axios.put(`/api/threads/${details.threadId}`,{details})
            .then(res => res.data.thread),
        deleteThread:(threadId) => axios.delete(`/api/threads/${threadId}`)
            .then(res => res.data.message),
    },
    comment:{
        createComment:(details) => axios.post('/api/comments',{details})
            .then(res => res.data.comment),
        editComment:(details) => axios.put(`/api/comments/${details.commentId}`,{details})
            .then(res => res.data.comment),
        deleteComment:(commentId) => axios.delete(`/api/comments/${commentId}`)
            .then(res => res.data.message),
    }
}