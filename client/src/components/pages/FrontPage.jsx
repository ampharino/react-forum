import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {Segment,Card} from 'semantic-ui-react';
import Moment from 'react-moment'
import axios from 'axios'

class FrontPage extends Component{
    constructor(props){
        super(props)
        this.state= {
            threads: [],
            loading:true
        }

    }
    componentDidMount(){
        axios.get('api/threads').then(res => {
            this.setState({
                threads: res.data.threads,
                loading:false
            })

            console.log(this.state.threads)
        })
    }

    render(){
        let threadList = this.state.threads.map(thread =>{
            return(
                <Card fluid centered key={thread._id} as={Link} to={`/thread/${thread._id}`}>
                    <Card.Content>
                        <Card.Header content={thread.title}/>
                        <Card.Meta>
                            <span>submitted by {thread.author}</span><Moment fromNow>{thread.created}</Moment>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        {thread.karma} points
                    </Card.Content>

                </Card>
            )
        })
        return(
            <Segment loading={this.state.loading}>
                {threadList}
            </Segment>
        )
    }

}



export default FrontPage;