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


export default function WineProfile(props) {
    const classes = useStyles();
    const LwinData = props.LwinData;

    return (
        
        <Paper className={classes.root} elevation={0}>
            <Grid container spacing={1} direction="column">
                <Grid item>
                    <Typography variant="body1"color="initial">
                        lwin - {LwinData.lwin}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        display_name - {LwinData.display_name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        producer_title, producer_name - {LwinData.producer_title} {LwinData.producer_name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        wine - {LwinData.wine}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        country - {LwinData.country}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        region - {LwinData.region}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        sub_region - {LwinData.sub_region}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        site - {LwinData.site}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        colour - {LwinData.colour}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"color="initial">
                        designation - {LwinData.designation}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" color="initial">
                        classification - {LwinData.classification}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}