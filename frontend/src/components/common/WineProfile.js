import React, { useState } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
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
            <Grid container spacing={1} direction="column">
                <Grid item>
                    <Typography variant="body1"color="initial">
                        lwin - 
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        display_name - 
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        producer_title, producer_name
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        wine - 
                    </Typography>
                </Grid>
              
            </Grid>
        </Paper>
        
    );
}