import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';

import Badge from '@material-ui/core/Badge';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import KitchenIcon from '@material-ui/icons/Kitchen';
import SortIcon from '@material-ui/icons/Sort';


const useStyles = makeStyles((theme) => ({
    list: {
        margin: theme.spacing(0, 2),
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
        width: window.width,
    },
    list_body: {
        maxHeight: screen.availHeight * 0.5,
        overflowY: 'scroll',
    },
    sort_by_icon: {
        margin: theme.spacing(1,1,0,0),
    },
    sort_by_label: {
        margin: theme.spacing(1,1,0,0),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    feed_name_label: {
        margin: theme.spacing(1,1.5,0,0),
        color: mystyleprops => mystyleprops.colorSchemaA,
        marginLeft: 'auto',
    },
    icon_numof_bottles: { 
        margin: theme.spacing(1,1.5,0,0),
        //height: theme.spacing(2.5),
        //width: theme.spacing(2.5),
        //paddingTop: theme.spacing(1.5),
        //color: mystyleprops => mystyleprops.SvgIconHeaderColor,
        //transform: 'rotate(315deg)', 
    },
    divider: {
        margin: theme.spacing(0, 2),
    },   
}));


export default function BottleList(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const bottleName = props.bottleName;
    const bottleList = props.bottleList != null ? props.bottleList : [];
    const bottleListLength = props.bottleListLength != null ? props.bottleListLength : 0;
    
    const [sortByMenuAnchor, setSortByMenuAnchor] = useState(null);
    const [sortByLabel, setSortByLabel] = useState('Recently Added')


    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
    }
    const classes = useStyles(mystyleprops);


    const bottleListItems = (bottles) => {
        if (bottles) {
            return bottles.map(bottle => (
                <>
                <Divider className={classes.divider} />
                <CardHeader
                id={bottle.id} 
                key={bottle.id}
                avatar={
                    <div style={{textAlign: 'center'}}>
                        <Typography variant="body2">
                            {bottle.vintage}
                        </Typography>
                        <Typography variant="caption" style={{textAlign: 'center'}}>
                            {bottle.colour}
                        </Typography>
                    </div>
                }
                action={
                    <IconButton key={bottle.id} aria-label="TODO">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={bottle.display_name}
                subheader={`${bottle.colour} ${bottle.region}, ${bottle.country}`}
                />
                </>
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
        bottleList.sort((a,b) => (a.created < b.created) ? 1 : -1);
        setSortByLabel('Recently Added');
        handleSortByMenuClose();
    }
    
    // sort  increase display_name  increase date order
    const handleSortNameAZClick = (event) => {
        bottleList.sort((a,b) => (a.display_name > b.display_name) ? 1 : (a.display_name === b.display_name) ? ((a.vintage > b.vintage) ? 1 : -1) : -1);
        
        if (bottleName === null) {
            setSortByLabel('Name A-Z');
            
        } else {
            setSortByLabel('Vintage Up')

        }

        handleSortByMenuClose();
    }

    // sort  decrease display_name decrease date order
    const handleSortNameZAClick = (event) => {   
        
        if (bottleName === null) {
        bottleList.sort((a,b) => (a.display_name < b.display_name) ? 1 : (a.display_name === b.display_name) ? ((a.vintage > b.vintage) ? 1 : -1) : -1)
        setSortByLabel('Name Z-A');
        
        } else {
            bottleList.sort((a,b) => (a.display_name < b.display_name) ? 1 : (a.display_name === b.display_name) ? ((a.vintage < b.vintage) ? 1 : -1) : -1)
            setSortByLabel('Vintage Down');
        }

        handleSortByMenuClose();
    }


    const handleListChange = () => {
        console.log('THE LIST HAS CHANGED')
    }
    

    useEffect(() => {
        setSortByLabel('Recently Added')
    }, [bottleName],);
    
    return (
        <div className={classes.list}>
            <ListItem>
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
                        <MenuItem dense onClick={handleSortNameAZClick}>{bottleName === null ? 'Name A-Z' : 'Vintage Up'}</MenuItem>
                        <MenuItem dense onClick={handleSortNameZAClick}>{bottleName === null ? 'Name Z-A' : 'Vintage Down'}</MenuItem>
                    </Menu>

                    <Typography variant={'button'} className={classes.sort_by_label}>{sortByLabel}</Typography> 
                    <Typography small variant={'button'} className={classes.feed_name_label}>Items</Typography>
                
                    <Badge 
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    color={darkMode ? 'primary' : 'secondary'}
                    badgeContent={bottleListLength} 
                    >
                        <KitchenIcon className={classes.icon_numof_bottles} />
                    </Badge>
                    
                </Grid>
            </ListItem>
            <List onChange={handleListChange} className={classes.list_body}>
                {bottleListItems(bottleList)}
            </List>
        </div>
    );
}