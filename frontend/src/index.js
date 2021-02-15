import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import App from "./components/App";
    
const history = createBrowserHistory();
const appDiv = document.getElementById("app");

function getIsAuthenticatedAndRenderApp() {
    fetch("/api/is_authenticated")
    .then(response => response.json())
    .then(data => {
        const isAuthenticated = data.is_authenticated;

        ReactDOM.render(
            <React.StrictMode>     
                <Router history={history}>
                    <App isAuthenticated={isAuthenticated} />    
                </Router> 
            </React.StrictMode>,
            appDiv
        );
    });
}

getIsAuthenticatedAndRenderApp();