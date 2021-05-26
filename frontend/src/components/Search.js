import React, { useEffect, useState, } from "react";
import { makeStyles } from "@material-ui/core/styles";

import clsx from 'clsx';

import Grid  from "@material-ui/core/Grid";

import SearchDashboard from "./common/SearchDashboard";
import Copyright from './common/Copyright';
import LwinProfileCard from "./common/LwinProfileCard";
import Navbar from "./common/Navbar";
import NavbarTransparent from "./common/NavbarTransparent";
import Searchbar from "./common/Searchbar";


const useStyles = makeStyles((theme) => ({
    root: {
        //minHeight: screen.availHeight,
    },
    lwin_profile_card: {
        display: 'none',
        opacity: 0,
        transition: theme.transitions.create('opacity', 'display', {
            duration: theme.transitions.long,
        }),
    },
    lwin_profile_card_open: {  
        display: 'block',
        opacity: 1,
    },
    dashboard: {
        display: mystyleprops => mystyleprops.displaySchema,
    },
}));


export default function Search(props) {

    const username = props.username;
    const [LwinData, setLwinData] = useState(null);
    const [gwsScores, setGwsScores] = useState(null);

    const [lwinProfileCardOpened, setLwinProfileCardOpened] = useState(false);
    const [formExpanded, setFormExpanded] = useState(false);

    const [dashboardStats, setDashbosardStats] = useState(null);

    const mystyleprops = {
        displaySchema: lwinProfileCardOpened ? 'none' : 'block', 
    }
    const classes = useStyles(mystyleprops);


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


    // dashboardStats auto loaded on rendering
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
                    <Searchbar 
                    {...props} 
                    darkMode={props.darkMode}
                    parentLwinDataCallback={lwinDataCallback}
                    searchLocation={'Search Wines'}
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
                    parentFormExpandedCallback={formExpandedCallback}
                    />     
                </Grid> 
                <Grid item xs={12} sm={10} md={8}
                className={classes.dashboard}
                >
                    <SearchDashboard 
                    {...props}
                    darkMode={props.darkMode}
                    username={username}
                    dashboardStats={dashboardStats}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Copyright />
                </Grid>
            </Grid>
        </div>
    );
}