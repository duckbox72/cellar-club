import React, { useEffect, useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';


import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import LinearProgress from '@material-ui/core/LinearProgress';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LanguageIcon from '@material-ui/icons/Language';
import SortIcon from '@material-ui/icons/Sort';

import { PlaceOfWorshipIcon ,WineGlassIcon } from './SvgIcons';
import Avatar from '@material-ui/core/Avatar'
import { CardActions } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    bottle_card: {
        height: screen.availHeight * 0.68,
        //overflowY: 'scroll',
        margin: theme.spacing(0, 2),
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,

        //backgroundImage: "url(https://images.homify.com/images/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1502880809/p/photo/image/2180609/DSC_0546/fotos-de-adegas-moderno-por-awds-interior.jpg)",
        //backgroundSize: 'cover',
        //backgroundPosition: 'center',
    },
    header: {
        
    },
    header_avatar: {
        backgroundImage: mystyleprops => mystyleprops.flagImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    header_title: {
        fontWeight: 500,
        //color: mystyleprops => mystyleprops.colorSchemaA,       
    },
    header_subheader: {
        //fontWeight: 400,
    },
    divider: {
        margin: theme.spacing(0, 2),
    },
    info_container: {
        //height:  'inherit',
        //border: '1px solid blue'
    },
    info_header:{
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    info_icon: { 
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        margin: theme.spacing(0,1),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    info_label: {
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    info_text: {
        margin: theme.spacing(0,1), 
    },

}));


export default function BottleCard(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const bottle = props.bottle;
    
    

    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        flagImage: `url(/static/images/country-flags/${bottle.country.split(" ").join("-").toLowerCase()}.png)`,
    }
    const classes = useStyles(mystyleprops);


    
    
    return (
        <Card className={classes.bottle_card} elevation={3}> 
            <CardHeader 
            disableTypography={true}
            avatar={
                <Avatar className={classes.header_avatar}>
                    <Typography />
                </Avatar>
            }
            
            title={
                <Typography variant="body1" className={classes.header_title}>
                    {bottle.vintage} {bottle.display_name}
                </Typography>}
            subheader={
                <Typography variant="body2" className={classes.header_subheader} color="textSecondary">
                    {bottle.region}, {bottle.country}
                </Typography>
            }  
            />

            <Divider className={classes.divider} />
            
            <Grid container className={classes.info_container} justify="space-evenly">
                
                <Grid item xs={6}>
                    <Grid container style={{margin: 8}}>
                        <Grid item xs={1}>
        
                        </Grid>
                        <Grid item>   
                            <Typography className={classes.info_header} size="small" variant="button">
                                Profile
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                { bottle.score !== null ?
                <Grid item xs={6}> 
                    <Grid container spacing={1} justify="center" alignItems="center">       
                        <Grid item>
                            <AllInclusiveIcon className={classes.info_icon} />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography size="small" variant="body2" >
                                Score {bottle.score} pts
                            </Typography>  
                        </Grid>
                    </Grid> 
                </Grid>
                :
                <Grid itmem xs={6} style={{marginBottom: 8}}>
                
                </Grid>
                }
               
                <Grid item xs={6}>
                    <Grid container spacing={0} justify="center">
                        <Grid item>
                            <PlaceOfWorshipIcon className={classes.info_icon}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2" className={classes.info_label}>    
                                Producer
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.producer_title} {bottle.producer_name}
                            </Typography>
                        </Grid>  
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container spacing={0} justify="center">
                        <Grid item>
                            <LanguageIcon className={classes.info_icon}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2" className={classes.info_label}>    
                                Origin
                            </Typography>
                        </Grid>
                        <Grid  item xs={10}>
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.region}, {bottle.country}
                            </Typography>
                        </Grid>  
                    </Grid>
                </Grid>




                <Grid item xs={6}>
                    <Typography>
                        Facts: {bottle.colour}, {bottle.size}, {bottle.score}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography>
                        Location: {bottle.cellar}, {bottle.bin}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography>
                        Date Added: {bottle.date_added}, {bottle.created}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography>
                        <KitchenIcon className={classes.info_icon} />
                        Purchase Info: 
                    </Typography>
                    <Typography>
                        {bottle.store}, {bottle.cost}, {bottle.note}
                    </Typography>
                    
                </Grid>
                
                

            </Grid>
            
        </Card>
    );
} 