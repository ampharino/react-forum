import React, {Component} from 'react'
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from '../misc/InlineError';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state={
            data:{
                username:'',
                password:''
            },
            loading:false,
            errors:{},
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange = (e) =>{
        this.setState({
            data:{...this.state.data,[e.target.name]: e.target.value}
        })
    }
    onSubmit = () =>{
        const errors={};
        if(!this.state.data.username){
            errors.username= "username required";
        }
        if(!this.state.data.password){
            errors.password="password required";
        }
        this.setState({
            errors:errors
        })
        if(Object.keys(errors).length === 0){
            this.setState({loading:true});
            this.props.submit(this.state.data)
                .catch(err => this.setState({
                    errors:err.response.data.errors,
                    loading:false
                }));
        }
    }


    render(){
        return(
            <Form onSubmit={this.onSubmit} loading={this.state.loading} >
                {this.state.errors.global && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{this.state.errors.global}</p>
                    </Message>
                    )}
                <Form.Field error={!!this.state.errors.username}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        placeholder="username"
                        value={this.state.data.username}
                        onChange={this.onChange}
                    />
                    {this.state.errors.username && <InlineError text={this.state.errors.username}/>}
                </Form.Field>
                <Form.Field error={!!this.state.errors.password}>
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        value={this.state.data.password}
                        onChange={this.onChange}
                    />
                    {this.state.errors.password && <InlineError text={this.state.errors.password}/>}
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        );
    }
}
export default LoginForm;