import React, { useState } from 'react';
import { Avatar, Card, CardContent, CardHeader, Divider, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import grey from '@material-ui/core/colors/grey';

export default function LwinProfileCard(props) {
    const useStyles = makeStyles((theme) => ({
        avatar: {
            backgroundColor: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        avatar_icon: {
            color: props.darkMode ? grey[900] : grey[300],
        },
        card: {
            margin: theme.spacing(3),
            backgroundColor: props.darkMode ? grey[700] : "#FFFFFF",    
        },
        content_icon: {
            textAlign: "center",
        },
        content_info: {
            textAlign: "right",
        },
        content_label: {
            color: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        divider: {
            margin: theme.spacing(0, 1),
        },
        header: {
            //backgroundColor: props.darkMode ? grey[900] : grey[300],     
        },
        icon: { 
            color: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
    }));


    const classes = useStyles();
    const LwinData = props.LwinData;

    const origin = `${LwinData.region}, ${LwinData.country}`

    return (
        <Card className={classes.card}>
            <CardHeader
            className={classes.header}
            avatar={
                <Avatar className={classes.avatar} aria-label="">
                   <InfoOutlinedIcon className={classes.avatar_icon} />
                </Avatar>
            }
            action={
                <Tooltip title="Add to my cellar">
                    <IconButton aria-label="">
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            }
            title={LwinData.display_name}
            subheader={origin}
            />
            
            <Divider className={classes.divider} />

            <CardContent>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <LocationCityOutlinedIcon className={classes.icon} fontSize="small" />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="caption" className={classes.content_label}>
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
                        <LocationOnOutlinedIcon className={classes.icon} fontSize="small" />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="caption" className={classes.content_label}>
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
                        <InvertColorsIcon className={classes.icon} fontSize="small" />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="caption" className={classes.content_label}>
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