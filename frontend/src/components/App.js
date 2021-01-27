import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import ContactPage from "./ContactPage"; 
import CollectionPage from "./CollectionPage";
import Dashboard from "./Dashboard";

export default function App() {

        return (
            <Switch>
                <Route exact path='/' render={props => <HomePage {...props} />} />
                <Route path='/contact' component={ContactPage} />
                <Route path='/collection' component={CollectionPage} />
                <Route path='/dashboard' render={props => <Dashboard {...props} />} />
            </Switch>
        );
}
