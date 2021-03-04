import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles"

import Navbar from "./common/Navbar";
import Searchbar from "./common/Searchbar";
import LwinProfileCard from "./common/LwinProfileCard";
import { getUserProfile } from "./utils/getUserProfile";


// THIS IS USER'S HOME DEFAULT LANDING PAGE FOR THE APP
export default function Wines(props) {
    const useStyles = makeStyles({
        root: {
            height: screen.availHeight,
        },
    });

    const location = useLocation();
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

    // Searchbar callbacks
    const lwinDataCallback = (lwin_data) => {
        console.log("vv lwinDataCallback");
        console.log(lwin_data);
        setLwinData(lwin_data);

    }


    return (
        <div className={classes.root}>
            <Grid container  spacing={3} justify="center"> 
                <Grid item xs={12}>
                    <Navbar 
                    {...props}
                    darkMode={props.darkMode} 
                    parentCallback={darkModeCallback}
                    parentSignOutCallback={sigOutCallback}
                    userProfile={userProfile}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Searchbar 
                    {...props} 
                    darkMode={props.darkMode}
                    parentLwinDataCallback={lwinDataCallback}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <LwinProfileCard
                    {...props}
                    darkMode={props.darkMode}
                    LwinData={LwinData}
                    />
                </Grid>
            </Grid>
        </div>
    );
}