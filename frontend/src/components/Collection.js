import React, { useEffect, useState, } from "react";
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


const getBottleList  = (value) => { 
    fetch(`/api/get_bottle_list/${value}`)
    .then(response => response.json())
    .then(bottle_list => {
        return bottle_list;
    });
};

const getBottleListttt = (value=value) => {
    const response = fetch(`/api/get_bottle_list/${value}`)
    const bottle_list = response.json();
    return bottle_list;
};


export default function Collection(props) {
  
    const userProfile = (getUserProfile());
    const [bottleName, setBottleName] = useState(null);
    const [bottleData, setBottleData] = useState(null);

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
    // TO BE DETERMINED callbacks (actually in Searchbar)
    const BottleListCallback = (bottle_list) => {
        setBottleList(bottle_list);
        setBottleListLength(Object.keys(bottle_list).length);
        console.log(bottle_list);
        console.log(Object.keys(bottle_list).length)
    }
    // TO BE DETERMINED callbacks (actually in Searchbar)
    const BottleDataCallback = (bottle_data) => {
        setBottleData(bottle_data);
        console.log(bottle_data);
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
                    //parentBottleDataCallback={BottleDataCallback}
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