import React, { useState, } from "react";
import { makeStyles } from "@material-ui/core/styles"

import Grid  from "@material-ui/core/Grid";

import Navbar from "./common/Navbar";
import Searchbar from "./common/Searchbar";
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
            </Grid>
        </div>
    );
}