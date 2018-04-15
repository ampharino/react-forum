import React from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';


const HomePage = ({isAuthenticated, logout}) =>(
    <div>
        <h1>Home Page</h1>

        {isAuthenticated ? <button onClick={() => logout()}>Logout</button> :
            <div><Link to ="/login">Login</Link> or <Link to="/signup">Create Account</Link></div>}
    </div>
);
HomePage.propTypes = {
    isAuthenticated:PropTypes.bool.isRequired
};
function mapStateToProps(state){
    return{
        isAuthenticated:!!state.user.token
    }
}
export default connect(mapStateToProps, {logout})(HomePage);