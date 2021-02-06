import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root_container: {
        height: "100vh",
        
        backgroundImage: "url(/static/images/barrels.jpg)",
        [theme.breakpoints.down("sm")]: {
            backgroundImage: "url(/static/images/toast.jpg)",
        },
        
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    toolbarTypography: {
        flex: 1,
    },
}));


export default function Landing(props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root_container}>
            <Grid item xs={12}>
                <AppBar position="static">
                  <Toolbar>                
                    <Typography variant="h6" className={classes.toolbarTypography}>
                      CellarClub
                    </Typography>
                    <Button variant="text" color="secondary" href="/signin">
                      Sign In
                    </Button>
                    <Button variant="text" color="secondary" href="/signup">
                      Sign Up
                    </Button>
                  </Toolbar>
                </AppBar>
            </Grid>
        </Grid>
    );
}