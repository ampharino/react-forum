import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {logout} from '../../actions/auth'

const NavBar = ({username,logout}) => (
    <Menu secondary pointing>
        <Menu.Item as={Link} to='/'>Home</Menu.Item>
        <Menu.Item>{username}</Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item as={Link} to='/newthread'>New</Menu.Item>
            <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
        </Menu.Menu>

    </Menu>


);


NavBar.propTypes = {
    username:PropTypes.string.isRequired,
    logout:PropTypes.func.isRequired

};
function mapStateToProps(state){
    return{
        username:state.user.username
    }
}

export default connect(mapStateToProps,{logout})(NavBar);

