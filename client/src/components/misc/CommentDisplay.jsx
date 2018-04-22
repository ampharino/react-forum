import React,{Component} from 'react'
import {Form,Button,Message,Comment} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import InlineError from '../misc/InlineError'
import Moment from 'react-moment'
import EditForm from '../forms/EditForm'
import {editComment, deleteComment} from '../../actions/comment'

class CommentDisplay extends Component{
    constructor(props){
        super(props)
        this.state={
            editMode:false
        }
        this.toggleEdit = this.toggleEdit.bind(this)
        this.submit = this.submit.bind(this)
        this.renderComment = this.renderComment.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.delete = this.delete.bind(this)
    }

    toggleEdit = () =>{
        this.setState({
            editMode:!this.state.editMode
        })

    }
    delete = () =>{
        this.props.deleteComment(this.props.comment._id)
            .then(()=>window.location.reload())

    }
    submit = (data) =>{
        data.thread = this.props.comment.thread
        data.author = this.props.comment.author
        data.commentId = this.props.comment._id
        return this.props.editComment(data)
            .then(() => window.location.reload())
    }
    renderComment = () =>{
        return(
        <Comment>
            <Comment.Content>
                <Comment.Author as={Link} to={`/${this.props.comment.author}`}>{this.props.comment.author}</Comment.Author>
                <Comment.Metadata><Moment fromNow>{this.props.comment.created}</Moment></Comment.Metadata>
                <Comment.Text>{this.props.comment.body}</Comment.Text>
                <Comment.Actions>
                    {this.props.username === this.props.comment.author && <Button basic compact size ='tiny' onClick={this.toggleEdit}>Edit</Button>}
                    {this.props.username === this.props.comment.author && <Button basic compact size='tiny' onClick={this.delete}>Delete</Button>}
                </Comment.Actions>
            </Comment.Content>
        </Comment>
        )
    }
    renderEdit = () =>{
        return(
            <Comment>
                <Comment.Content>
                    <Comment.Author>{this.props.comment.author}</Comment.Author>
                    <Comment.Metadata><Moment fromNow>{this.props.comment.created}</Moment></Comment.Metadata>
                    <EditForm submit={this.submit} body={this.props.comment.body} commentId={this.props.comment._id}/>
                    <Comment.Actions>
                        {this.props.username === this.props.comment.author && <Button basic compact size='tiny' onClick={this.toggleEdit}>Cancel</Button>}
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        )
    }

    render(){
        return(
            <div>
            {this.state.editMode ? this.renderEdit() : this.renderComment() }
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