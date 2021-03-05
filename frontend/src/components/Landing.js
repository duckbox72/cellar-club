import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, fade, Grid, Link, Paper, Toolbar, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          CellarClub.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

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
        marginTop: theme.spacing(8),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    },
    body_typography: {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.secondary.main ,
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
            <Paper className={classes.root_paper}>
            <Grid container spacing={6} direction="column">
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
                        spacing={1} 
                        direction="column"
                        justify="space-between"
                        
                        >
                        <Grid item>
                            <Typography variant="h4" className={classes.body_typography}>
                                UPGRADE YOUR EXPERIENCE 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" className={classes.body_typography}>
                                and easily find, manage and review collection.  
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" className={classes.body_button} href="/signup">
                                Register
                            </Button>
                        </Grid>
                        <Box mt={6}>
                            <Copyright />
                        </Box>
                    </Grid>
                </div>
            </Grid>
            </Paper>
        </div>
    );
}