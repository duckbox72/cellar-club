import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import Autocomplete from '@material-ui/lab/Autocomplete';

import DateFnsUtils from '@date-io/date-fns'; //choose lib in future
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Avatar, Button, Card, CardHeader, Collapse, Divider, Grid, IconButton, TextField, Tooltip, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CloseIcon from '@material-ui/icons/Close';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import CompareArrowsOutlinedIcon from '@material-ui/icons/CompareArrowsOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RemoveIcon from '@material-ui/icons/Remove'
import ShareIcon from '@material-ui/icons/Share';

import { CompassIcon, GlassCheersIcon, SortIcon, StoreIcon, WineBottleIcon } from './SvgIcons';

import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';

import { getBottleSizesOptions } from "../utils/getBottleSizesOptions";


export default function LwinProfileCard(props) {

    const darkMode = props.darkMode;
    const LwinData = props.LwinData;
    
    const useStyles = makeStyles((theme) => ({
        avatar: {
            backgroundColor: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        card: {
            margin: theme.spacing(0, 2),
            paddingBottom: theme.spacing(1), 
            borderRadius: 10,
            backgroundColor: darkMode ? brown[600] : theme.palette.common.white ,//brown[600]//amber[50],
        },
        container_actions: {
            padding: theme.spacing(1, 1.25, 1, 1),
        },
        container_collapse: {
            padding: theme.spacing(1,2),
        },
        divider: {
            margin: theme.spacing(1, 1, 0, 1),
        },
        expand: {
            transform: 'rotate(0deg)',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },        
        header: {
            //marginRight: theme.spacing(0.75),
            //backgroundColor: darkMode ? brown[600] : '#FFFFFF',//amber[50],   
        },
        header_title: {
            fontWeight: 600,
            fontSize: theme.spacing(2),                
        },
        header_subheader: {
            fontWeight: 500,
        },
        iconbutton_wslogo: {
            height: theme.spacing(6.5),
            width: theme.spacing(6.5),
            marginLeft: 'auto',
            
        },
        avatar_wslogo: {
            backgroundImage: "url(/static/images/ws-logo-nobg.png)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: darkMode ? theme.palette.secondary.main : theme.palette.text.secondary,
        },
        
        icon: { 
            color: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        section_title: {
            //backgroundColor: darkMode ? theme.palette.secondary.dark : theme.palette.primary.main,
            textAlign: "center",
        },
        svg_icon: { 
            height: theme.spacing(2.5),
            width: theme.spacing(2.5),
            color: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        button: { 
            margin: theme.spacing(1),
            borderRadius: 10,
        }
    }));

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [selectedDate, handleDateChange] = useState(null);

    const bottleSizes = getBottleSizesOptions();
    
    
    
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
            </Grid>

            <Divider />

            <CardHeader
            disableTypography={true}
            className={classes.header}
            avatar={
                <WineBottleIcon className={classes.svg_icon} />
            }
            action={
                <Tooltip title="Add to my cellar">
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


            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <Divider className={classes.divider} />
                
                <form>
                    <Grid container className={classes.container_collapse} spacing={1} justify="space-evenly" >
                        
                        <Grid item xs={6}>
                                <Typography size="small" variant="button">
                                    Add to my cellar
                                </Typography>
                        </Grid>

                        <Grid item xs={4}>
                                
                        </Grid>
                                        
                        <Grid item xs={6}>
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
                                    color={darkMode == true ? "primary" : "secondary"}
                                    />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Autocomplete  
                            size="small"
                            id="size"
                            fullWidth
                            freeSolo
                            onChange={(event,value) => console.log(value)} 
                            clearOnEscape
                            options={bottleSizes}
                            renderInput={(params) => (
                                <Grid container spacing={1} justify="center" alignItems="center">
                                    <Grid item >
                                        <ImportExportIcon className={classes.svg_icon} />
                                    </Grid>   

                                    <Grid item xs={8}>
                                        <TextField
                                        id="size"
                                        {...params}
                                        onChange={console.log('CHANGED')} 
                                        label="Size" 
                                        variant="standard"
                                        color={darkMode == true ? "primary" : "secondary"}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>

                        <Grid item xs={6}>
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
                                        color={darkMode == true ? "primary" : "secondary"}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>

                        <Grid item xs={6}>
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
                                        color={darkMode == true ? "primary" : "secondary"}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>  

                        <Grid item xs={12}>
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
                                        color={darkMode == true ? "primary" : "secondary"}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            />   
                        </Grid>    

                    </Grid> 

                    <Divider className={classes.divider} />

                    <Grid container className={classes.container_collapse} spacing={1} alignItems="center" justify="center" >
                        
                    <Grid item xs={6}>
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
                                        color={darkMode == true ? "primary" : "secondary"}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                                
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
                                    color={darkMode == true ? "primary" : "secondary"}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                                
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item >
                                    <EventAvailableIcon className={classes.icon} />
                                </Grid>   

                                <Grid item xs={8}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                        autoOk
                                        clearable 
                                        value={selectedDate} 
                                        label="Date"
                                        format="MM/dd/yyyy"
                                        inputVariant="standard"
                                        onChange={handleDateChange}
                                        color={darkMode == true ? "primary" : "secondary"}
                                        fullWidth
                                        disableToolbar
                                        showTodayButton
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                                
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
                                    color={darkMode == true ? "primary" : "secondary"}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                       
                        <Grid item xs={12} container spacing={0} style={{ marginTop: 12 }} justify="space-around">
                            <Grid item xs={4}>
                                <Button
                                fullWidth
                                className={classes.button}   
                                variant="contained" 
                                color="default"
                                startIcon={<CloseIcon />}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                disabled={false}
                                fullWidth
                                className={classes.button} 
                                variant="contained" 
                                color={ darkMode ? "secondary" : "primary" } 
                                startIcon={<PlaylistAddCheckIcon />}
                                >    
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </form>    
            </Collapse>
        </Card>
    );
}