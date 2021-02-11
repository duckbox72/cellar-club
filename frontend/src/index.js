import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import App from "./components/App";

    
const history = createBrowserHistory();
const appDiv = document.getElementById("app");

function getIsAuthenticated() {

    fetch("/api/is_authenticated")
    .then(response => response.json())
    .then(data => {
        
        const isAuthenticated = data.is_authenticated;
        return isAuthenticated
    });
}

ReactDOM.render(
    <React.StrictMode>     
        <Router history={history}>
            <App isAuthenticated={getIsAuthenticated()} />    
        </Router> 
    </React.StrictMode>,
    appDiv
);