import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'



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
}));


export default function Landing(props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root_container}>
            <Grid item xs={12}>
                <AppBar position="static">
                  <Toolbar className={classes.toolbar}>                
                    <Typography variant="h6">
                      LANDING HERO
                    </Typography>
                  </Toolbar>
                </AppBar>
            </Grid>
        </Grid>
    );
}