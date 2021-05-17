import React, { useEffect, useState, } from "react";

import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Grid  from "@material-ui/core/Grid";

import BottleCard from './common/BottleCard';
import Copyright from './common/Copyright';
import Navbar from "./common/Navbar";
import NavbarTransparent from "./common/NavbarTransparent";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: screen.availHeight,
    },   
}));


export default function Bottle(props) {
  
    const username = props.username;

    const location = useLocation();
    const bottle = location.state.bottle;

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
                    username={username}
                    />
                </Grid>
                <Grid item xs={12}>
                    <NavbarTransparent />
                </Grid>           
            
                <Grid item xs={12} sm={10} md={8}>
                    <BottleCard
                    {...props} 
                    darkMode={props.darkMode}
                    bottle={bottle}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8} style={{margin: 8}}>
                    <Copyright />
                </Grid>
            </Grid>
        </div>
    );
}