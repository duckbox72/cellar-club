import React, { useEffect, useState, } from "react";
import { makeStyles } from "@material-ui/core/styles"

import Grid  from "@material-ui/core/Grid";

import Copyright from './common/Copyright';
import Dashboard from "./common/Dashboard";
import Navbar from "./common/Navbar";
import NavbarTransparent from "./common/NavbarTransparent";
//import { getUserProfile } from "./utils/getUserProfile";


const useStyles = makeStyles({
    root: {
        //height: screen.availHeight,
    },
});

// THIS IS USER'S HOME DEFAULT LANDING PAGE FOR THE APP
export default function Home(props) {
    const classes = useStyles();

    //const userProfile = (getUserProfile());
    const username = props.username
    const [LwinData, setLwinData] = useState({});
    const [dashboardStats, setDashbosardStats] = useState(null);


    // Navbar callbacks
    const darkModeCallback = () => {
        props.parentCallback();
    }
    const signOutCallback = () => {
        props.parentSignOutCallback(false);
    }

    const getDashboardStats = () => {
        fetch('/api/dashboard_stats')
        .then(response => response.json())
        .then(data => {
            setDashbosardStats(data)
        });
    };

    useEffect(() => {
        if (dashboardStats === null)
            getDashboardStats();
    })
    


    return (
        <div className={classes.root}>
            <Grid container  spacing={2} justify="center"> 
                <Grid item xs={12}>
                    <Navbar 
                    {...props}
                    darkMode={props.darkMode} 
                    parentCallback={darkModeCallback}
                    parentSignOutCallback={signOutCallback}
                    username={username}
                    />
                </Grid>
                <Grid item xs={12}>
                    <NavbarTransparent />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Dashboard
                    {...props} 
                    darkMode={props.darkMode}
                    username={username}
                    dashboardStats={dashboardStats}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8} style={{margin: 8}}>
                    <Copyright />
                </Grid>
            </Grid>
        </div>
    );
}