import React, { useState } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

import brown from '@material-ui/core/colors/brown';



const useStyles = makeStyles((theme) => ({
    root: {
        height: screen.availHeight * 0.68,
        marginTop: theme.spacing(1),
        //backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
        
    },
    dashboard_paper: {
        height: screen.availHeight * 0.33,
        width: '100%',
        margin: theme.spacing(0, 3),
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    dashboard_avatar: {
        
        //width: theme.spacing(3),
        //height: theme.spacing(3),
        backgroundColor: mystyleprops => mystyleprops.colorSchemaA,
        color:  mystyleprops => mystyleprops.colorSchemaB,
    },
    dashboard_title: {
        //margin: theme.spacing(1),
        color:  mystyleprops => mystyleprops.colorSchemaA,
    },
    dashboard_username: {
        color: mystyleprops => mystyleprops.colorSchemaA,
        fontWeight: 500,
        flex: 1,
    },

    action_paper: {
        //height: screen.availHeight * 0.31,
        //[theme.breakpoints.down("sm")]: {
            height: screen.availHeight * 0.14,
        //},
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    action_root: {
        margin: theme.spacing(2,2,0,2),

    },
    action_container: {
        //marginRight: theme.spacing(2)
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
            <div className={classes.root} >
                <Grid container spacing={2} justify="center">
                    <Paper elevation={3} className={classes.dashboard_paper} >
                        <Grid item xs={12} container spacing={0} alignItems="center">
                            <Avatar className={classes.dashboard_avatar}>{userProfile.username[0]}</Avatar>
                            <Typography  className={classes.dashboard_username} variant="body1">
                                {userProfile.username}
                            </Typography>
                            <Typography className={classes.dashboard_title} variant="button">
                                DASHBOARD
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container spacing={2}>
                        
                            <Grid item xs={6} sm={3}>
                                <Typography variant="body2">
                                    Dashboard Item
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="body2">
                                    Dashboard Item
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="body2">
                                    Dashboard Item
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="body2">
                                    Dashboard Item
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                
                <div className={classes.action_root}>
                    <Grid className={classes.action_container} container spacing={2} justify="center">     
                        <Grid item xs={6}>
                            <Paper elevation={3} className={classes.action_paper}>
                                <Typography variant="body2">
                                    CellarClub
                                </Typography>
                            </Paper> 
                        </Grid>

                        <Grid item xs={6}>
                            <Paper elevation={3} className={classes.action_paper}>
                                <Typography variant="body2">
                                    Collection
                                </Typography>
                            </Paper> 
                        </Grid>

                        <Grid item xs={6}>
                            <Paper elevation={3} className={classes.action_paper}>
                                <Typography variant="body2">
                                    Memories
                                </Typography>
                            </Paper> 
                        </Grid>

                        <Grid item xs={6}>
                            <Paper elevation={3} className={classes.action_paper}>
                                <Typography variant="body2">
                                    Storage
                                </Typography>
                            </Paper> 
                        </Grid>
                    </Grid>
                </div>
            </div>
            



        
    );


}




