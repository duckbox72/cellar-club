import React, { useEffect, useState, } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import Navbar from "./common/Navbar";
import Searchbar from "./common/Searchbar";
import LwinProfileCard from "./common/LwinProfileCard";
import { getUserProfile } from "./utils/getUserProfile";


// THIS IS USER'S HOME DEFAULT LANDING PAGE FOR THE APP
export default function Home(props) {

    const userProfile = (getUserProfile());
    const [LwinData, setLwinData] = useState({});


    // Navbar callbacks
    const darkModeCallback = () => {
        props.parentCallback();
    }
    const sigOutCallback = () => {
        props.parentSignOutCallback(false);
    }

    // Searchbar callbacks
    const lwinDataCallback = (lwin_data) => {
        console.log("vv lwinDataCallback");
        console.log(lwin_data);
        setLwinData(lwin_data);

    }


    return (
        <div>
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
                <Grid item xs={12} sm={8} md={7}>
                    <Searchbar 
                    {...props} 
                    darkMode={props.darkMode}
                    parentLwinDataCallback={lwinDataCallback}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={7}>
                    <LwinProfileCard
                    {...props}
                    darkMode={props.darkMode}
                    LwinData={LwinData}
                    />
                </Grid>

                <Grid item xs={12} sm={8} md={7}>
                    <Typography>
                        {userProfile.username} {userProfile.user_id}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}