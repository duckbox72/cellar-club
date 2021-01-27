import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./components/App";

import mytheme from './mytheme';

const history = createBrowserHistory();
const appDiv = document.getElementById("app");

ReactDOM.render(
    <React.StrictMode>     
        <Router history={history}>
            <ThemeProvider theme={mytheme}>
                <App />
            </ThemeProvider>
        </Router> 
    </React.StrictMode>,
    appDiv
);
