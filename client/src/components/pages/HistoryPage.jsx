import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {Segment,Card,Comment,Tab,List} from 'semantic-ui-react';
import Moment from 'react-moment'
import axios from 'axios'

class HistoryPage extends Component{
    constructor(props){
        super(props)
        this.state= {
            threads: [],
            comments:[],
            loading:true
        }

    }
    componentDidMount(){
        console.log(this.props.match.params.username);
        axios.get(`/api/users/${this.props.match.params.username}`).then(res => {
            this.setState({
                threads: res.data.threads,
                comments:res.data.comments,
                loading:false
            })
        })
    }

    render(){
       let commentTab = this.state.comments.map(comment=>{
           return(
               <Comment key={comment._id}>
                   <Comment.Content>
                       <Comment.Author as='a'>{comment.author}</Comment.Author>
                       <Comment.Metadata><Moment fromNow>{comment.created}</Moment></Comment.Metadata>
                       <Comment.Text>{comment.body}</Comment.Text>
                       <Comment.Actions>
                       </Comment.Actions>
                   </Comment.Content>
               </Comment>
           )
       });
       let threadsTab = this.state.threads.map(thread=>{
           return(
               <List.Item as={Link} to={`/thread/${thread._id}`} key={thread._id}>
                   <List.Content>
                        <List.Header as='a'>{thread.title}</List.Header>
                       <List.Description><span>submitted by {thread.author} </span><Moment fromNow>{thread.created}</Moment></List.Description>
                   </List.Content>
               </List.Item>
           )
       })
        let panes = [
            {menuItem: 'Threads', render:() => <Tab.Pane attached={false}><List>{threadsTab}</List></Tab.Pane>},
            {menuItem: 'Comments', render:() => <Tab.Pane attached={false}><Comment.Group>{commentTab}</Comment.Group></Tab.Pane>}
        ]
        return(
                <Segment loading={this.state.loading}>
                    <Tab menu={{secondary:true,pointing:true}} panes={panes}/>
                </Segment>

        )
    }

}



export default HistoryPage;