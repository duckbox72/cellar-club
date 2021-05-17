import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid  from "@material-ui/core/Grid";

import MemoriesList from './common/MemoriesList';
import Copyright from './common/Copyright';
import Navbar from "./common/Navbar";
import NavbarTransparent from "./common/NavbarTransparent";
import Searchbar from "./common/Searchbar";


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: screen.availHeight,
    },   
}));


export default function Memories(props) {
  
    const username = props.username;
    const [displayName, setDisplayName] = useState(null);

    const [memoriesList, setMemoriesList] = useState(null);
    const [memoriesListLength, setMemoriesListLength] = useState(null);

    const classes = useStyles();


    // Navbar callbacks
    const darkModeCallback = () => {
        props.parentCallback();
    }
    const signOutCallback = () => {
        props.parentSignOutCallback(false);
    }


    // Searchbar callbacks
    const DisplayNameCallback = (display_name) => {
        setDisplayName(display_name);
    }
    const MemoriesListCallback = (memories_list) => {
        setMemoriesList(memories_list);
        setMemoriesListLength(Object.keys(memories_list).length);
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
                    <Searchbar 
                    {...props} 
                    darkMode={props.darkMode}
                    parentDisplayNameCallback={DisplayNameCallback}
                    parentMemoriesListCallback={MemoriesListCallback}
                    searchLocation={'Search My Memories'}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <MemoriesList 
                    {...props} 
                    darkMode={props.darkMode}
                    displayName={displayName}
                    memoriesList={memoriesList}
                    memoriesListLength={memoriesListLength}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8} style={{margin: 8}}>
                    <Copyright />
                </Grid>
            </Grid>
        </div>
    );
}