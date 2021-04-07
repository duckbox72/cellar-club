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
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import KitchenIcon from '@material-ui/icons/Kitchen';
import SortIcon from '@material-ui/icons/Sort';

import { WineGlassIcon } from './SvgIcons';


const useStyles = makeStyles((theme) => ({
    bottle: {

    }
}));


export default function BottleList(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const bottleName = props.bottleName;
    //const bottleList = props.bottleList != null ? props.bottleList : [];
    const bottleListLength = props.bottleListLength != null ? props.bottleListLength : 0;
    

    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
    }
    const classes = useStyles(mystyleprops);


    
    
    return (
        <div className={classes.bottle}>
            
        </div>
    );
} 