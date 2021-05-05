import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid  from "@material-ui/core/Grid";

import BottleList from './common/BottleList';
import Copyright from './common/Copyright';
import Navbar from "./common/Navbar";
import NavbarTransparent from "./common/NavbarTransparent";
import Searchbar from "./common/Searchbar";

import { getUserProfile } from "./utils/getUserProfile";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: screen.availHeight,
    },   
}));


export default function Collection(props) {
  
    const userProfile = (getUserProfile());
    const [bottleName, setBottleName] = useState(null);

    const [bottleList, setBottleList] = useState(null);
    const [bottleListLength, setBottleListLength] = useState(null);

    const classes = useStyles();


    // Navbar callbacks
    const darkModeCallback = () => {
        props.parentCallback();
    }
    const signOutCallback = () => {
        props.parentSignOutCallback(false);
    }


    // Searchbar callbacks
    const BottleNameCallback = (bottle_name) => {
        setBottleName(bottle_name);
        console.log(bottle_name);
    }
    const BottleListCallback = (bottle_list) => {
        setBottleList(bottle_list);
        setBottleListLength(Object.keys(bottle_list).length);
        console.log(bottle_list);
        console.log(Object.keys(bottle_list).length)
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
                    <Searchbar 
                    {...props} 
                    darkMode={props.darkMode}
                    parentBottleNameCallback={BottleNameCallback}
                    parentBottleListCallback={BottleListCallback}
                    searchLocation={'Search My Collection'}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <BottleList 
                    {...props} 
                    darkMode={props.darkMode}
                    bottleName={bottleName}
                    bottleList={bottleList}
                    bottleListLength={bottleListLength}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8} style={{margin: 8}}>
                    <Copyright />
                </Grid>
            </Grid>
        </div>
    );
}