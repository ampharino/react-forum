import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Segment,Divider,Message,Button,Comment,Header,Dropdown} from 'semantic-ui-react';
import axios from 'axios'
import {createComment} from '../../actions/comment'
import styles from './ThreadPage.css';
import CommentForm from '../forms/CommentForm';
import Moment from 'react-moment';
import CommentDisplay from '../misc/CommentDisplay'
import ThreadDisplay from '../misc/ThreadDisplay'

const orderOptionss = [
    {
        text:'Ascending',
        value:true
    },
    {
        text:'Descending',
        value:false
    }
]
const sortOptions =[
    {
        text:'Date',
        value:'Date',
    },
    {
        text:'Points',
        value:'Points'
    }

]
const compareKarma = (a,b)=>{
    return a.karma-b.karma
}

class ThreadPage extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:true,
            commentBox:false,
            comments:[],
            sortby:'Points',
            ascending:false
        }
        this.submit = this.submit.bind(this);
        this.toggleComment = this.toggleComment.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.orderChange = this.orderChange.bind(this);
    }

    componentDidMount(){
        axios.get('/api/comments/'+ this.props.match.params.id).then(res=>{
            this.setState({
                comments:res.data.comments,
                loading:false
            })
        })
    }
    submit = (data) =>{
        data.thread = this.props.match.params.id
        return this.props.createComment(data)
            .then(() => {
                axios.get('/api/comments/'+ this.props.match.params.id).then(res=>{
                    this.setState({
                        comments:res.data.comments,
                        loading:false,
                        commentBox:false
                    })
                })
            })
    }
    toggleComment = () =>{
        this.setState({
            commentBox:!this.state.commentBox
        })

    }

    sortChange(e,data){
        this.setState({
            sortby:data['value']
        })
    }
    orderChange(e,data){
        this.setState({
            ascending:data['value']
        })
    }

    render(){
        let temp = this.state.comments.slice()
        if(this.state.sortby === 'Points'){
            temp.sort(compareKarma)
        }
        if(this.state.sortby === 'Date'){
            temp = this.state.comments.slice()
        }
        if(!this.state.ascending){
            temp.reverse()
        }

        let commentList = temp.map(comment=>{
            return(
                <CommentDisplay key={comment._id} comment={comment}/>
            )
        })
        return(
            <div>
                <Segment loading={this.state.loading}>
                    <ThreadDisplay threadid={this.props.match.params.id}/>
                </Segment>
                <Button active={this.state.commentBox} onClick={this.toggleComment}>Comment on this thread</Button>
                <CommentForm visible={this.state.commentBox} submit={this.submit} body=''/>
                <Segment loading={this.state.loading}>
                    <Dropdown defaultValue='Points' selection options={sortOptions} onChange={this.sortChange}/>
                    <Dropdown defaultValue={false} selection options={orderOptionss} onChange={this.orderChange}/>
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