import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage"
import FrontPage from "./components/pages/FrontPage"
import UserRoute from "./components/pageroutes/UserRoute"
import GuestRoute from "./components/pageroutes/GuestRoute"

import SignupPage from "./components/pages/SignupPage";
import NavBar from './components/misc/Navigation';
import NewThreadPage from './components/pages/NewThreadPage';
import ThreadPage from './components/pages/ThreadPage';

const App =({location,isAuthenticated}) => (
    <div className="ui container">
        {isAuthenticated && <NavBar/>}
        <UserRoute location={location} path="/" exact component={FrontPage}/>
        <GuestRoute location={location} path="/login" exact component={LoginPage}/>
        <GuestRoute location={location} path="/signup" exact component={SignupPage}/>
        <UserRoute location={location} path="/newthread" exact component={NewThreadPage}/>
        <UserRoute location={location} path="/thread/:id" exact component={ThreadPage}/>

    </div>
);

App.propTypes ={
    location:PropTypes.shape({
        pathname:PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated:PropTypes.bool.isRequired
}
function mapStateToProps(state){
    return{
        isAuthenticated: !!state.user.token
    }

}
export default connect(mapStateToProps)(App);
