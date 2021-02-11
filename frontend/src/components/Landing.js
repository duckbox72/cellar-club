import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        //height: "100vh",
        flexGrow: 1,
        //backgroundImage: "url(/static/images/barrels.jpg)",
        //[theme.breakpoints.down("sm")]: {
        //    backgroundImage: "url(/static/images/toast.jpg)",
        //},
        //backgroundSize: 'cover',
        //backgroundPosition: 'center',
        textAlign: 'center',
        
    },
    
    appbar: {
        backgroundColor: fade(theme.palette.secondary.dark, 0.85),
    },
    appbar_button: {
        color: fade(theme.palette.common.white, 0.75),
    },
    appbar_img: {
        height: "60px",
        [theme.breakpoints.down("sm")]: {
            height: "50px",
        },
    },
    appbar_typography: {
        flex: 1,
    },
    body_container: {
    
        //border: '2px solid red',
        //height: '70vh'
        marginTop: theme.spacing(8),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        
    },
    body_typography: {
        fontWeight: theme.typography.fontWeightMedium,
        //margin: theme.spacing(4),
    },
    body_button: {
        borderRadius: 0,
        fontWeight: theme.typography.fontWeightMedium,
        padding: theme.spacing(2, 8),
        margin: theme.spacing(2),
        boxShadow: 'none',
    },
}));


export default function Landing(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={6} direction="column">
                <Grid item container xs={12}>
                    <AppBar position="static" className={classes.appbar}>
                    <Toolbar  >
                        <img src="/static/images/banner_no_bg.png" alt="logo" className={classes.appbar_img}></img>
                        <Typography className={classes.appbar_typography} />                 
                        <Button variant="text" className={classes.appbar_button} href="/signin">
                            Sign In
                        </Button>
                        <Button variant="text" className={classes.appbar_button} href="/signup">
                            Sign Up
                        </Button>
                    </Toolbar>
                    </AppBar>
                </Grid>    
                <div className={classes.body_container}>
                    <Grid item container 
                        spacing={1} 
                        direction="column"
                        justify="space-between"
                        
                        >
                        <Grid item>
                            <Typography variant="h3" className={classes.body_typography}>
                                UPGRADE YOUR EXPERIENCE 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" className={classes.body_typography}>
                                Easily find, manage and review collection.  
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" className={classes.body_button} href="/signup">
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </div>
    );
}