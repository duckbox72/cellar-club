import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import App from "./components/App";
    
const history = createBrowserHistory();
const appDiv = document.getElementById("app");


// Retrieve is_authenticated + dark_mode status + username
function getIsAuthenticatedAndRenderApp() {
    fetch("/api/is_authenticated")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const isAuthenticated = data.is_authenticated;
        const darkMode = data.dark_mode;
        const authenticatedUsername = data.username;

        ReactDOM.render(
            <React.StrictMode>     
                <Router history={history}>
                    <App 
                    isAuthenticated={isAuthenticated} 
                    username={authenticatedUsername}
                    darkMode={darkMode}
                    />    
                </Router> 
            </React.StrictMode>,
            appDiv
        );
    });
}

getIsAuthenticatedAndRenderApp();