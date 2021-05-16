import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import App from "./components/App";
    
const history = createBrowserHistory();
const appDiv = document.getElementById("app");


// Retrieve is_authenticated and dark_mode statuses
function getIsAuthenticatedAndRenderApp() {
    fetch("/api/is_authenticated")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const isAuthenticated = data.is_authenticated;
        const darkMode = data.dark_mode;

        ReactDOM.render(
            <React.StrictMode>     
                <Router history={history}>
                    <App 
                    isAuthenticated={isAuthenticated} 
                    darkMode={darkMode}
                    />    
                </Router> 
            </React.StrictMode>,
            appDiv
        );
    });
}

getIsAuthenticatedAndRenderApp();