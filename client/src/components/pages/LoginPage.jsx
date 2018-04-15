import React,{Component}from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../forms/LoginForm';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login} from '../../actions/auth';

class LoginPage extends Component{

    constructor(props){
        super(props);
        this.submit=this.submit.bind(this);
    }

    submit=(data)=>{
        return this.props.login(data)
            .then(() => this.props.history.push("/"));
    }
    render(){
        return(
            <div>
                <h1>Login Page</h1>
                <LoginForm submit={this.submit}/>
                <div>Don't have an account? <Link to="/signup">Sign up here</Link></div>
            </div>
        )
}
}
LoginPage.propTypes= {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
}

export default connect(null, {login})(LoginPage);