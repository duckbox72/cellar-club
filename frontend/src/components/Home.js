import React, { useState, } from "react";
import { makeStyles } from "@material-ui/core/styles"

import Grid  from "@material-ui/core/Grid";

import Dashboard from "./common/Dashboard";
import Navbar from "./common/Navbar";
import { getUserProfile } from "./utils/getUserProfile";


// THIS IS USER'S HOME DEFAULT LANDING PAGE FOR THE APP
export default function Home(props) {
    const useStyles = makeStyles({
        root: {
            height: screen.availHeight,
        },
    });

    const classes = useStyles();

    const userProfile = (getUserProfile());
    const [LwinData, setLwinData] = useState({});


    // Navbar callbacks
    const darkModeCallback = () => {
        props.parentCallback();
    }
    const sigOutCallback = () => {
        props.parentSignOutCallback(false);
    }
    

    return (
        <div className={classes.root}>
            <Navbar 
                    {...props}
                    darkMode={props.darkMode} 
                    parentCallback={darkModeCallback}
                    parentSignOutCallback={sigOutCallback}
                    userProfile={userProfile}
                    />
            <Grid container  spacing={2} justify="center"> 
                <Grid item xs={12}>
                    
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Dashboard
                    {...props} 
                    darkMode={props.darkMode}
                    userProfile={userProfile}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Dashboard
                    {...props} 
                    darkMode={props.darkMode}
                    userProfile={userProfile}
                    />
                </Grid>
                

            </Grid>
        </div>
    );
}