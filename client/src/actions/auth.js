import api from '../api'
export const userLoggedIn = (user) => ({
    type: 'USER_LOGGED_IN',
    user
})
export const userLoggedOut = () => ({
    type: 'USER_LOGGED_OUT',
})




export const login = (credentials) => dispatch =>
    api.user.login(credentials).then(user => {
        localStorage.JWT = user.token;
        dispatch(userLoggedIn(user))
    });

export const logout = () => dispatch => {
    localStorage.removeItem('JWT');
    dispatch(userLoggedOut());
}

export const signup = (data) => dispatch =>
    api.user.signup(data).then(user => dispatch(userLoggedIn(user)));
