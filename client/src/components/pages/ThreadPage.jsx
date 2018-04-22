import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Segment,Divider,Message,Button,Comment,Header} from 'semantic-ui-react';
import axios from 'axios'
import {createComment} from '../../actions/comment'
import styles from './ThreadPage.css';
import CommentForm from '../forms/CommentForm';
import Moment from 'react-moment';
import CommentDisplay from '../misc/CommentDisplay'
import ThreadDisplay from '../misc/ThreadDisplay'


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
                <CommentDisplay key={comment._id} comment={comment}/>
            )
        })
        return(
            <div>
                <Segment loading={this.state.loading}>
                    <ThreadDisplay threadData={this.state.threadData}/>
                </Segment>
                <Button active={this.state.commentBox} onClick={this.toggleComment}>Comment on this thread</Button>
                <CommentForm visible={this.state.commentBox} submit={this.submit} body=''/>
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
    username:PropTypes.string.isRequired,
    createComment:PropTypes.func.isRequired
}
function mapStateToProps(state){
    return{
        username:state.user.username
    }
}

export default connect(mapStateToProps,{createComment})(ThreadPage)