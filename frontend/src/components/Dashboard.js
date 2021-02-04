import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";

import Navbar from "./Navbar";

export default function Dashboard(props) {
    const { history, match } = props;
    const { params } = match;
    const { user_id } = params;



    return (
        <Grid container direction="column">
            <Grid item xs={12}>
                <Typography variant="h3">
                    This is {user_id} Home Page! 
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