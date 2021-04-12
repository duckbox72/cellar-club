import React, { useState } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

import EventIcon from '@material-ui/icons/Event';
import KitchenIcon from '@material-ui/icons/Kitchen';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';

import brown from '@material-ui/core/colors/brown';
import { IconButton } from '@material-ui/core';



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
        height: screen.availHeight * 0.15,
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
        elevation: 3,
        '&:hover': {
            backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaAHover,
            elevation: 6,
        },
    },
    action_root: {
        margin: theme.spacing(2,2,0,2),
    },
    action_title_grid: {
        marginTop: theme.spacing(1)
    },
    action_title: {
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    action_icon: {
        height: theme.spacing(4),
        width: theme.spacing(4),
        //marginTop: theme.spacing(2),
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
        backgroundColorSchemaAHover: darkMode ? theme.palette.secondary.main : brown[200],
    }
    const classes = useStyles(mystyleprops);


    const handleCellarClubActionClick = e => {
        window.scrollTo(0, 0);
        props.history.push('/search');
    }


    const handleCollectionActionClick = e => {
        window.scrollTo(0, 0);
        props.history.push('/collection');
    }


    const handleMemoriesActionClick = e => {
        //window.scrollTo(0, 0);
        //props.history.push('/memories');
        console.log('CLICK MEMORIES')
    }


    const handleStorageActionClick = e => {
        //window.scrollTo(0, 0);
        //props.history.push('/storage');
        console.log('CLICK STORAGE')
    }
    

    return (
            <div className={classes.root} >
                <Grid container spacing={2} justify="center">
                    <Paper  className={classes.dashboard_paper} >
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
                    <Grid container spacing={2} justify="center">     
                        
                        <Grid item xs={6}>
                            <Paper 
                            elevation={3} 
                            className={classes.action_paper} 
                            role="button"
                            onClick={handleCellarClubActionClick}
                            >
                                <Grid container spacing={0} direction="column" alignItems="center">
                                    <Grid item className={classes.action_title_grid}>
                                        <Typography variant="button" className={classes.action_title}>
                                            Cellar Club
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton>
                                            <SearchIcon className={classes.action_icon} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">
                                            Search Bottles
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper> 
                        </Grid>

                        <Grid item xs={6}>
                            <Paper 
                            elevation={3} 
                            className={classes.action_paper} 
                            role="button"
                            onClick={handleCollectionActionClick}
                            >
                                <Grid container spacing={0} direction="column" alignItems="center">
                                    <Grid item className={classes.action_title_grid}>
                                        <Typography variant="button" className={classes.action_title}>
                                            Collection
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton>
                                            <ListIcon className={classes.action_icon}/>
                                        </IconButton> 
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">
                                            Browse my Cellar
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper> 
                        </Grid>

                        <Grid item xs={6}>
                            <Paper 
                            elevation={3} 
                            className={classes.action_paper} 
                            role="button"
                            onClick={handleMemoriesActionClick}
                            >
                                <Grid container spacing={0} direction="column" alignItems="center">
                                    <Grid item className={classes.action_title_grid}>
                                        <Typography variant="button" className={classes.action_title}>
                                            Memories
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton>
                                            <EventIcon className={classes.action_icon}/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">
                                            Notes and Reviews
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper> 
                        </Grid>

                        <Grid item xs={6}>
                            <Paper 
                            elevation={3} 
                            className={classes.action_paper} 
                            role="button"
                            onClick={handleStorageActionClick}
                            >
                                <Grid container spacing={0} direction="column" alignItems="center">
                                    <Grid item className={classes.action_title_grid}>
                                        <Typography variant="button" className={classes.action_title}>
                                            Storage
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton>
                                            <KitchenIcon className={classes.action_icon}/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">
                                            Manage Locations
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper> 
                        </Grid>
                    
                    </Grid>
                </div>
            </div>
            



        
    );


}




