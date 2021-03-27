import React, { useEffect, useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';

import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    list: {
        margin: theme.spacing(0, 2),
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
}));


export default function BottleList(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const bottleName = props.bottleName;

    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white
    }
    const classes = useStyles(mystyleprops);


    return (
        <div className={classes.list}>
            <Typography variant="body1" color="initial">
                Bottle List
            </Typography>
        </div>
    );
}