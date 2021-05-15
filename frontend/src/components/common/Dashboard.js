import React, { useState } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

import EventIcon from '@material-ui/icons/Event';
import ListIcon from '@material-ui/icons/List';
import StarOutlinedIcon from '@material-ui/icons/StarOutline';
import SearchIcon from '@material-ui/icons/Search';

import { WineBottleIcon, WineGlassIcon } from './SvgIcons';

import brown from '@material-ui/core/colors/brown';



const useStyles = makeStyles((theme) => ({
    root: {
        height: screen.availHeight * 0.68,
        marginTop: theme.spacing(1),
    },
    dashboard_paper: {
        height: screen.availHeight * 0.33,
        width: '100%',
        margin: theme.spacing(0, 3),
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    dashboard_header_title: {
        fontSize: theme.spacing(2),
        marginLeft: theme.spacing(2.5),
        marginTop: theme.spacing(1.5),
        color:  mystyleprops => mystyleprops.colorSchemaA,
    },
    dashboard_header_username: {
        marginLeft: 'auto',
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1.125),
        color: mystyleprops => mystyleprops.colorSchemaA,
        fontWeight: 500,
    },

    dashboard_grid: {
        marginTop: theme.spacing(0.75),
    },
    dashboard_icon: { 
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        marginLeft: theme.spacing(1.25),
        marginRight: theme.spacing(0.625),
        color: theme.palette.text.secondary,
        [theme.breakpoints.down('xs')]:{
            marginLeft: -theme.spacing(0.375),
            marginRight: theme.spacing(0.5),
        },
    },
    dashboard_bottle_icon: {
        height: theme.spacing(1.75),
        width: theme.spacing(1.75),
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary,
        [theme.breakpoints.down('xs')]:{
            marginLeft: theme.spacing(0),
            marginRight: theme.spacing(0.75),
        },
    },
    dashboard_label: {
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary,
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            fontSize: theme.spacing(1.75),
        },
    },
    dashboard_text_T: {
        marginLeft: 'auto',
        textAlign: 'right',
        fontWeight: 500,
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            fontSize: theme.spacing(1.75),
        },
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    dashboard_color_icon: {
        height: theme.spacing(1.5),
        width: theme.spacing(1.5),
        color: mystyleprops => mystyleprops.infoColor,
    },
    dashboard_text: {
        textAlign: 'right',
        fontWeight: 400,
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(2),
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            fontSize: theme.spacing(1.75),
            marginLeft: theme.spacing(0.25),
            marginRight: theme.spacing(0.75),
        },
    },
    dashboard_text_S: {
        textAlign: 'right',
        fontWeight: 400,
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            fontSize: theme.spacing(1.75),
        },
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    dashboard_text_last: {
        textAlign: 'right',
        fontWeight: 400,
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(2),
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            fontSize: theme.spacing(1.75),
            marginLeft: theme.spacing(0.25),
            marginRight: theme.spacing(0),
        },
    },



    action_paper: {
        height: screen.availHeight * 0.15,
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
        elevation: 3,
        '&:hover': {
            filter: 'opacity(85%)',
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
        fontSize: theme.spacing(2),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    action_icon: {
        //height: theme.spacing(3.5),
        //width: theme.spacing(3.5),
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
    }
    const classes = useStyles(mystyleprops);


    const handleSearchActionClick = e => {
        window.scrollTo(0, 0);
        props.history.push('/search');
    }


    const handleCollectionActionClick = e => {
        window.scrollTo(0, 0);
        props.history.push('/collection');
    }


    const handleMemoriesActionClick = e => {
        window.scrollTo(0, 0);
        props.history.push('/memories');
    }


    const handleReviewActionClick = e => {
        window.scrollTo(0, 0);
        props.history.push('/reviews');
    }
    

    return (
            <div className={classes.root} >
                <Grid container spacing={2} justify="center">
                    <Paper  className={classes.dashboard_paper} elevation={3}>
                        <Grid item xs={12}>
                            <ListItem> 
                                <Typography className={classes.dashboard_header_title} variant="button">
                                    Home
                                </Typography>
                                
                                <Typography  className={classes.dashboard_header_username} variant="body1">
                                    Hello, {userProfile.username}
                                </Typography>
                            </ListItem>
                        </Grid> 












                        <Grid item xs={12} className={classes.dashboard_grid}>
                            <ListItem>
                                <WineBottleIcon className={classes.dashboard_bottle_icon} style={{transform: 'rotate(315deg)',}}/>
                                    
                                <Typography variant="body2" className={classes.dashboard_label}> 
                                    Collection
                                </Typography>
                                
                                <Typography variant="button" className={classes.dashboard_text_T}>
                                    T
                                </Typography>
                                <Typography variant="body2" className={classes.dashboard_text}>
                                    986
                                </Typography>

                                <WineGlassIcon 
                                className={classes.dashboard_color_icon}
                                style={{color: 'maroon'}}
                                />
                                <Typography variant="body2" className={classes.dashboard_text}>
                                    381
                                </Typography>

                                <WineGlassIcon 
                                className={classes.dashboard_color_icon}
                                style={{color: 'tan'}}
                                />
                                <Typography variant="body2" className={classes.dashboard_text}>
                                    412
                                </Typography>
                            
                                <WineGlassIcon 
                                className={classes.dashboard_color_icon}
                                style={{color: 'lightcoral'}}
                                />
                                <Typography variant="body2" className={classes.dashboard_text}>
                                    297
                                </Typography>

                                <Typography variant="button" className={classes.dashboard_text_S}>
                                    S
                                </Typography>
                                <Typography variant="body2" className={classes.dashboard_text_last}>
                                    297
                                </Typography>
                            
                            
                            </ListItem>
                        </Grid>

                        <Grid item xs={12} className={classes.dashboard_grid}>
                            <ListItem>
                                <WineBottleIcon className={classes.dashboard_bottle_icon}/>
                                    
                                <Typography variant="body2" className={classes.dashboard_label}> 
                                    Consumed
                                </Typography>

                                <Typography variant="body2" className={classes.dashboard_text}>
                                    info text
                                </Typography>
                            </ListItem>
                        </Grid>

                        <Grid item xs={12} className={classes.dashboard_grid}>
                            <ListItem>
                                <StarOutlinedIcon className={classes.dashboard_icon}/>
                                    
                                <Typography variant="body2" className={classes.dashboard_label}> 
                                    Purchased
                                </Typography>

                                <Typography variant="body2" className={classes.dashboard_text}>
                                    info Text
                                </Typography>
                            </ListItem>
                        </Grid>

                        <Grid item xs={12} className={classes.dashboard_grid}>
                            <ListItem>
                                <StarOutlinedIcon className={classes.dashboard_icon}/>
                                    
                                <Typography variant="body2" className={classes.dashboard_label}> 
                                    Reviews
                                </Typography>

                                <Typography variant="body2" className={classes.dashboard_text}>
                                    info text
                                </Typography>
                            </ListItem>
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
                            onClick={handleSearchActionClick}
                            >
                                <Grid container spacing={0} direction="column" alignItems="center">
                                    <Grid item className={classes.action_title_grid}>
                                        <Typography variant="button" className={classes.action_title}>
                                            Search
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton>
                                            <SearchIcon className={classes.action_icon} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">
                                            Find, add and review
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
                                            Browse, drink and remove
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
                                            Browse and manage
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
                            onClick={handleReviewActionClick}
                            >
                                <Grid container spacing={0} direction="column" alignItems="center">
                                    <Grid item className={classes.action_title_grid}>
                                        <Typography variant="button" className={classes.action_title}>
                                            Reviews
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton>
                                            <StarOutlinedIcon className={classes.action_icon}/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">
                                            Browse and manage
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




