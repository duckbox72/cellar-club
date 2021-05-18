import React, { useState } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography'

import EventIcon from '@material-ui/icons/Event';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import StarOutlinedIcon from '@material-ui/icons/StarOutline';
import StoreIcon from '@material-ui/icons/Store';

import { GlassCheersIcon, GlassWhiskeyIcon, WineBottleIcon, WineGlassIcon } from './SvgIcons';

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
        marginTop: theme.spacing(0.5),
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
    dashboard_cheers_icon: {
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
    dashboard_label: {
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary,
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            fontSize: theme.spacing(1.75),
        },
    },
    dashboard_color_icon_first_div: {
        marginLeft: 'auto',
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
    dashboard_text_T: {
        textAlign: 'right',
        fontWeight: 500,
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            fontSize: theme.spacing(1.75),
        },
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    dashboard_text_T_zero: {
        marginLeft: 'auto',
        textAlign: 'right',
        fontWeight: 500,
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
    dashboard_circular_progress: {
        color: mystyleprops => mystyleprops.colorSchemaA,
        margin: theme.spacing(0, 0.75, 0, 0.5),
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
    const username = props.username;
    const stats = props.dashboardStats !== null ? props.dashboardStats : null;
    console.log(stats)
    

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
                                    Hello, {username}
                                </Typography>
                            </ListItem>
                        </Grid> 




                        <Grid item xs={12} className={classes.dashboard_grid}>
                            <ListItem>
                                <WineBottleIcon className={classes.dashboard_bottle_icon} style={{transform: 'rotate(315deg)',}}/>
                                    
                                <Typography variant="body2" className={classes.dashboard_label}> 
                                    Collection
                                </Typography>
                                
                                {stats ? stats.collection_red > 0 
                                    ? 
                                    <Tooltip title="Red">
                                        <div className={classes.dashboard_color_icon_first_div}>
                                                <WineGlassIcon 
                                                className={classes.dashboard_color_icon}
                                                style={{color: 'maroon'}}
                                                />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.collection_red > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.collection_red}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }

                                {stats ? stats.collection_white > 0
                                    ? 
                                    <Tooltip title="White">
                                        <div className={stats.collection_red === 0
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <WineGlassIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'tan'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.collection_white > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.collection_white}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }
                            
                                {stats ? stats.collection_rose > 0 
                                    ? 
                                    <Tooltip title="Rose">
                                        <div className={stats.collection_red === 0  && stats.collection_white === 0 
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <WineGlassIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'lightcoral'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.collection_rose > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.collection_rose}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }
                                
                                {stats ? stats.collection_else > 0 
                                    ? 
                                    <Tooltip title="Spirits">
                                        <div className={stats.collection_red === 0  && stats.collection_white === 0 && stats.collection_rose === 0 
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <GlassWhiskeyIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'silver'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.collection_else > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.collection_else}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }

                                {stats ? 
                                    <Tooltip title="Total">
                                        <Typography 
                                        variant="button" 
                                        className={stats.collection === 0 ? classes.dashboard_text_T_zero : classes.dashboard_text_T}
                                        >
                                            T
                                        </Typography>
                                    </Tooltip>
                                    :
                                    <></>
                                }
                                <Typography variant="body2" className={classes.dashboard_text_last}>
                                    {stats ? stats.collection : ''}
                                </Typography>
                            </ListItem>
                        </Grid>

                        <Grid item xs={12} className={classes.dashboard_grid}>
                            <ListItem>
                            <GlassCheersIcon className={classes.dashboard_cheers_icon}/>
                                    
                                <Typography variant="body2" className={classes.dashboard_label}> 
                                    Consumed
                                </Typography>

                                {stats ? stats.consumed_red > 0 
                                    ? 
                                    <Tooltip title="Red">
                                        <div className={classes.dashboard_color_icon_first_div}>
                                                <WineGlassIcon 
                                                className={classes.dashboard_color_icon}
                                                style={{color: 'maroon'}}
                                                />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.consumed_red > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.consumed_red}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }

                                {stats ? stats.consumed_white > 0 
                                    ? 
                                    <Tooltip title="White">
                                        <div className={stats.consumed_red === 0
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <WineGlassIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'tan'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.consumed_white > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.consumed_white}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }
                            
                                {stats ? stats.consumed_rose > 0 
                                    ? 
                                    <Tooltip title="Rose">
                                        <div className={stats.consumed_red === 0  && stats.consumed_white === 0
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <WineGlassIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'lightcoral'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.consumed_rose > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.consumed_rose}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }
                                
                                {stats ? stats.consumed_else > 0 
                                    ? 
                                    <Tooltip title="Spirits">
                                        <div className={stats.consumed_red === 0  && stats.consumed_white === 0 && stats.consumed_rose === 0 
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <GlassWhiskeyIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'silver'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.consumed_else > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.consumed_else}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }

                                {stats ? 
                                    <Tooltip title="Total">
                                        <Typography 
                                        variant="button" 
                                        className={stats.consumed === 0 ? classes.dashboard_text_T_zero : classes.dashboard_text_T}
                                        > 
                                            T
                                        </Typography>
                                    </Tooltip>
                                    :
                                    <></>
                                }
                                <Typography variant="body2" className={classes.dashboard_text_last}>
                                    {stats ? stats.consumed : ''}
                                </Typography>
                            </ListItem>
                        </Grid>


                        <Grid item xs={12} className={classes.dashboard_grid}>
                            <ListItem>
                                <StoreIcon className={classes.dashboard_icon}/>
                                    
                                <Typography variant="body2" className={classes.dashboard_label}> 
                                    Purchased
                                </Typography>

                                {stats ? stats.purchased_red > 0 
                                    ? 
                                    <Tooltip title="Red">
                                        <div className={classes.dashboard_color_icon_first_div}>
                                                <WineGlassIcon 
                                                className={classes.dashboard_color_icon}
                                                style={{color: 'maroon'}}
                                                />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.purchased_red > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.purchased_red}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }

                                {stats ? stats.purchased_white > 0 
                                    ? 
                                    <Tooltip title="White">
                                        <div className={stats.purchased_red === 0
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <WineGlassIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'tan'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.purchased_white > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.purchased_white}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }
                            
                                {stats ? stats.purchased_rose > 0 
                                    ? 
                                    <Tooltip title="Rose">
                                        <div className={stats.purchased_red === 0  && stats.purchased_white === 0
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <WineGlassIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'lightcoral'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.purchased_rose > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.purchased_rose}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }
                                
                                {stats ? stats.purchased_else > 0 
                                    ? 
                                    <Tooltip title="Spirits">
                                        <div className={stats.purchased_red === 0  && stats.purchased_white === 0 && stats.purchased_rose === 0 
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <GlassWhiskeyIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'silver'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.purchased_else > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.purchased_else}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }

                                {stats ? 
                                    <Tooltip title="Total">
                                        <Typography 
                                        variant="button" 
                                        className={stats.purchased === 0 ? classes.dashboard_text_T_zero : classes.dashboard_text_T}
                                        > 
                                            T
                                        </Typography>
                                    </Tooltip>
                                    :
                                    <></>
                                }
                                <Typography variant="body2" className={classes.dashboard_text_last}>
                                    {stats ? stats.purchased : ''}
                                </Typography>
                            </ListItem>
                        </Grid>


                        <Grid item xs={12} className={classes.dashboard_grid}>
                            <ListItem>
                                <StarOutlinedIcon className={classes.dashboard_icon}/>
                                    
                                <Typography variant="body2" className={classes.dashboard_label}> 
                                    Reviews
                                </Typography>

                                {stats ? stats.reviewed_red > 0 
                                    ? 
                                    <Tooltip title="Red">
                                        <div className={classes.dashboard_color_icon_first_div}>
                                                <WineGlassIcon 
                                                className={classes.dashboard_color_icon}
                                                style={{color: 'maroon'}}
                                                />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.reviewed_red > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.reviewed_red}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }

                                {stats ? stats.reviewed_white > 0 
                                    ? 
                                    <Tooltip title="White">
                                        <div className={stats.reviewed_red === 0
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <WineGlassIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'tan'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.reviewed_white > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.reviewed_white}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }
                            
                                {stats ? stats.reviewed_rose > 0 
                                    ? 
                                    <Tooltip title="Rose">
                                        <div className={stats.reviewed_red === 0  && stats.reviewed_white === 0
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <WineGlassIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'lightcoral'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.reviewed_rose > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.reviewed_rose}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }
                                
                                {stats ? stats.reviewed_else > 0 
                                    ? 
                                    <Tooltip title="Spirits">
                                        <div className={stats.reviewed_red === 0  && stats.reviewed_white === 0 && stats.reviewed_rose === 0 
                                            ? classes.dashboard_color_icon_first_div
                                            : ''}
                                        >
                                            <GlassWhiskeyIcon 
                                            className={classes.dashboard_color_icon}
                                            style={{color: 'silver'}}
                                            />
                                        </div>
                                    </Tooltip>
                                    :  
                                    <></>
                                    :   
                                    <></>
                                }
                                {stats ? stats.reviewed_else > 0 
                                    ?
                                    <Typography variant="body2" className={classes.dashboard_text}>
                                        {stats.reviews_else}
                                    </Typography>
                                    :
                                    <></>
                                    :
                                    <> </>
                                }
                                {stats ? 
                                    <Tooltip title="Total">
                                        <Typography 
                                        variant="button" 
                                        className={stats.reviewed === 0 ? classes.dashboard_text_T_zero : classes.dashboard_text_T}
                                        > 
                                            T
                                        </Typography>
                                    </Tooltip>
                                    :
                                    <></>
                                }
                                <Typography variant="body2" className={classes.dashboard_text_last}>
                                    {stats ? stats.reviewed : ''}
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




