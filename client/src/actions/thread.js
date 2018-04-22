import api from '../api'
export const threadCreated = (thread) =>({
    type: 'THREAD_CREATED',
    thread
})

export const threadUpdated = (thread) =>({
    type: 'THREAD_UPDATED',
    thread
})

export const threadDeleted = () =>({
    type:'THREAD_DELETED',
})

export const createThread = (details) => dispatch =>
    api.thread.createThread(details).then(newThread => dispatch(threadCreated(newThread)));

export const editThread = (details) => dispatch =>
    api.thread.editThread(details).then(newThread => dispatch(threadUpdated(newThread)));

export const deleteThread = (threadId) => dispatch =>
    api.thread.deleteThread(threadId).then( () => dispatch(threadDeleted()));