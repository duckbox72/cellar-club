import React, { useEffect, useState, } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import Navbar from "./common/Navbar";
import Searchbar from "./common/Searchbar";
import WineProfile from "./common/WineProfile";
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
                    <Searchbar />
                </Grid>
                <Grid item xs={12} sm={8} md={7}>
                    <WineProfile />
                </Grid>

                <Grid item xs={12} sm={8} md={7}>
                    <Typography variant="h4"> 
                        placehoder for dashboard info
                    </Typography>
                    <Typography>
                        {userProfile.username} {userProfile.user_id}
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