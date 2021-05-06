import React, { useEffect, useState } from 'react';

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

import KitchenIcon from '@material-ui/icons/Kitchen';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SortIcon from '@material-ui/icons/Sort';

import { WineGlassIcon } from './SvgIcons';


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
        margin: theme.spacing(1,1,1,0),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    feed_name_label: {
        fontSize: theme.spacing(2),
        margin: theme.spacing(1,1.5,1,0),
        color: mystyleprops => mystyleprops.colorSchemaA,
        marginLeft: 'auto',
    },
    icon_numof_bottles: { 
        margin: theme.spacing(1,1.5,0,0),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    list_item_avatar_container: {
        textAlign: 'center', 
        marginLeft: -theme.spacing(2)
    },

    list_item_avatar: {
        fontWeight: 500,
        //fontSize: theme.spacing(2),   
        //color: mystyleprops => mystyleprops.colorSchemaA,       
    },
    list_item_title: {
        fontWeight: 500,
        //fontSize: theme.spacing(2),    
        //color: mystyleprops => mystyleprops.colorSchemaA,       
    },
    list_item_subheader: {
        fontWeight: 400,
    },
    list_item_color_icon: { 
        //margin: theme.spacing(1,1.5,0,0),
        height: theme.spacing(1.25),
        width: theme.spacing(1.25),
    },
}));


export default function MemoriesList(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const displayName = props.displayName;
    const memoriesList = props.memoriesList != null ? props.memoriesList : [];
    const memoriesListLength = props.memoriesListLength != null ? props.memoriesListLength : 0;
    

    const [sortByMenuAnchor, setSortByMenuAnchor] = useState(null);
    const [sortByLabel, setSortByLabel] = useState('Recently Added')


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
                            <Typography variant="subtitle2" classeName={classes.list_item_avatar}>
                                {memory.vintage}
                            </Typography>
                            <Typography variant="caption">
                                <WineGlassIcon 
                                className={classes.list_item_color_icon}
                                // memory icon color  
                                style={memory.colour === 'Red' ? {color: 'maroon'} : memory.colour === 'White' ? {color: 'tan'} : memory.colour === 'Rose' ? {color: 'lightcoral'} : {color: 'grey'}}
                                /> {memory.size}
                            </Typography>
                        </div>
                    </ListItemAvatar>     
                    <ListItemText
                    
                    primary={
                        <Typography variant="body2" className={classes.list_item_title}>
                            {memory.display_name}
                        </Typography>    
                    }
                    secondary={
                        <Typography variant="body2" color="textSecondary" className={classes.list_item_subheader}>
                            {`${memory.colour} ${memory.region}, ${memory.country}`} 
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
        setSortByLabel('Recently Added');
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
        setSortByLabel('Recently Added')
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
                        <MenuItem dense onClick={handleSortRecentlyAddedClick}>Recently Added</MenuItem>
                        <MenuItem dense onClick={handleSortNameAZClick}>{displayName === null ? 'Name A-Z' : 'Vintage Up'}</MenuItem>
                        <MenuItem dense onClick={handleSortNameZAClick}>{displayName === null ? 'Name Z-A' : 'Vintage Down'}</MenuItem>
                    </Menu>

                    <Typography variant={'button'} className={classes.sort_by_label}>{sortByLabel}</Typography> 
                    <Typography small variant={'button'} className={classes.feed_name_label}>Items</Typography>
                
                    <Badge 
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    color={darkMode ? 'primary' : 'secondary'}
                    badgeContent={memoriesListLength} 
                    >
                        <KitchenIcon className={classes.icon_numof_bottles} />
                    </Badge>
                    
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