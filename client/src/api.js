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
            .then(res => res.data.thread)
    },
    comment:{
        createComment:(details) => axios.post('/api/comments',{details})
            .then(res => res.data.comment)
    }
}