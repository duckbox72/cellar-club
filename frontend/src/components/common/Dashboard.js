import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';


export default function Dashboard(props) {

    const darkMode = props.darkMode
    const userProfile = props.userProfile;

    const useStyles = makeStyles((theme) => ({
        root_paper: {
            //height: 150,
            margin: theme.spacing(0, 3),
            borderRadius: 15,
            backgroundColor: props.darkMode ? brown[600] : theme.palette.common.white ,//brown[600]//amber[50],
            
        },
        appbar: {
            borderRadius: '15px 15px 0px 0px',
            //height: 42,
            //backgroundColor: darkMode ? theme.palette.secondary.dark : theme.palette.primary.main,
            backgroundColor: props.darkMode ? brown[600] : theme.palette.common.white ,//brown[600]//amber[50],
        },
        toolbar: {
            //height: 40,
        },
        toolbar_avatar: {
            marginRight: theme.spacing(1),
            width: theme.spacing(3),
            height: theme.spacing(3),
            backgroundColor: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
            color: darkMode ? theme.palette.secondary.main : theme.palette.primary.main,
        },
        toolbar_typography_title: {
            color: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        toolbar_typography_username: {
            color: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
            fontWeight: 500,
            flex: 1,
        },
        main_container: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();
    
    



    return (
        <Paper className={classes.root_paper}>
            <AppBar className={classes.appbar} position="relative" elevation={1}>
                <Toolbar classeName={classes.toolbar} variant="dense" >
                    <Avatar className={classes.toolbar_avatar}>{userProfile.username[0]}</Avatar>
                    <Typography  className={classes.toolbar_typography_username} variant="body1">
                        {userProfile.username}
                    </Typography>
                    <Typography className={classes.toolbar_typography_title} variant="body1">
                        DASHBOARD
                    </Typography>
                    
                </Toolbar>
            </AppBar>
            <Grid className={classes.main_container} container spacing={2} direction="row" justify="center" >
                <Grid item>
                    <Typography variant="body2">
                        Dashboard Item
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                        Dashboard Item
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                        Dashboard Item
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                        Dashboard Item
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );


}




