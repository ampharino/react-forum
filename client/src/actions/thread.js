import api from '../api'
export const threadCreated = (thread) =>({
    type: 'THREAD_CREATED',
    thread
})

export const createThread = (details) => dispatch =>
    api.thread.createThread(details).then(newThread => dispatch(threadCreated(newThread)));