import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';

import Autocomplete from '@material-ui/lab/Autocomplete';

import { Avatar, Card, CardHeader, Collapse, Divider, Grid, IconButton, TextField, Tooltip, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import CompareArrowsOutlinedIcon from '@material-ui/icons/CompareArrowsOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import RemoveIcon from '@material-ui/icons/Remove'
import ShareIcon from '@material-ui/icons/Share';

import { CompassIcon, GlassCheersIcon, SortIcon, StoreIcon, WineBottleIcon } from './SvgIcons';

import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';


export default function LwinProfileCard(props) {
    
    const useStyles = makeStyles((theme) => ({
        avatar: {
            backgroundColor: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        card: {
            margin: theme.spacing(0, 2),
            paddingBottom: theme.spacing(1), 
            borderRadius: 15,
            backgroundColor: props.darkMode ? brown[600] : '#FFFFFF',//amber[50],
        },
        container_actions: {
            padding: theme.spacing(1, 2, 1, 1),
        },
        container_collapse: {
            padding: theme.spacing(1,2),
        },
        divider: {
            margin: theme.spacing(1, 1, 0, 1),
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },        
        header: {
            //backgroundColor: props.darkMode ? brown[600] : '#FFFFFF',//amber[50],   
        },
        header_title: {
            fontWeight: 600,                
        },
        header_subheader: {

        },
        iconbutton_wslogo: {
            margin: theme.spacing(1,1,0,1),
            height: theme.spacing(6),
            width: theme.spacing(6)
        },
        avatar_wslogo: {
            backgroundImage: "url(/static/images/ws-logo-nobg.png)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        icon: { 
            color: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        svg_icon: { 
            height: theme.spacing(2.5),
            width: theme.spacing(2.5),
            color: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
    }));

    
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const classes = useStyles();
    const LwinData = props.LwinData;

    const infodata = [
        {vintage: '2000', size: '750ml', store: 'ABC Wine and Spirits'},
        {vintage: '2001', size: '375ml', store: 'Total Wine & More'},
        {vintage: '2002', size: '187ml', store: 'Crown Wine and Spirits'},
        {vintage: '2003', size: '1.5L', store: 'Goody Goody'},
        {vintage: '2004', size: '3.0L', store: 'Speck\'s Wines'},
        {vintage: '2005', size: '6.0L', store: 'Cellaraiders.com'},
    
    ];

    return (
        <Card className={classes.card}>
            <CardHeader
            disableTypography={true}
            className={classes.header}
            avatar={
                <Avatar className={classes.avatar} aria-label="">
                   <InfoOutlinedIcon className={classes.avatar_icon} />
                </Avatar>
            }
            action={
                <Tooltip title="Find in Wine-Searcher">              
                    <IconButton
                    className={classes.iconbutton_wslogo}
                    onClick={() => {console.log('CLICK!')}}
                    aria-label="find in wine-searcher"
                    >
                        <Avatar className={classes.avatar_wslogo}>
                            <Typography></Typography>
                        </Avatar>
                    </IconButton>
                </Tooltip>
            }
            title={
                <Typography variant="body2" className={classes.header_title}>
                   {LwinData.display_name}
                </Typography>
            }
            subheader={
                <Typography variant="body2" color="textSecondary" className={classes.header_subheader}>
                   {LwinData.region !== undefined ? LwinData.colour + " " + LwinData.region + ", " + LwinData.country : "Search CellarClub for almost 100K products"}
                </Typography>
            }
            />
            
            <Grid container spacing={1} className={classes.container_actions} alignItems="center">
                <IconButton>
                    <AddIcon />
                </IconButton>
                <IconButton >
                    <ShareIcon />
                </IconButton>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="add to cellar"
                >
                    { expanded ? <RemoveIcon /> : <AddIcon /> }
                </IconButton>
            </Grid>

            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <Divider className={classes.divider} />
                
                <Grid container className={classes.container_collapse} spacing={1} justify="center" >
                                         
                    <Grid item xs={6} className={classes.content_info}>
                        <Autocomplete  
                        size="small"
                        id="vintage"
                        fullWidth
                        freeSolo
                        onChange={(event,value) => console.log(value)} 
                        clearOnEscape
                        options={infodata.map((option) => option.vintage)}
                        renderInput={(params) => (
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item>
                                    <GlassCheersIcon className={classes.svg_icon} />
                                </Grid>   

                                <Grid item xs={8}>
                                <TextField
                                id="vintage"
                                type="number"
                                {...params}
                                onChange={console.log('CHANGED')} 
                                label="Vintage" 
                                variant="standard"
                                color={props.darkMode == true ? "primary" : "secondary"}
                                />
                                </Grid>
                            </Grid>
                        )}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.content_info}>
                        <Autocomplete  
                        size="small"
                        id="size"
                        fullWidth
                        freeSolo
                        onChange={(event,value) => console.log(value)} 
                        clearOnEscape
                        options={infodata.map((option) => option.size)}
                        renderInput={(params) => (
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item >
                                    <WineBottleIcon className={classes.svg_icon} />
                                </Grid>   

                                <Grid item xs={8}>
                                    <TextField
                                    id="size"
                                    {...params}
                                    onChange={console.log('CHANGED')} 
                                    label="Size" 
                                    variant="standard"
                                    color={props.darkMode == true ? "primary" : "secondary"}
                                    style={{ fontSize: '24px' }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.content_info}>
                        <Autocomplete  
                        size="small"
                        id="location-cellar"
                        fullWidth
                        freeSolo
                        onChange={(event,value) => console.log(value)} 
                        clearOnEscape
                        options={infodata.map((option) => option.size)}
                        renderInput={(params) => (
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item>
                                    <CompassIcon className={classes.svg_icon} />
                                </Grid>   

                                <Grid item xs={8} >
                                    <TextField
                                    id="location-cellar"
                                    {...params}
                                    onChange={console.log('CHANGED')} 
                                    label="Cellar" 
                                    variant="standard"
                                    color={props.darkMode == true ? "primary" : "secondary"}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.content_info}>
                        <Autocomplete  
                        size="small"
                        id="location-bin"
                        fullWidth
                        freeSolo
                        onChange={(event,value) => console.log(value)} 
                        clearOnEscape
                        options={infodata.map((option) => option.size)}
                        renderInput={(params) => (
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item>
                                    <CompareArrowsOutlinedIcon className={classes.icon} />
                                </Grid>   

                                <Grid item xs={8}>
                                    <TextField
                                    id="location-bin"
                                    {...params}
                                    onChange={console.log('CHANGED')} 
                                    label="Bin" 
                                    variant="standard"
                                    color={props.darkMode == true ? "primary" : "secondary"}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        />
                    </Grid>  

                    <Grid item xs={12} className={classes.content_info}>
                        <Autocomplete  
                        size="small"
                        id="comment"
                        fullWidth
                        freeSolo
                        onChange={(event,value) => console.log(value)} 
                        clearOnEscape
                        options={infodata.map((option) => option.size)}
                        renderInput={(params) => (
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item>
                                    <CommentOutlinedIcon className={classes.icon} />
                                </Grid>   

                                <Grid item xs={10} >
                                    <TextField
                                    id="comment"
                                    {...params}
                                    onChange={console.log('CHANGED')} 
                                    label="Comment" 
                                    variant="standard"
                                    color={props.darkMode == true ? "primary" : "secondary"}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        />   
                    </Grid>    

                </Grid> 

                <Divider className={classes.divider} />

                <Grid container className={classes.container_collapse} spacing={1} alignItems="center" justify="center" >
                    
                <Grid item xs={6} className={classes.content_info}>
                        <Autocomplete  
                        size="small"
                        id="Store"
                        fullWidth
                        freeSolo
                        onChange={(event,value) => console.log(value)} 
                        clearOnEscape
                        options={infodata.map((option) => option.store)}
                        renderInput={(params) => (
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item>
                                    <StoreIcon className={classes.svg_icon} />
                                </Grid>   

                                <Grid item xs={8} >
                                    <TextField
                                    id="Store"
                                    {...params}
                                    onChange={console.log('CHANGED')} 
                                    label="Store" 
                                    variant="standard"
                                    color={props.darkMode == true ? "primary" : "secondary"}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.content_info}>
                            
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item >
                                <AttachMoneyIcon className={classes.icon} />
                            </Grid>   

                            <Grid item xs={8}>
                                <TextField
                                id="cost"
                                type="number"
                                fullWidth
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={console.log('CHANGED')} 
                                label="Cost" 
                                variant="standard"
                                color={props.darkMode == true ? "primary" : "secondary"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} className={classes.content_info}>
                            
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item >
                                <EventAvailableIcon className={classes.icon} />
                            </Grid>   

                            <Grid item xs={8}>
                                <TextField
                                id="added"
                                type="number"
                                fullWidth
                                InputProps={{ inputProps: { min: 1 } }}
                                onChange={console.log('CHANGED')} 
                                label="Date added" 
                                variant="standard"
                                color={props.darkMode == true ? "primary" : "secondary"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} className={classes.content_info}>
                            
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item >
                                <SortIcon className={classes.svg_icon} />
                            </Grid>   

                            <Grid item xs={8}>
                                <TextField
                                id="quantity"
                                type="number"
                                fullWidth
                                InputProps={{ inputProps: { min: 1 } }}
                                onChange={console.log('CHANGED')} 
                                label="Quantity" 
                                variant="standard"
                                color={props.darkMode == true ? "primary" : "secondary"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>    
            </Collapse>
        </Card>
    );
}