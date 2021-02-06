import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, fade } from '@material-ui/core';



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
    appbar: {
        backgroundColor: fade(theme.palette.secondary.dark, 0.85),
    },
    button: {
        color: fade(theme.palette.common.white , 0.75),
    },
    img: {
        height: "60px",
        [theme.breakpoints.down("sm")]: {
            height: "50px",
        },

    },
    toolbar_typography: {
        flex: 1,
    },
}));


export default function Landing(props) {
    const classes = useStyles();

    return (
        <Grid container spacing={1} className={classes.root_container} direction="row">
            <Grid item xs={12}>
                <AppBar position="static" className={classes.appbar}>
                  <Toolbar  >
                    <img src="/static/images/banner_no_bg.png" alt="logo" className={classes.img}></img>
                    <Typography className={classes.toolbar_typography} />                 
                    <Button variant="text" className={classes.button} href="/signin">
                        Sign In
                    </Button>
                    <Button variant="text" className={classes.button} href="/signup">
                        Sign Up
                    </Button>
                  </Toolbar>
                </AppBar>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Register
                </Button>
              </Grid>
            </Grid>

        </Grid>
    );
}