import React, { useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        //alignItems: 'center',
        margin: theme.spacing(2),    
        border: '1px solid',
        borderColor: theme.palette.grey[300],   
    },
}));


export default function WineProfile() {
    const classes = useStyles();

    return (
        
        <Paper className={classes.root} elevation={0}>
            <Typography variant="body1"color="initial">
                tHIS iS MY wINE pROFILE
            </Typography>
        </Paper>
        
    );
}