import App from "./components/App";

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const appDiv = document.getElementById("app");

ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <App />
        </Router>
    </React.StrictMode>,
    appDiv
);
