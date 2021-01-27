import React, { Component, useState } from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";

import Navbar from "./Navbar";

export default function HomePage() {
    return (
        <Grid container direction="column">
            <Grid item>
                <Navbar />
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h5" color="initial">
                        This is my Home Page!
                    </Typography>
                    <Button variant="contained" color="primary">
                        My Button
                    </Button>
                    <Button variant="contained" color="secondary">
                        My Button
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
}