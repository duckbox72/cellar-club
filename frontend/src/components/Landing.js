import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, fade, Grid, Link, Paper, Toolbar, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

import CCLogo from './common/CCLogo';
import Copyright from './common/Copyright';


const logoFontTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Quicksand', 'sans-serif',
        ].join(','),
    },
});


const useStyles = makeStyles((theme) => ({
    root: {
        height: screen.availHeight,
        flexGrow: 1,

        backgroundImage: "url(/static/images/barrels.jpg)",
        [theme.breakpoints.down("sm")]: {
            backgroundImage: "url(/static/images/toast.jpg)",
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
    },
    root_paper: {
        height: screen.availHeight,
        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(200, 200, 200, 0.5))'
      },
    
    appbar: {
        backgroundColor: fade(theme.palette.secondary.dark, 0.85),
    },
    appbar_button: {
        color: theme.palette.primary.main,
    },
    appbar_logo: {
        color: theme.palette.primary.main,
        width: theme.spacing(6),
        height: theme.spacing(6),
        margin: theme.spacing(0, 1, 0, 0),
    },
    appbar_typography: {
        flex: 1,
        color: theme.palette.primary.main,
    },
    body_container: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    },
    body_typography: {
        color: theme.palette.common.white,
        [theme.breakpoints.down("sm")]: {
            color: theme.palette.secondary.dark,
            fontWeight: 500,
        },
    },
    body_button: {
        borderRadius: 0,
        fontWeight: theme.typography.fontWeightMedium,
        padding: theme.spacing(2, 8),
        margin: theme.spacing(8),
        boxShadow: 'none',
    },
}));


export default function Landing(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.root_paper}>
            <Grid container spacing={0} direction="column">
                <Grid item container xs={12}>
                    <AppBar position="static" className={classes.appbar}>
                    <Toolbar  >
                    <AllInclusiveIcon className={classes.appbar_logo} />
                        <ThemeProvider theme={logoFontTheme}>
                            <Typography variant={'h6'} className={classes.appbar_typography}>
                                C e l l a r C l u b
                            </Typography> 
                        </ThemeProvider>               
                        <Button variant="text" className={classes.appbar_button} href="/signin">
                            Sign In
                        </Button>
                    </Toolbar>
                    </AppBar>
                </Grid>    
                <div className={classes.body_container}>
                    <Grid item container 
                        spacing={0} 
                        direction="column"
                        justify="space-between"
                        alignItems="center"
                        >
                        <Grid itme>
                            <CCLogo />
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" className={classes.body_typography}>
                                UPGRADE YOUR EXPERIENCE 
                            </Typography>
                        </Grid>
                        <Grid item item xs={12} sm={10} md={8}>
                            <Typography variant="body1" className={classes.body_typography}>
                                Join CellarClub and have free acess to more than 100.000 products. Find your favorite bottle of wine or spirit, add to collection, track consume, write reviews and more.  
                            </Typography>
                        </Grid>
                        
                        <Grid item>
                            <Button variant="contained" color="primary" className={classes.body_button} href="/signup">
                                Register
                            </Button>
                        </Grid>
                        <Box mt={0}>
                            <Copyright />
                        </Box>
                    </Grid>
                </div>
            </Grid>
            </Paper>
        </div>
    );
}