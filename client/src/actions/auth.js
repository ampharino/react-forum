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
        localStorage.Username = user.username;
        dispatch(userLoggedIn(user))
    });

export const logout = () => dispatch => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('Username');
    dispatch(userLoggedOut());
}

export const signup = (data) => dispatch =>
    api.user.signup(data).then(user => dispatch(userLoggedIn(user)));
