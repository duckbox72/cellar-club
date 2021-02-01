import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";

import Navbar from "./Navbar";

export default function Dashboard() {
    return (
        <Grid container direction="column">
            <Grid item xs={12}>
                <Typography variant="h5" color="initial">
                    This is my Home Page!
                </Typography>
                <Button variant="contained" color="primary">
                    My Button
                </Button>
                <Button variant="contained" color="secondary">
                    My Button
                </Button>
            </Grid>
        </Grid>
    );
}