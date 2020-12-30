import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

import ContactPage from "./ContactPage";
import ProfilePage from "./ProfilePage"; 

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'><p>This is the HomePage</p></Route>
                    <Route path='/profile' component={ProfilePage} />
                    <Route path='/contact' component={ContactPage} />
                </Switch>
            </Router>
        );
    }
}