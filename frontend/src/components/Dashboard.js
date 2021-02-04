import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";


function getUserData() {

}

// THIS IS USER'S HOME DEFAULT LANDING PAGE FOR THE APP
export default function Dashboard(props) {
    



    return (
        <Grid container direction="column">
            <Grid item xs={12}>
                <Typography variant="h3">
                    This Home Page! 
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