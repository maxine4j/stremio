import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './views/Home.js';
import Header from './components/Header.js'
import './App.scss'
import {Helmet} from "react-helmet";

function App() {
    return (
        <>
        <Helmet>
            <title>Tim Ings</title>
        </Helmet>
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Home}></Route>
        </BrowserRouter>
        </>
    );
}

export default App;
