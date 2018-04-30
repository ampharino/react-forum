import React,{Component} from 'react'
import {Form,Button,Message,Comment,Divider,Icon,Label} from 'semantic-ui-react'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import InlineError from '../misc/InlineError'
import Moment from 'react-moment'
import EditForm from '../forms/EditForm'
import {editThread, deleteThread} from '../../actions/thread'
import styles from './ThreadDisplay.css'
import axios from 'axios'

class ThreadDisplay extends Component{
    constructor(props){
        super(props)
        this.state={
            editMode:false,
            threadData:{},
            positive:false,
            negative:false
        }
        this.toggleEdit = this.toggleEdit.bind(this)
        this.submit = this.submit.bind(this)
        this.renderThread = this.renderThread.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.delete = this.delete.bind(this)
        this.upvote = this.upvote.bind(this)
        this.downvote = this.downvote.bind(this)
    }

    componentDidMount(){
        axios.get(`/api/threads/${this.props.threadid}`).then(res=>{
            this.setState({
                threadData:res.data.thread,
                positive:res.data.thread.upvoted.indexOf(this.props.username) >= 0,
                negative:res.data.thread.downvoted.indexOf(this.props.username) >= 0,
            })
        })
    }
    upvote = () =>{
        let vote = 1;
        if(this.state.positive){
            vote = -1
        }
        axios.put(`/api/threads/karma/${this.state.threadData._id}`,{vote:vote,user:this.props.username,type:'upvote'})
            .then(res=>{
                this.setState({
                    threadData:res.data.thread,
                    positive:!this.state.positive,
                    negative:false

                })
            })
    }
    downvote = () =>{
        let vote = -1
        if(this.state.negative){
            vote = 1
        }
        axios.put(`/api/threads/karma/${this.state.threadData._id}`,{vote:vote,user:this.props.username,type:'downvote'})
            .then(res=>{
                this.setState({
                    threadData:res.data.thread,
                    positive:false,
                    negative:!this.state.negative

                })
            })
    }
    toggleEdit = () =>{
        this.setState({
            editMode:!this.state.editMode
        })
    }
    delete = () =>{
        return this.props.deleteThread(this.state.threadData._id)
            .then( () => this.props.history.push("/"))
    }
    submit = (data) =>{
        data.title = this.state.threadData.title
        data.author = this.state.threadData.author
        data.threadId = this.state.threadData._id
        return this.props.editThread(data)
            .then((res) => {
                this.setState({
                    threadData:res.thread,
                    editMode:false
                })
            })
    }
    renderThread = () =>{
        return(
            <div className='threadContainer'>
                <div className='leftDiv'>
                    <Button compact size='mini' positive={this.state.positive} onClick={this.upvote} icon>
                        <Icon name='arrow up'/>
                    </Button>
                    <Label>
                        {this.state.threadData.karma}
                    </Label>
                    <Button compact size='mini' negative={this.state.negative} onClick={this.downvote} icon>
                        <Icon name='arrow down'/>
                    </Button>
                </div>
                <div className='rightDiv'>
                    <h2>{this.state.threadData.title}</h2>
                    <span>created by <Link to={`/users/${this.state.threadData.author}`}>{this.state.threadData.author}</Link> </span> <Moment fromNow>{this.state.threadData.created}</Moment>
                    <Divider horizontal></Divider>
                    <Message className='messagebody'>{this.state.threadData.body}</Message>
                    {this.props.username === this.state.threadData.author && <Button basic compact size ='tiny' onClick={this.toggleEdit}>Edit</Button>}
                    {this.props.username === this.state.threadData.author && <Button basic compact size ='tiny' onClick={this.delete}>Delete</Button>}
                </div>
            </div>
        )
    }
    renderEdit = () =>{
        return(
            <div>
                <EditForm submit={this.submit} body={this.state.threadData.body} threadId={this.state.threadData._id}/>
                {this.props.username === this.state.threadData.author && <Button basic compact size='tiny' onClick={this.toggleEdit}>Cancel</Button>}
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.state.editMode ? this.renderEdit() : this.renderThread() }
            </div>
        )

    }


}
ThreadDisplay.propTypes={
    username:PropTypes.string.isRequired,
    editThread:PropTypes.func.isRequired,
    deleteThread:PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,

}
function  mapStateToProps(state){
    return{
        username:state.user.username
    }
}

export default withRouter(connect(mapStateToProps, {editThread,deleteThread})(ThreadDisplay))