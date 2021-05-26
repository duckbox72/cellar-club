import React, { useEffect, useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';

import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import PublicIcon from '@material-ui/icons/Public';
import SortIcon from '@material-ui/icons/Sort';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbsUpDownOutlinedIcon from '@material-ui/icons/ThumbsUpDownOutlined';

import { GlassWhiskeyIcon, WineBottleIcon, WineGlassIcon } from './SvgIcons';


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
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(1,0,1,0),
        }, 
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
        color: mystyleprops => mystyleprops.colorSchemaA,
    },

    list_item: {
        '&:hover': {
            backdropFilter: 'invert(10%)',
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
    },
    list_item_subheader_icon:{
        width: theme.spacing(1.75),
        height: theme.spacing(1.75),
        margin: theme.spacing(0, 0.5),
    },
}));


export default function CommunityReviewsList(props) {

    const darkMode = props.darkMode;
    const reviewDisplayName = props.reviewDisplayName;
    const reviewsList = props.reviewsList != null ? props.reviewsList : [];
    const reviewsListLength = props.reviewsListLength != null ? props.reviewsListLength : null;
    

    const [sortByMenuAnchor, setSortByMenuAnchor] = useState(null);
    const [sortByLabel, setSortByLabel] = useState('Recent Community Notes')


    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
    }
    const classes = useStyles(mystyleprops);

    
    const handleItemClick = (review) => {
        window.scrollTo(0, 0);
        props.history.push({
            pathname: '/review',
            //search: '?query=abc',
            state: { review: review }
        });
    }


    const handleItemActionClick = (review) => {
        window.scrollTo(0, 0);
        props.history.push({
            pathname: '/review',
            //search: '?query=abc',
            state: { review: review }
        });
    }
    

    const reviewsListItems = (reviewsList) => {
        if (reviewsList) {
            return reviewsList.map(review => (
                <div className={classes.list_item}>
                    <ListItem
                    //button 
                    key={review.id} 
                    //onClick={() => handleItemClick(review)}
                    >    
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.list_item_title}>
                                {review.type === 'Spirit' ?
                                        <GlassWhiskeyIcon 
                                        className={classes.list_item_color_icon}
                                        style={{color: 'silver'}}
                                        />
                                        :
                                        <WineGlassIcon 
                                        className={classes.list_item_color_icon}
                                        // review icon color  
                                        style={review.colour === 'Red' ? {color: 'maroon'} : review.colour === 'White' ? {color: 'tan'} : review.colour === 'Rose' ? {color: 'lightcoral'} : review.type === 'Fortified Wine' ? {color: 'firebrick'} : {color: 'silver'}}
                                        /> 
                                    } {review.vintage} {review.display_name}
                            </Typography>    
                        }
                        secondary={ 
                            <Typography variant="body2" color="textSecondary" className={classes.list_item_subheader}>
                                {`On ${new Date(review.date_tasted).toUTCString().slice(5, 16)} ${review.user.username.toUpperCase()} rated `} 
                                
                                {review.like_status === 'like'
                                ? <Tooltip title="Like">
                                    <ThumbUpOutlinedIcon color={darkMode ? 'primary' : 'secondary'} className={classes.list_item_subheader_icon} />
                                </Tooltip>
                                : review.like_status === 'neutral'
                                    ?   <Tooltip title="Neutral">
                                            <ThumbsUpDownOutlinedIcon color={darkMode ? 'primary' : 'secondary'} className={classes.list_item_subheader_icon} />
                                        </Tooltip>
                                    :   <Tooltip title="Dislike">
                                            <ThumbDownOutlinedIcon color={darkMode ? 'primary' : 'secondary'} className={classes.list_item_subheader_icon} />
                                        </Tooltip>
                                }    
                            </Typography>
                        } 
                        />
                            <Typography variant="body2" className={classes.list_item_title}>
                                {review.score ? `${review.score}/100` : 'NR'}
                            </Typography>    
                    </ListItem>
                    <ListItem divider >
                        {review.tasting_note 
                            ? <Typography variant="body2" className={classes.list_item_title}>
                                {`"${review.tasting_note}"`}
                            </Typography>
                            : <></>
                        } 
                    </ListItem>
                </div>        
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
        reviewsList.sort((a,b) => (a.date_tasted < b.date_tasted) ? 1 : -1);
        setSortByLabel('Recent Community Notes');
        handleSortByMenuClose();
    }
    
    // sort  increase display_name  increase date order
    const handleSortNameAZClick = (event) => {
        reviewsList.sort((a,b) => (a.display_name > b.display_name) ? 1 : (a.display_name === b.display_name) ? ((a.vintage > b.vintage) ? 1 : -1) : -1);
        
        if (reviewDisplayName === null) {
            setSortByLabel('Name A-Z');
            
        } else {
            setSortByLabel('Vintage Up')
        }

        handleSortByMenuClose();
    }

    // sort  decrease display_name decrease date order
    const handleSortNameZAClick = (event) => {   
        
        if (reviewDisplayName === null) {
            reviewsList.sort((a,b) => (a.display_name < b.display_name) ? 1 : (a.display_name === b.display_name) ? ((a.vintage > b.vintage) ? 1 : -1) : -1)
            setSortByLabel('Name Z-A');
        
        } else {
            reviewsList.sort((a,b) => (a.display_name < b.display_name) ? 1 : (a.display_name === b.display_name) ? ((a.vintage < b.vintage) ? 1 : -1) : -1)
            setSortByLabel('Vintage Down');
        }

        handleSortByMenuClose();
    }


    const handleListChange = () => {
        console.log('THE LIST HAS CHANGED')
    }
    

    useEffect(() => {
        setSortByLabel('Recent Community Notes')
    }, [reviewDisplayName],);


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
                        <MenuItem dense onClick={handleSortRecentlyAddedClick}>Recent Community Notes</MenuItem>
                        <MenuItem dense onClick={handleSortNameAZClick}>{reviewDisplayName === null ? 'Name A-Z' : 'Vintage Up'}</MenuItem>
                        <MenuItem dense onClick={handleSortNameZAClick}>{reviewDisplayName === null ? 'Name Z-A' : 'Vintage Down'}</MenuItem>
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
                        badgeContent={reviewsListLength} 
                        >
                            <PublicIcon className={classes.icon_numof_consumed} />
                        </Badge>
                    </IconButton>
                </Grid>
            </ListItem>
 
            
            { reviewsListLength === null ?
                <LinearProgress color={darkMode ? 'primary' : 'secondary'}/>
                : 
                reviewsListLength > 0
                    ?
                    <List onChange={handleListChange} className={classes.list_body} dense>                    
                        {reviewsListItems(reviewsList)}
                    </List>
                    :
                    <Typography
                    align="center"
                    variant="body1"
                    style={{margin: theme.spacing(2), paddingBottom: theme.spacing(2), alignItems: 'center'}}
                    >
                        No tasting reviews added yet
                    </Typography>
            }
        </Paper>
    );
}