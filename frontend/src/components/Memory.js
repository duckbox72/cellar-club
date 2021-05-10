import React, { useEffect, useState, } from "react";

import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Grid  from "@material-ui/core/Grid";

import MemoryCard from './common/MemoryCard';
import Copyright from './common/Copyright';
import Navbar from "./common/Navbar";
import NavbarTransparent from "./common/NavbarTransparent";

import { getUserProfile } from "./utils/getUserProfile";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: screen.availHeight,
    },   
}));


export default function Memory(props) {
  
    const userProfile = (getUserProfile());

    const location = useLocation();
    const memory = location.state.memory;

    const classes = useStyles();


    // Navbar callbacks
    const darkModeCallback = () => {
        props.parentCallback();
    }
    const signOutCallback = () => {
        props.parentSignOutCallback(false);
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
                <Grid item xs={12}>
                    <NavbarTransparent />
                </Grid>           
            
                <Grid item xs={12} sm={10} md={8}>
                    <MemoryCard
                    {...props}
                    userProfile={userProfile} 
                    darkMode={props.darkMode}
                    memory={memory}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8} style={{margin: 8}}>
                    <Copyright />
                </Grid>
            </Grid>
        </div>
    );
}