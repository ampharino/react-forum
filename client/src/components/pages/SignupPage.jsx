import React,{Component}from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {signup} from '../../actions/auth';
import SignupForm from '../forms/SignupForm';

class SignupPage extends Component{

    constructor(props){
        super(props);
        this.submit=this.submit.bind(this);
    }

    submit = (data) =>{
        return this.props.signup(data)
            .then(() => this.props.history.push("/"));
    }
    render(){
        return(
            <div>
                <h1>Signup Page</h1>
                <SignupForm submit={this.submit}/>
            </div>
        )
    }
}
SignupPage.propTypes= {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
}

export default connect(null, {signup})(SignupPage);