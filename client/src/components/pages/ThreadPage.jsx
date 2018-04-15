import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Segment,Divider,Message,Button,Comment,Header} from 'semantic-ui-react';
import axios from 'axios'
import {createComment} from '../../actions/comment'
import styles from './ThreadPage.css';
import CommentForm from '../forms/CommentForm';
import Moment from 'react-moment';


class ThreadPage extends Component{
    constructor(props){
        super(props)
        this.state={
            threadData:[],
            loading:true,
            commentBox:false,
            comments:[]
        }
        this.submit = this.submit.bind(this);
        this.toggleComment = this.toggleComment.bind(this);
    }

    componentDidMount(){
        axios.get('/api/threads/'+ this.props.match.params.id).then(res=>{
            this.setState({
                threadData:res.data.thread,

            })
            axios.get('/api/comments/'+ this.state.threadData._id).then(res=>{
                this.setState({
                    comments:res.data.comments,
                    loading:false
                })
            })
        })
    }
    submit = (data) =>{
        data.thread = this.state.threadData._id
        console.log(data)
        return this.props.createComment(data)
            .then(() => window.location.reload());
    }
    toggleComment = () =>{
        this.setState({
            commentBox:!this.state.commentBox
        })

    }

    render(){
        let commentList = this.state.comments.map(comment=>{
            return(
                <Comment key={comment._id}>
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.author}</Comment.Author>
                        <Comment.Metadata><Moment fromNow>{comment.created}</Moment></Comment.Metadata>
                        <Comment.Text>{comment.body}</Comment.Text>
                        <Comment.Actions><a>Reply</a></Comment.Actions>
                    </Comment.Content>
                </Comment>
            )
        })
        return(
            <div>
                <Segment loading={this.state.loading}>
                    <h2>{this.state.threadData.title}</h2>
                    <span>created by {this.state.threadData.author} </span> <Moment fromNow>{this.state.threadData.created}</Moment>
                    <Divider horizontal></Divider>
                    <Message className='messagebody'>{this.state.threadData.body}</Message>
                </Segment>
                <Button active={this.state.commentBox} onClick={this.toggleComment}>Comment on this thread</Button>
                <CommentForm visible={this.state.commentBox} submit={this.submit}/>
                <Segment loading={this.state.loading}>
                    <Comment.Group>
                        <Header as='h3' dividing>Comments</Header>
                        {commentList}
                    </Comment.Group>
                </Segment>

            </div>
        )
    }

}
ThreadPage.propTypes={
    createComment:PropTypes.func.isRequired
}

export default connect(null,{createComment})(ThreadPage)