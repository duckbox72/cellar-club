import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';

import Typography from '@material-ui/core/Typography';


export default function BottleList(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const bottleName = props.bottleName;

    const useStyles = makeStyles((theme) => ({
        list: {
            margin: theme.spacing(0, 2),
            borderRadius: 10,
            backgroundColor: darkMode ? brown[600] : theme.palette.common.white
        },
    }));

    const classes = useStyles();



    return (
        <div className={classes.list}>
            <Typography variant="body1" color="initial">
                Bottle List
            </Typography>
        </div>
    );
}