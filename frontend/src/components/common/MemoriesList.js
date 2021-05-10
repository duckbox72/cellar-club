import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';

import Badge from '@material-ui/core/Badge';
import LinearProgress from '@material-ui/core/LinearProgress';


import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import CommentIcon from '@material-ui/icons/Comment';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SortIcon from '@material-ui/icons/Sort';
import StarIcon from '@material-ui/icons/Star';
import StarOutlinedIcon from '@material-ui/icons/StarOutline';

import { GlassCheersIcon, WineBottleIcon,WineGlassIcon } from './SvgIcons';


const useStyles = makeStyles((theme) => ({
    list_paper: {
        margin: theme.spacing(0, 2),
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
        width: window.width,
    },
    list_body: {
        maxHeight: screen.availHeight * 0.48,
        overflowY: 'scroll',
    },
    sort_by_icon: {
        margin: theme.spacing(1,1,1,0),
    },
    sort_by_label: {
        fontSize: theme.spacing(2),
        margin: theme.spacing(1,0,1,0),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },

    iconbutton_consumed: {
        width: theme.spacing(6),
        height:theme.spacing(6), 
        marginLeft: 'auto',
        marginRight: theme.spacing(1),
    },
    icon_numof_consumed: {
        width: theme.spacing(2.75),
        height:theme.spacing(2.75), 
        //transform: 'rotate(270deg)',
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    
    
    list_item_avatar_container: {
        textAlign: 'center', 
        marginLeft: -theme.spacing(2)
    },
    list_item_avatar: {
        fontWeight: 400,
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(1.75),
        },          
    },
    list_item_avatar_size: {
        fontSize: theme.spacing(1.75),
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(1.5),
        },          
    },
    list_item_color_icon: { 
        height: theme.spacing(1.5),
        width: theme.spacing(1.5),
        [theme.breakpoints.down('xs')]: {
            height: theme.spacing(1.25),
            width: theme.spacing(1.25),
        }, 
    },
    list_item_title: {
        fontWeight: 400,
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(1.75),
        },           
    },
    list_item_subheader: {
        fontWeight: 400,
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(1.75),
        }, 
        //color: mystyleprops => mystyleprops.colorSchemaA,
    },
    list_item_subheader_icon:{
        width: theme.spacing(1.75),
        height: theme.spacing(1.75),
        margin: theme.spacing(0, 0.5),
    },
}));


export default function MemoriesList(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const displayName = props.displayName;
    const memoriesList = props.memoriesList != null ? props.memoriesList : [];
    const memoriesListLength = props.memoriesListLength != null ? props.memoriesListLength : 0;
    

    const [sortByMenuAnchor, setSortByMenuAnchor] = useState(null);
    const [sortByLabel, setSortByLabel] = useState('Recently Consumed')


    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
    }
    const classes = useStyles(mystyleprops);

    
    const handleItemClick = (memory) => {
        window.scrollTo(0, 0);
        props.history.push({
            pathname: '/memory',
            //search: '?query=abc',
            state: { memory: memory }
        });
    }


    const handleItemActionClick = (memory) => {
        window.scrollTo(0, 0);
        props.history.push({
            pathname: '/memory',
            //search: '?query=abc',
            state: { memory: memory }
        });
    }
    

    const memoriesListItems = (memoriesList) => {
        if (memoriesList) {
            return memoriesList.map(memory => (
                <ListItem 
                button 
                key={memory.id} 
                onClick={() => handleItemClick(memory)}
                divider
                >
                    <ListItemAvatar>
                        <div className={classes.list_item_avatar_container}>
                            <Typography variant="subtitle2" className={classes.list_item_avatar}>
                                {memory.bottle.vintage}
                            </Typography>
                            <Typography variant="caption" className={classes.list_item_avatar_size}>
                                <WineGlassIcon 
                                className={classes.list_item_color_icon}
                                // memory icon color  
                                style={memory.bottle.colour === 'Red' ? {color: 'maroon'} : memory.bottle.colour === 'White' ? {color: 'tan'} : memory.bottle.colour === 'Rose' ? {color: 'lightcoral'} : {color: 'grey'}}
                                /> {memory.bottle.size}
                            </Typography>
                        </div>
                    </ListItemAvatar>     
                    <ListItemText
                    
                    primary={
                        <Typography variant="body2" className={classes.list_item_title}>
                            {memory.bottle.display_name}
                        </Typography>    
                    }
                    secondary={ 
                        <Typography variant="body2" color="textSecondary" className={classes.list_item_subheader}>
                            {`${memory.reason.split(" ", 1)}, ${new Date(memory.date_consumed).toUTCString().slice(5, 16)}`} 
                            {' '}
                            {memory.private_note
                            ? <Tooltip title="Private note">
                                <CommentIcon color={darkMode ? 'primary' : 'secondary'} className={classes.list_item_subheader_icon} />
                              </Tooltip>
                            : <Tooltip title="No private Note">
                                <CommentOutlinedIcon className={classes.list_item_subheader_icon} />
                              </Tooltip>
                            }

                            {memory.gathered
                            ? <Tooltip title="Money gathered">
                                <MonetizationOnIcon color={darkMode ? 'primary' : 'secondary'} className={classes.list_item_subheader_icon} />
                              </Tooltip>
                            : <Tooltip title="No money gathered">
                                <MonetizationOnOutlinedIcon className={classes.list_item_subheader_icon} />
                              </Tooltip>
                            }

                            {memory.has_review
                            ? <Tooltip title="Review">
                                <StarIcon color={darkMode ? 'primary' : 'secondary'} className={classes.list_item_subheader_icon} />
                              </Tooltip>
                            : <Tooltip title="No review">
                                <StarOutlinedIcon className={classes.list_item_subheader_icon} />
                              </Tooltip>
                            }
                        </Typography>
                    } 
                    />    
                    <ListItemSecondaryAction>
                        <IconButton 
                        key={memory.id} 
                        onClick={() => handleItemActionClick(memory)}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>        
            ));
        }     
    };


    const handleSortByMenuClick = (event) => {
        setSortByMenuAnchor(event.currentTarget);
    }


    const handleSortByMenuClose = (event) => {
        setSortByMenuAnchor(null);
    }


    const handleSortRecentlyAddedClick = (event) => {
        memoriesList.sort((a,b) => (a.created < b.created) ? 1 : -1);
        setSortByLabel('Recently Consumed');
        handleSortByMenuClose();
    }
    
    // sort  increase display_name  increase date order
    const handleSortNameAZClick = (event) => {
        memoriesList.sort((a,b) => (a.display_name > b.display_name) ? 1 : (a.display_name === b.display_name) ? ((a.vintage > b.vintage) ? 1 : -1) : -1);
        
        if (displayName === null) {
            setSortByLabel('Name A-Z');
            
        } else {
            setSortByLabel('Vintage Up')
        }

        handleSortByMenuClose();
    }

    // sort  decrease display_name decrease date order
    const handleSortNameZAClick = (event) => {   
        
        if (displayName === null) {
            memoriesList.sort((a,b) => (a.display_name < b.display_name) ? 1 : (a.display_name === b.display_name) ? ((a.vintage > b.vintage) ? 1 : -1) : -1)
            setSortByLabel('Name Z-A');
        
        } else {
            memoriesList.sort((a,b) => (a.display_name < b.display_name) ? 1 : (a.display_name === b.display_name) ? ((a.vintage < b.vintage) ? 1 : -1) : -1)
            setSortByLabel('Vintage Down');
        }

        handleSortByMenuClose();
    }


    const handleListChange = () => {
        console.log('THE LIST HAS CHANGED')
    }
    

    useEffect(() => {
        setSortByLabel('Recently Consumed')
    }, [displayName],);


    return (
        <Paper className={classes.list_paper} elevation={3}>
            <ListItem divider>
                <Grid container spacing={2} alignItems="center">     
                    <Tooltip title="Sort By">
                        <IconButton className={classes.sort_by_icon}
                        aria-controls="sort-by-menu"
                        aria-haspopup="true"
                        onClick={handleSortByMenuClick}
                        >
                            <SortIcon />
                        </IconButton>
                    </Tooltip>

                    <Menu
                    id="sort-by-menu"
                    anchorEl={sortByMenuAnchor}
                    keepMounted
                    open={Boolean(sortByMenuAnchor)}
                    onClose={handleSortByMenuClose}
                    >
                        <MenuItem dense onClick={handleSortRecentlyAddedClick}>Recently Consumed</MenuItem>
                        <MenuItem dense onClick={handleSortNameAZClick}>{displayName === null ? 'Name A-Z' : 'Vintage Up'}</MenuItem>
                        <MenuItem dense onClick={handleSortNameZAClick}>{displayName === null ? 'Name Z-A' : 'Vintage Down'}</MenuItem>
                    </Menu>

                    <Typography variant={'button'} className={classes.sort_by_label}>
                        {sortByLabel}
                    </Typography> 
                    
                    <IconButton className={classes.iconbutton_consumed}>
                        <Badge 
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        color={darkMode ? 'primary' : 'secondary'}
                        badgeContent={memoriesListLength} 
                        >
                            <WineBottleIcon className={classes.icon_numof_consumed} />
                        </Badge>
                    </IconButton>
                </Grid>
            </ListItem>

            
            { memoriesListLength === 0 ?
            <LinearProgress color={darkMode ? 'primary' : 'secondary'}/>
                :
            <List onChange={handleListChange} className={classes.list_body} dense>                    
                {memoriesListItems(memoriesList)}
            </List>
            }
        </Paper>
    );
}