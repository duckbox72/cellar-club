import React, { useEffect, useState, } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import Navbar from "./common/Navbar";
import Searchbar from "./common/Searchbar";
import { getUserProfile } from "./utils/getUserProfile";


// THIS IS USER'S HOME DEFAULT LANDING PAGE FOR THE APP
export default function Home(props) {

    const userProfile = (getUserProfile());

    const darkModeCallback = () => {
        props.parentCallback();
    }

    const sigOutCallback = () => {
        props.parentSignOutCallback(false);
    }

    return (
        <div>
            
            <Grid container direction="column">
            <Navbar 
            {...props}
            darkMode={props.darkMode} 
            parentCallback={darkModeCallback}
            parentSignOutCallback={sigOutCallback}
            userProfile={userProfile}
            />
                    
                    <Searchbar />
                <Grid item xs={12}>
                    <Typography variant="h3"> 
                        This Home Page dashboard!
                    </Typography>
                    <Typography>
                        {userProfile.username} {userProfile.date_joined}
                    </Typography>
                    <Button variant="contained" color="primary">
                        My Button
                    </Button>
                    <Button variant="contained" color="secondary">
                        My Button
                    </Button>
                    <Button variant="contained" color="default">
                        My Button
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}