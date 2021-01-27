import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import ContactPage from "./ContactPage"; 
import CollectionPage from "./CollectionPage";

export default function App() {

        return (
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/contact' component={ContactPage} />
                <Route path='/collection' component={CollectionPage} />
            </Switch>
        );
}
