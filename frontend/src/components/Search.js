import React, { useEffect, useState, } from "react";
import { makeStyles } from "@material-ui/core/styles";

import clsx from 'clsx';

import Grid  from "@material-ui/core/Grid";

import CCLogo from "./common/CCLogo";
import Copyright from './common/Copyright';
import LwinProfileCard from "./common/LwinProfileCard";
import Navbar from "./common/Navbar";
import NavbarTransparent from "./common/NavbarTransparent";
import Searchbar from "./common/Searchbar";

import { getUserProfile } from "./utils/getUserProfile";


const useStyles = makeStyles((theme) => ({
    root: {
        //minHeight: screen.availHeight,
    },
    lwin_profile_card: {
        visibility: 'hidden',
        opacity: 0,
        transition: theme.transitions.create('opacity', 'visibility', {
            duration: theme.transitions.long,
        }),
    },
    lwin_profile_card_open: {   
        visibility: 'visible',
        opacity: 1,
    },
    cc_logo: {
        display: LwinData !== null  ? 'none' : 'block', 
    },
    // Fills gap behind fixed navbar
    navbar_filler: {
        height: theme.spacing(8),
        [theme.breakpoints.down("sm")]: {
            height: theme.spacing(7)},
    },
}));

export default function Search(props) {
    const classes = useStyles();

    const userProfile = (getUserProfile());
    const [LwinData, setLwinData] = useState(null);
    const [gwsScores, setGwsScores] = useState(null);

    const getGwsScores = async (lwin=lwin) => {
        const response = await fetch(`/api/get_gws_data/${lwin}`);
        const json = await response.json();
        setGwsScores(json);
    }
    
    const [lwinProfileCardOpened, setLwinProfileCardOpened] = useState(false);
    const [formExpanded, setFormExpanded] = useState(false);
    

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
            setLwinProfileCardOpened(true);
            if (lwin_data.lwin !== undefined) {
                getGwsScores(lwin_data.lwin);
            } else {
                setLwinProfileCardOpened(false)
            }
        } 
        else {
            setLwinProfileCardOpened(false)
        }
    }

    // LwinProfileCard Callback
    const formExpandedCallback = (expanded) => {
        setFormExpanded(expanded);
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
                    parentLwinDataCallback={lwinDataCallback}
                    searchLocation={'Search CellarClub'}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8}
                className={clsx(classes.lwin_profile_card, {
                    [classes.lwin_profile_card_open]: lwinProfileCardOpened,
                })}
                >               
                    <LwinProfileCard
                    {...props}            
                    darkMode={props.darkMode}
                    LwinData={LwinData}
                    gwsScores={gwsScores}
                    userProfile={userProfile}
                    parentFormExpandedCallback={formExpandedCallback}
                    />     
                </Grid> 
                <Grid item xs={12} sm={10} md={8}
                className={classes.cc_logo}
                >
                    <CCLogo 
                    {...props}
                    darkMode={props.darkMode}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8} style={{margin: 24}}>
                    <Copyright />
                </Grid>
            </Grid>
        </div>
    );
}