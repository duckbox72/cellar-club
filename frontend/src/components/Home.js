import React, { useEffect, useState, } from "react";
import { Button, Grid, Typography } from "@material-ui/core";

import Navbar from "./common/Navbar";
import getUserProfile from "./utils/getUserProfile";

// THIS IS USER'S HOME DEFAULT LANDING PAGE FOR THE APP
export default function Home(props) {
    const userProfile = (getUserProfile());

    function darkModeCallback() {
        props.parentCallback();
    }

    return (
        <>
        <Navbar 
        darkMode={props.darkMode} 
        parentCallback={darkModeCallback}
        userProfile={userProfile}
        />
        <Grid container direction="column">
            <Grid item xs={12}>
                <Typography variant="h3">
                    This Home Page!
                </Typography>
                <Typography>
                    {userProfile.username}
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
        </>
    );
}