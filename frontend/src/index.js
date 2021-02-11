import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import App from "./components/App";
import { getIsAuthenticated } from "./components/utils/getIsAuthenticated";

    
const history = createBrowserHistory();
const appDiv = document.getElementById("app");

ReactDOM.render(
    <React.StrictMode>     
        <Router history={history}>
            <App isAuthenticated={getIsAuthenticated()} />    
        </Router> 
    </React.StrictMode>,
    appDiv
);