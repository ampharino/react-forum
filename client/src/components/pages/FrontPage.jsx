import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {Segment,Card,Dropdown} from 'semantic-ui-react';
import Moment from 'react-moment'
import axios from 'axios'

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
        text:'Title',
        value:'Title'
    },
    {
        text:'Points',
        value:'Points'
    }

]
const compareTitle = (a,b)=>{
    let x = a.title.toLowerCase()
    let y = b.title.toLowerCase()
    return x < y ? -1: x > y ? 1:0
}

const compareKarma = (a,b)=>{
    return a.karma-b.karma
}

class FrontPage extends Component{
    constructor(props){
        super(props)
        this.state= {
            threads: [],
            loading:true,
            sortby:'Points',
            ascending:false
        }
        this.sortChange = this.sortChange.bind(this)
        this.orderChange = this.orderChange.bind(this)

    }
    componentDidMount(){
        axios.get('api/threads').then(res => {
            this.setState({
                threads: res.data.threads,
                loading:false
            })

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
        let temp = this.state.threads.slice()
        if(this.state.sortby === 'Title'){
            temp.sort(compareTitle)
        }
        if(this.state.sortby === 'Points'){
            temp.sort(compareKarma)
        }
        if(this.state.sortby === 'Date'){
            temp = this.state.threads.slice()
        }
        if(!this.state.ascending){
            temp.reverse()
        }
        let threadList = temp.map(thread =>{
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
                <Dropdown defaultValue={'Points'} selection options={sortOptions} onChange={this.sortChange}/>
                <Dropdown defaultValue={false} selection options={orderOptionss} onChange={this.orderChange}/>
                {threadList}
            </Segment>
        )
    }

}



export default FrontPage;