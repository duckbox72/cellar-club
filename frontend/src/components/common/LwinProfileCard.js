import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';

import Autocomplete from '@material-ui/lab/Autocomplete';

import { Avatar, Card, CardHeader, Collapse, Divider, Grid, IconButton, TextField, Tooltip, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import RemoveIcon from '@material-ui/icons/Remove'
import ShareIcon from '@material-ui/icons/Share';

import { CompassIcon, ExpandAltIcon,LeafIcon, SortIcon, StoreIcon, WineBottleIcon } from './SvgIcons';

import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';


export default function LwinProfileCard(props) {
    
    const useStyles = makeStyles((theme) => ({
        avatar: {
            backgroundColor: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        avatar_icon: {
            
        },
        card: {
            margin: theme.spacing(0, 3),
            borderRadius: 15,
            backgroundColor: props.darkMode ? brown[600] : amber[50],
        },
        container_actions: {
            padding: theme.spacing(1,2),
        },
        container_collapse: {
            padding: theme.spacing(1,2),
        },
        content_icon: {
            textAlign: "center",
        },
        content_info: {
            textAlign: "right",
        },
        content_label: {
            color: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        divider: {
            margin: theme.spacing(0, 1),
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
            backgroundColor: props.darkMode ? brown[600] : amber[50],   
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

        //form classes:
        autocomplete_vintage: {
            margin: theme.spacing(0,0),
            height: 32,
        },
        text_field_vintage: {
            margin: theme.spacing(0,0),
        },

    }));

    
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const classes = useStyles();
    const LwinData = props.LwinData;

    const vintages = [
        {vintage: '2000'},
        {vintage: '2001'},
        {vintage: '2002'},
        {vintage: '2003'},
        {vintage: '2004'},
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
            
            <Divider className={classes.divider} />
            
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
            
            <Divider className={classes.divider} />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                
                <Grid container className={classes.container_collapse} spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <LeafIcon className={classes.svg_icon} />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="body2" className={classes.content_label}>
                            Vintage
                        </Typography>
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Autocomplete  
                        size="small"
                        className={classes.autocomplete_vintage}
                        id="vintage"
                        fullWidth
                        freeSolo
                        onChange={(event,value) => console.log(value)} 
                        clearOnEscape
                        handleHomeEndKeys
                        options={vintages.map((option) => option.vintage)}
                        renderInput={(params) => (
                            <div>
                                <TextField
                                className={classes.text_field_vintage}
                                id="vintage"
                                size="small"
                                type="number"
                                {...params}
                                onChange={console.log('CHANGED')} 
                                label="Vintage" 
                                margin="none" 
                                variant="outlined"
                                color={props.darkMode == true ? "primary" : "secondary"}
                                />
                            </div>
                        )}
                        />
                    </Grid>       
                </Grid> 
        
                <Grid container className={classes.container_collapse} spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <WineBottleIcon className={classes.svg_icon} />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="body2" className={classes.content_label}>
                            Size
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                    <Autocomplete  
                        size="small"
                        className={classes.autocomplete_vintage}
                        id="vintage"
                        fullWidth
                        freeSolo
                        onChange={(event,value) => console.log(value)} 
                        clearOnEscape
                        handleHomeEndKeys
                        options={vintages.map((option) => option.vintage)}
                        renderInput={(params) => (
                            <div>
                                <TextField
                                className={classes.text_field_vintage}
                                id="vintage"
                                size="small"
                                {...params}
                                onChange={console.log('CHANGED')} 
                                label="Vintage" 
                                margin="none" 
                                variant="outlined"
                                color={props.darkMode == true ? "primary" : "secondary"}
                                />
                            </div>
                        )}
                        />
                    </Grid>       
                </Grid> 
        
                <Grid container className={classes.container_collapse} spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <SortIcon className={classes.svg_icon} />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="body2" className={classes.content_label}>
                            Units
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.colour}
                        </Typography>
                    </Grid>       
                </Grid>

                <Grid container className={classes.container_collapse} spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <CompassIcon className={classes.svg_icon} />
                    </Grid>       
                    <Grid item xs={3}>
                        <Typography variant="body2" className={classes.content_label}>
                            Location
                        </Typography >
                    </Grid>
                    <Grid item xs={8} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.colour}
                        </Typography>
                    </Grid>       
                </Grid>

                <Divider className={classes.divider} />

                <Grid container className={classes.container_collapse} spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <StoreIcon className={classes.svg_icon} />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="body2" className={classes.content_label}>
                            Store
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.colour}
                        </Typography>
                    </Grid>       
                </Grid>

                <Grid container className={classes.container_collapse} spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <MonetizationOnOutlinedIcon className={classes.icon} />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="body2" className={classes.content_label}>
                            Cost
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.colour}
                        </Typography>
                    </Grid>       
                </Grid>

                <Grid container className={classes.container_collapse} spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <EventAvailableIcon className={classes.icon} />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="body2" className={classes.content_label}>
                            Added
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.colour}
                        </Typography>
                    </Grid>       
                </Grid>

            </Collapse>
        </Card>
    );
}