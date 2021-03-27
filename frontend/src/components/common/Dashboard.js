import React, { useState } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';



const useStyles = makeStyles((theme) => ({
    root_paper: {
        margin: theme.spacing(0, 3),
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
        
    },
    appbar: {
        borderRadius: '15px 15px 0px 0px',
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    toolbar: {
        
    },
    toolbar_avatar: {
        marginRight: theme.spacing(1),
        width: theme.spacing(3),
        height: theme.spacing(3),
        backgroundColor: mystyleprops => mystyleprops.colorSchemaA,
        color:  mystyleprops => mystyleprops.colorSchemaB,
    },
    toolbar_typography_title: {
        color:  mystyleprops => mystyleprops.colorSchemaA
        ,
    },
    toolbar_typography_username: {
        color: mystyleprops => mystyleprops.colorSchemaA,
        fontWeight: 500,
        flex: 1,
    },
    main_container: {
        marginTop: theme.spacing(2),
    },
}));


export default function Dashboard(props) {

    const darkMode = props.darkMode
    const userProfile = props.userProfile;

    const theme = useTheme(); 
    const mystyleprops = {
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        colorSchemaB: darkMode ? theme.palette.secondary.main : theme.palette.primary.main,
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
    }
    const classes = useStyles(mystyleprops);
    

    return (
        <Paper className={classes.root_paper}>
            <AppBar className={classes.appbar} position="relative" elevation={1}>
                <Toolbar classeName={classes.toolbar} variant="dense" >
                    <Avatar className={classes.toolbar_avatar}>{userProfile.username[0]}</Avatar>
                    <Typography  className={classes.toolbar_typography_username} variant="body1">
                        {userProfile.username}
                    </Typography>
                    <Typography className={classes.toolbar_typography_title} variant="button">
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




