import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage"
import FrontPage from "./components/FrontPage"
import UserRoute from "./components/UserRoute"
import GuestRoute from "./components/GuestRoute"
import PropTypes from 'prop-types';
import SignupPage from "./components/SignupPage";

const App =({location}) => (
    <div className="ui container">
        <Route location={location} path="/" exact component={HomePage}/>
        <GuestRoute location={location} path="/login" exact component={LoginPage}/>
        <GuestRoute location={location} path="/signup" exact component={SignupPage}/>
        <UserRoute location={location} path="/all" exact component={FrontPage}/>
    </div>
);

App.propTypes ={
    location:PropTypes.shape({
        pathname:PropTypes.string.isRequired
    }).isRequired
}

export default App;
