import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';

import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import FilterListIcon from '@material-ui/icons/FilterList';


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
}));


export default function BottleList(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const bottleName = props.bottleName;
    const bottleList = props.bottleList != null ? props.bottleList : [];
    const bottleListLength = props.bottleListLength != null ? props.bottleListLength : 0;


    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
    }
    const classes = useStyles(mystyleprops);


    const bottleListItems = (bottles) => {
        if (bottles) {
            return bottles.map(bottle => (
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
                    <IconButton key={bottle.id} aria-label="">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={bottle.display_name}
                subheader={`${bottle.colour} ${bottle.region}, ${bottle.country}`}
                />
            ));
        }     
    };
    
    
    return (
        <div className={classes.list}>
            <ListItem>
                <Grid container spacing={2} alignItems="center">     
                    <Tooltip title="Filter List">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography variant={'button'}>Recently Added</Typography> 
                </Grid>
            </ListItem>
            <List className={classes.list_body}>
                {bottleListItems(bottleList)}
            </List>
        </div>
    );
}