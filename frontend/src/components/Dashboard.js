import React, { useEffect, useState, } from "react";
import { Button, Grid, Typography } from "@material-ui/core";


// THIS IS USER'S HOME DEFAULT LANDING PAGE FOR THE APP
export default function Dashboard(props) {
    const [userProfile, setUserProfile] = useState([])
    
    useEffect(() => {
        fetch('/api/user_profile')
        .then(response => response.json())
        .then(data => {
            setUserProfile(data.user_profile)
        });
    }, []);


    return (
        <Grid container direction="column">
            <Grid item xs={12}>
                <Typography variant="h3">
                    This Home Page!
                </Typography>
                <Typography variant="h6">
                    {userProfile}
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
    );
}