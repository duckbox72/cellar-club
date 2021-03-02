import React, { useState } from 'react';
import { Avatar, Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { InvertColors, MoreVert as MoreVertIcon, TripOrigin } from '@material-ui/icons'

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

export default function LwinProfileCard(props) {
    const useStyles = makeStyles(theme => ({
        card: {
            margin: theme.spacing(1),    
        },
        content_icon: {
            textAlign: "center",
        },
        content_info: {
            color: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
            textAlign: "right",
            
        },
        content_label: {

        },
        divider: {
            margin: theme.spacing(1),
        },
    }));



    const classes = useStyles();
    const LwinData = props.LwinData;

    const origin = `${LwinData.region}, ${LwinData.country}`

    return (
        <Card className={classes.card}>
            <CardHeader
            avatar={
                <Avatar  aria-label="">
                   <InfoOutlinedIcon />
                </Avatar>
            }
            action={
                <IconButton aria-label="">
                    <MoreVertIcon />
                </IconButton>
            }
            title={LwinData.display_name}
            subheader={origin}
            
            />
            
            <Divider  className={classes.divider} />

            <CardContent>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <LocationCityOutlinedIcon fontSize="small" />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="body2" className={classes.content_label}>
                            Producer
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.producer_title === "nan" ? "" : LwinData.producer_title} {LwinData.producer_name}
                        </Typography>
                    </Grid>       
                </Grid> 
            </CardContent>
            
            

            <CardContent>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <LocationOnOutlinedIcon
                         fontSize="small" />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="body2" className={classes.content_label}>
                            Origin
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.region}, {LwinData.country}
                        </Typography>
                    </Grid>       
                </Grid> 
            </CardContent>
            
        

            <CardContent>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <InvertColors fontSize="small" />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="body2" className={classes.content_label}>
                            Color
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.colour}
                        </Typography>
                    </Grid>       
                </Grid> 
            </CardContent>
        </Card>
    );
}