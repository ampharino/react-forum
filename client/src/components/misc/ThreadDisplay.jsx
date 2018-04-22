import React,{Component} from 'react'
import {Form,Button,Message,Comment,Divider} from 'semantic-ui-react'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import InlineError from '../misc/InlineError'
import Moment from 'react-moment'
import EditForm from '../forms/EditForm'
import {editThread, deleteThread} from '../../actions/thread'

class ThreadDisplay extends Component{
    constructor(props){
        super(props)
        this.state={
            editMode:false
        }
        this.toggleEdit = this.toggleEdit.bind(this)
        this.submit = this.submit.bind(this)
        this.renderThread = this.renderThread.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.delete = this.delete.bind(this)
    }

    toggleEdit = () =>{
        this.setState({
            editMode:!this.state.editMode
        })
    }
    delete = () =>{
        return this.props.deleteThread(this.props.threadData._id)
            .then( () => this.props.history.push("/"))
    }
    submit = (data) =>{
        data.title = this.props.threadData.title
        data.author = this.props.threadData.author
        data.threadId = this.props.threadData._id
        return this.props.editThread(data)
            .then(() => window.location.reload())
    }
    renderThread = () =>{
        return(
            <div>
                <h2>{this.props.threadData.title}</h2>
                <span>created by <Link to={`/${this.props.threadData.author}`}>{this.props.threadData.author}</Link> </span> <Moment fromNow>{this.props.threadData.created}</Moment>
                <Divider horizontal></Divider>
                <Message className='messagebody'>{this.props.threadData.body}</Message>
                {this.props.username === this.props.threadData.author && <Button basic compact size ='tiny' onClick={this.toggleEdit}>Edit</Button>}
                {this.props.username === this.props.threadData.author && <Button basic compact size ='tiny' onClick={this.delete}>Delete</Button>}
            </div>
        )
    }
    renderEdit = () =>{
        return(
            <div>
                <EditForm submit={this.submit} body={this.props.threadData.body} threadId={this.props.threadData._id}/>
                {this.props.username === this.props.threadData.author && <Button basic compact size='tiny' onClick={this.toggleEdit}>Cancel</Button>}
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