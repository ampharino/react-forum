import React,{Component} from 'react'
import {Form,Button,Message,Comment,Icon,Label} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import InlineError from '../misc/InlineError'
import Moment from 'react-moment'
import EditForm from '../forms/EditForm'
import {editComment, deleteComment} from '../../actions/comment'
import axios from 'axios'

class CommentDisplay extends Component{
    constructor(props){
        super(props)
        this.state={
            editMode:false,
            visible:true,
            positive:this.props.comment.upvoted.indexOf(this.props.username) >= 0,
            negative:this.props.comment.downvoted.indexOf(this.props.username) >= 0,
            comment:this.props.comment
        }
        this.toggleEdit = this.toggleEdit.bind(this)
        this.submit = this.submit.bind(this)
        this.renderComment = this.renderComment.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.delete = this.delete.bind(this)
        this.upvote = this.upvote.bind(this)
        this.downvote = this.downvote.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.comment !== this.state.comment){
            this.setState({
                comment:nextProps.comment
            })
        }
    }

    upvote = () =>{
        let vote = 1
        if(this.state.positive){
            vote = -1
        }
        axios.put(`/api/comments/karma/${this.state.comment._id}`,{vote:vote,user:this.props.username,type:'upvote'})
            .then(res=>{
                this.setState({
                    comment:res.data.comment,
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
        axios.put(`/api/comments/karma/${this.state.comment._id}`,{vote:vote,user:this.props.username,type:'downvote'})
            .then(res=>{
                this.setState({
                    comment:res.data.comment,
                    negative:!this.state.negative,
                    positive:false

                })
            })
    }

    toggleEdit = () =>{
        this.setState({
            editMode:!this.state.editMode
        })

    }
    delete = () =>{
        this.props.deleteComment(this.state.comment._id)
            .then(()=>{
                this.setState({
                    visible:false
                })
            })
    }
    submit = (data) =>{
        data.thread = this.state.comment.thread
        data.author = this.state.comment.author
        data.commentId = this.state.comment._id
        return this.props.editComment(data)
            .then((res) => {
                this.setState({
                    comment:res.comment,
                    editMode:false
                })
            })
    }
    renderComment = () =>{
        return(
        <Comment>
                    
            <Comment.Content>

                <Comment.Author as={Link} to={`/users/${this.state.comment.author}`}>{this.state.comment.author}</Comment.Author>
                <Comment.Metadata><Moment fromNow>{this.state.comment.created}</Moment></Comment.Metadata>
                <Comment.Text>{this.state.comment.body}</Comment.Text>
                <Comment.Actions>
                    {this.props.username === this.state.comment.author && <Button basic compact size ='tiny' onClick={this.toggleEdit}>Edit</Button>}
                    {this.props.username === this.state.comment.author && <Button basic compact size='tiny' onClick={this.delete}>Delete</Button>}
                    <Button compact size='mini' positive={this.state.positive} onClick={this.upvote} icon>
                        <Icon name='arrow up'/>
                    </Button>
                    <Label>
                        {this.state.comment.karma}
                    </Label>
                    <Button compact size='mini' negative={this.state.negative} onClick={this.downvote} icon>
                        <Icon name='arrow down'/>
                    </Button>
                </Comment.Actions>
            </Comment.Content>
        </Comment>
        )
    }
    renderEdit = () =>{
        return(
            <Comment>
                <Comment.Content>
                    <Comment.Author>{this.state.comment.author}</Comment.Author>
                    <Comment.Metadata><Moment fromNow>{this.state.comment.created}</Moment></Comment.Metadata>
                    <EditForm submit={this.submit} body={this.state.comment.body} commentId={this.state.comment._id}/>
                    <Comment.Actions>
                        {this.props.username === this.state.comment.author && <Button basic compact size='tiny' onClick={this.toggleEdit}>Cancel</Button>}
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        )
    }

    render(){
        return(
            this.state.visible &&
            <div>
            {this.state.editMode ? this.renderEdit() : this.renderComment()}
            </div>
        )

    }


}
CommentDisplay.propTypes={
    username:PropTypes.string.isRequired,
    editComment:PropTypes.func.isRequired,
    deleteComment:PropTypes.func.isRequired,

}
function  mapStateToProps(state){
    return{
        username:state.user.username
    }
}

export default connect(mapStateToProps, {editComment,deleteComment})(CommentDisplay)