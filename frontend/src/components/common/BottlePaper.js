import React, { useEffect, useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';


import Badge from '@material-ui/core/Badge';
import CardHeader from '@material-ui/core/CardHeader';
import LinearProgress from '@material-ui/core/LinearProgress';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import KitchenIcon from '@material-ui/icons/Kitchen';
import SortIcon from '@material-ui/icons/Sort';

import { WineGlassIcon } from './SvgIcons';


const useStyles = makeStyles((theme) => ({
    bottle_paper: {
        height: screen.availHeight * 0.68,
        //overflowY: 'scroll',
        margin: theme.spacing(0, 2),
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    }
}));


export default function BottlePaper(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const bottle = props.bottle;
    
    

    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
    }
    const classes = useStyles(mystyleprops);


    
    
    return (
        <Paper className={classes.bottle_paper} elevation={3}>
            <Typography variant="h3">
                BOTTLE PAPER
                {bottle.display_name}
            </Typography>
        </Paper>
    );
} 