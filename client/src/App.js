import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import {getCookie, setCookie, randomStringValue, deleteCookie} from "./utils/cookieUtil";
import { SHOPPING_SESSION } from "./constants";
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import './App.css';

class App extends Component {

    componentDidMount() {
    }

    render() {
    return (
        <Router>
          <>
              <Header/>
              <Home/>
          </>
        </Router>
    );
  }
}

export default App;
