import React, { useEffect, useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LanguageIcon from '@material-ui/icons/Language';
import PublicIcon from '@material-ui/icons/Public';
import ShowChartIcon from '@material-ui/icons/ShowChart';

import { CompassIcon, PlaceOfWorshipIcon, StoreIcon, WineGlassIcon } from './SvgIcons';


const useStyles = makeStyles((theme) => ({
    bottle_card: {
        maxHeight: screen.availHeight * 0.68,
        overflowY: 'scroll',
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
        height: theme.spacing(2),
        width: theme.spacing(2),
        //margin: theme.spacing(0,1),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    info_svg_icon: { 
        height: theme.spacing(1.75),
        width: theme.spacing(1.75),
        //margin: theme.spacing(0,1),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    info_label: {
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    info_text: {
      
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
            
            <Grid container className={classes.info_container}>
                
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item>   
                            <Typography className={classes.info_header} size="small" variant="button">
                                Profile
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
               

                <Grid item xs={6}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <PlaceOfWorshipIcon className={classes.info_svg_icon}/> Producer
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.producer_title} {bottle.producer_name}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

                <Grid item xs={6}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <LanguageIcon className={classes.info_icon}/> Origin
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.region}, {bottle.country}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

                <Grid item xs={6}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <WineGlassIcon className={classes.info_svg_icon}/> Color/Size
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.colour ? bottle.colour : 'n/a'} {bottle.size}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

                <Grid item xs={6}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <PublicIcon className={classes.info_icon}/> Appelation
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.sub_region ? bottle.sub_region : 'n/a'}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

                <Grid item xs={6}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <ShowChartIcon className={classes.info_icon}/> Critics Score
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.score ? `${bottle.score} / 100` : 'n/a'}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

                <Grid item xs={6}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <EventAvailableIcon className={classes.info_icon}/> Date Added
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.date_added ? bottle.date_added : bottle.created.slice(0,10)}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

                <Grid item xs={6}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <KitchenIcon className={classes.info_icon}/> Location/Cellar
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.cellar ? bottle.cellar : 'n/a'}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

                <Grid item xs={6}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <CompassIcon className={classes.info_svg_icon}/> Location/Bin
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.cellar ? bottle.cellar : 'n/a'}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

                <Grid item xs={6}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <StoreIcon className={classes.info_svg_icon}/> Purchased From
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.store ? bottle.store : 'n/a'}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

                <Grid item xs={6}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <AttachMoneyIcon className={classes.info_icon}/> Price/Cost
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.cost ? `$ ${bottle.cost}` : 'n/a'}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

                <Grid item xs={12}>
                    <ListItem dense>
                        <ListItemText
                        primary={
                            <Typography variant="body2" className={classes.info_label}> 
                                <CommentOutlinedIcon className={classes.info_icon}/> Note
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" className={classes.info_text}>
                                {bottle.note ? bottle.note : 'n/a'}
                            </Typography>
                        }
                        />
                    </ListItem>
                </Grid>

            </Grid>
            
        </Card>
    );
} 