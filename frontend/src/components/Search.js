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
    const [LwinData, setLwinData] = useState({});
    const [gwsScores, setGwsScores] = useState({});

    const getGwsData = async (lwin=lwin) => {
        const response = await fetch(`/api/get_gws_data/${lwin}`);
        const json = await response.json();
        //json.forEach(element => {
        //    console.log(element.vintage, element.score);
        //});
        console.log(json)
        const gws  = json['2001']
        console.log(gws);

    }

    // Navbar callbacks
    const darkModeCallback = () => {
        props.parentCallback();
    }
    const sigOutCallback = () => {
        props.parentSignOutCallback(false);
    }


    // Searchbar callbacks
    const lwinDataCallback = (lwin_data) => {
        setLwinData(lwin_data);
        
    }
    
    useEffect(() => {
        if (LwinData.lwin !== undefined) {
            getGwsData(LwinData.lwin);
        }
    })
    
    return (
        <div className={classes.root}>
            <Grid container  spacing={2} justify="center"> 
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
                    userProfile={userProfile}

                    />
                </Grid>
            </Grid>
        </div>
    );
}