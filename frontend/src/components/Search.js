import React, { useEffect, useState, } from "react";
import { makeStyles } from "@material-ui/core/styles"

import Grid  from "@material-ui/core/Grid";

import Navbar from "./common/Navbar";
import Searchbar from "./common/Searchbar";
import LwinProfileCard from "./common/LwinProfileCard";
import { getUserProfile } from "./utils/getUserProfile";


// THIS IS USER'S HOME DEFAULT LANDING PAGE FOR THE APP
export default function Search(props) {
    const useStyles = makeStyles({
        root: {
            //minHeight: screen.availHeight,
        },
    });

    const classes = useStyles();

    const userProfile = (getUserProfile());
    const [LwinData, setLwinData] = useState(null);
    const [gwsScores, setGwsScores] = useState(null);

    const getGwsScores = async (lwin=lwin) => {
        const response = await fetch(`/api/get_gws_data/${lwin}`);
        const json = await response.json();
        setGwsScores(json);
    }


    // Navbar callbacks
    const darkModeCallback = () => {
        props.parentCallback();
    }
    const signOutCallback = () => {
        props.parentSignOutCallback(false);
    }


    // Searchbar callbacks
    const lwinDataCallback = (lwin_data) => {
        setLwinData(lwin_data);
        if (lwin_data !== null) {
            getGwsScores(lwin_data.lwin)
        }  
    }
    
    
    return (
        <div className={classes.root}>
            <Grid container  spacing={2} justify="center"> 
                <Grid item xs={12}>
                    <Navbar 
                    {...props}
                    darkMode={props.darkMode} 
                    parentCallback={darkModeCallback}
                    parentSignOutCallback={signOutCallback}
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
                    gwsScores={gwsScores}
                    userProfile={userProfile}
                    
                    />
                </Grid>
            </Grid>
        </div>
    );
}