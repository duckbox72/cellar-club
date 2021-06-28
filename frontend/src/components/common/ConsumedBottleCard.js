import React, {  useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { format } from 'date-fns';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LanguageIcon from '@material-ui/icons/Language';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import StoreIcon from '@material-ui/icons/Store';
import SwapVertIcon from '@material-ui/icons/SwapVert';

import { WineGlassIcon } from './SvgIcons';

import brown from '@material-ui/core/colors/brown';


const useStyles = makeStyles((theme) => ({
    header_card: {
        margin: theme.spacing(0, 2),
        borderRadius: '10px 10px 0px 0px',
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    actions_container: {
        margin: theme.spacing(1,1)
    },
    drink_iconbutton: {
        height: theme.spacing(6),
        width: theme.spacing(6),
    },
    drink_iconbuttonOpen: {
        height: theme.spacing(6),
        width: theme.spacing(6),

        filter: 'opacity(50%)',
        backdropFilter: 'invert(10%) opacity(30%)',
    },
    drink_iconbutton_icon: {
        height: theme.spacing(2.375),
        width: theme.spacing(2.375),
    },
    remove_iconbutton: {
        height: theme.spacing(6),
        width: theme.spacing(6),
    },
    remove_iconbuttonOpen: {
        height: theme.spacing(6),
        width: theme.spacing(6),

        filter: 'opacity(50%)',
        backdropFilter: 'invert(10%) opacity(30%)',
    },
    remove_iconbutton_icon: {
        marginRight: -theme.spacing(0.5),
        height: theme.spacing(2.125),
        width: theme.spacing(2.125),

        transform: 'rotate(315deg)',
    },

    iconbutton_external_link_ws: {
        height: theme.spacing(6.5),
        width: theme.spacing(6.5),
        marginLeft: 'auto',   
    },
    avatar_wslogo: {
        backgroundImage: "url(/static/images/ws-logo.png)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',  
        backgroundColor: theme.palette.grey[500],
        height: theme.spacing(3.5),
        width: theme.spacing(3.5),  
    },
    iconbutton_external_link_vivino: {
        height: theme.spacing(6.5),
        width: theme.spacing(6.5),
    },
    avatar_vivinologo: {
        backgroundImage: "url(/static/images/vivino-logo.png)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: theme.spacing(3.5),
        width: theme.spacing(3.5),    
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
    },
    header_subheader: {
        
    },
    
    divider: {
        margin: theme.spacing(0, 2),
    },

    info_card: {
        height: screen.availHeight * 0.46,
        overflowY: 'scroll',
        margin: theme.spacing(0, 2),
        borderRadius: '0px 0px 10px 10px',
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    info_container: {
        
    },
    info_grid: {
        marginTop: theme.spacing(1.5),
    },
    info_header:{
        margin: theme.spacing(0.5,2,0,2.5),
        color: mystyleprops => mystyleprops.colorSchemaA,
        fontSize: theme.spacing(2),
    },
    info_link: {
        marginTop: theme.spacing(1),
        marginLeft: 'auto',
        marginRight: theme.spacing(3),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    info_link_svg_icon: {
        height: theme.spacing(1.5),
        width: theme.spacing(1.5),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    info_icon: { 
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    info_color_icon: {
        height: theme.spacing(1.5),
        width: theme.spacing(1.5),
        color: mystyleprops => mystyleprops.infoColor,
    },
    info_label: {
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary,
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            fontSize: theme.spacing(1.75),
        },
    },
    info_text: {
        textAlign: 'right',
        fontWeight: 400,
        marginLeft: 'auto',
        marginRight: theme.spacing(2),
        fontSize: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            fontSize: theme.spacing(1.75),
        },
    },
    info_button: { 
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: 10,
    },

    drink_card: {
        height: screen.availHeight * 0.46,
        overflowY: 'scroll',
        margin: theme.spacing(0, 2),
        borderRadius: '0px 0px 10px 10px',
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    drink_container: {
        
    },
    drink_header:{
        margin: theme.spacing(0.5,2,0,2.5),
        color: mystyleprops => mystyleprops.colorSchemaA,
        fontSize: theme.spacing(2),
    },
    drink_link: {
        marginTop: theme.spacing(1),
        marginLeft: 'auto',
        marginRight: theme.spacing(3),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    drink_link_svg_icon: {
        height: theme.spacing(1.5),
        width: theme.spacing(1.5),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    drink_switch_header_label: {
        marginTop: theme.spacing(0.5), 
        marginLeft: 'auto',
        fontSize: theme.spacing(2),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    drink_switch_header: {
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(2),
    },
    drink_icon: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5), 
        paddingTop: theme.spacing(2),
    },
    drink_icon_svg: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        paddingTop: theme.spacing(2),
    },
    drink_datepicker:{
        paddingBottom: theme.spacing(2),
    },
    drink_textfield:{
        paddingBottom: theme.spacing(2),
    },
    drink_description_icon: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        marginLeft: theme.spacing(2.5),
        marginRight: theme.spacing(1),
    },
    drink_description_typo: {
        display: 'block',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    drink_switch_label: { 
        marginLeft: 'auto',
    },
    drink_switch: {
        marginRight: theme.spacing(2),
    },
    drink_list_item_disabled: {
        filter: 'opacity(40%)',
    },
    drink_list_item_disabled_hidden: {
        display: 'none'
    },
    drink_radio_label: {
        marginLeft: 'auto',
    },
    drink_radio: {
        marginRight: theme.spacing(2),
    },
    drink_auxiliar_attention_icon: {
        marginTop: -theme.spacing(0.5),
        marginLeft: theme.spacing(0.25),
        height: theme.spacing(1.75),
        width: theme.spacing(1.75),
        '&:hover': {
            color: 'red',
        },
    },
    drink_slider: {
        marginLeft: 'auto',
        marginRight: theme.spacing(2),
        maxWidth: '30%',   
    },
    drink_slider_label: {
        marginRight: theme.spacing(3),
    },
    drink_tasting_note_text_field: {
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    drink_button: { 
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: 10,
    },
    drink_snackbar: {
        width: '100%',
    },
    drink_alert_container: {
        margin: theme.spacing(2, 6, 2, 2),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(2, 6, 2, 0),
        },
    },
    drink_alert: {
        width: '100%',
        borderRadius: 10,
    },

    remove_card: {
        height: screen.availHeight * 0.46,
        overflowY: 'scroll',
        margin: theme.spacing(0, 2),
        borderRadius: '0px 0px 10px 10px',
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    remove_container: {
        
    },
    remove_header:{
        margin: theme.spacing(0.5,2,0,2.5),
        color: mystyleprops => mystyleprops.colorSchemaA,
        fontSize: theme.spacing(2),
    },
    remove_link: {
        marginTop: theme.spacing(1),
        marginLeft: 'auto',
        marginRight: 3,
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    remove_link_svg_icon: {
        height: theme.spacing(1.5),
        width: theme.spacing(1.5),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    remove_icon: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5), 
    },
    remove_icon_svg: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        paddingTop: theme.spacing(1.5),
    },
    drink_datepicker:{
        paddingBottom: theme.spacing(2),
    },
    remove_textfield: {
        paddingBottom: theme.spacing(2),
    },
    remove_description_icon: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(0),
        },
        marginRight: theme.spacing(1),
    },
    remove_auxiliar_attention_icon: {
        marginTop: -theme.spacing(0.5),
        height: theme.spacing(1.75),
        width: theme.spacing(1.75),
        '&:hover': {
            color: 'red',
        }
    },
    remove_button: { 
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4),
        borderRadius: 10,
    },
    remove_snackbar: {
        width: '100%',
    },
    remove_alert_container: {
        margin: theme.spacing(2, 6, 2, 2),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(2, 6, 2, 0),
        },
    },
    remove_alert: {
        width: '100%',
        borderRadius: 10,
        //margin: theme.spacing(4, 2),
    },

    
   
}));


export default function ConsumedBottleCard(props) {

    const darkMode = props.darkMode;     
    const bottle = props.bottle;
    
    const [isFavorite, setIsFavorite] = useState(bottle.favorite);
    

    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        flagImage: `url(/static/images/country-flags/${bottle.country.split(" ").join("-").toLowerCase()}.png)`,
        infoColor: bottle.colour === 'Red' ? 'maroon' : bottle.colour === 'White' ? 'tan' : bottle.colour === 'Rose' ? 'lightcoral' : 'grey',
        
    }
    const classes = useStyles(mystyleprops);


    const handleVivinoButton = () => {
        window.location.href = `https://vivino.com/search/wines?q=${bottle.display_name}`;
    };


    const handleWineSearcherButton = () => {
        window.location.href = `https://wine-searcher.com/find/${bottle.display_name}`;
    };


    const handleBackLinkClick = () => {
        window.scrollTo(0, 0);
        props.history.goBack();
    }
    

    return (
        <>
        <Card className={classes.header_card} elevation={3}> 
            <div id="actions" className={classes.actions_container}>
                <Grid container spacing={1} className={classes.container_actions} alignItems="center">
                    {
                        isFavorite ? 
                        <IconButton>
                            <FavoriteIcon color="error" />
                        </IconButton>
                        :
                        <IconButton>
                                <FavoriteBorderIcon color="textSecondary"/>
                        </IconButton>
                    }

                    

                    <Tooltip title="Find on Wine-Searcher">              
                        <IconButton
                        className={classes.iconbutton_external_link_ws}
                        onClick={handleWineSearcherButton}
                        aria-label="find on wine-searcher"
                        >
                            <Avatar className={classes.avatar_wslogo}>
                                <Typography></Typography>
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Find on Vivino">              
                        <IconButton
                        className={classes.iconbutton_external_link_vivino}
                        onClick={handleVivinoButton}
                        aria-label="find on vivino"
                        >
                            <Avatar className={classes.avatar_vivinologo}>
                                <Typography></Typography>
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </div>
        
            <Divider className={classes.divider} />

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
                    {bottle.colour ? <WineGlassIcon className={classes.info_color_icon}/> : ''} {bottle.colour ? bottle.colour : ''} {bottle.region ? bottle.region : bottle.type} , {bottle.country}
                </Typography>
            }  
            />
               
            <Divider className={classes.divider} />
            
        </Card>    

       
        <Card className={classes.info_card} elevation={3}> 
            <Grid container className={classes.info_container}>    
            
                <Grid item xs={7}>
                    <ListItem>
                        <Typography className={classes.info_header} variant="button">
                            Consumed Bottle
                        </Typography>
                    </ListItem>
                </Grid>

                <Grid item xs={5}>
                    <ListItem>
                        <Link 
                        className={classes.info_link} 
                        component="button"
                        variant="body1"
                        onClick={handleBackLinkClick}
                        >
                            <ArrowBackIcon className={classes.info_link_svg_icon}/> Back
                        </Link>
                    </ListItem>
                </Grid> 

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem>
                            <SwapVertIcon className={classes.info_icon}/>
                            
                            <Typography variant='body2' className={classes.info_label}> 
                                Color/Size
                            </Typography>
                        
                            
                            <Typography variant="body2" className={classes.info_text} color="textPrimary">
                                {bottle.colour ? bottle.colour : bottle.sub_type ? bottle.sub_type : bottle.type } {bottle.size}
                            </Typography>                               
                    </ListItem>
                </Grid>

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem dense>
                            <LocationCityIcon className={classes.info_icon}/>
                            
                            <Typography variant="body2" className={classes.info_label}> 
                                Producer
                            </Typography>
                        
                            <Typography variant="body2" className={classes.info_text}>
                                {bottle.producer_title} {bottle.producer_name}
                            </Typography>
                    </ListItem>
                </Grid>

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem>
                            <LanguageIcon className={classes.info_icon}/>

                            <Typography variant="body2" className={classes.info_label}> 
                                Origin
                            </Typography>
                        
                            <Typography variant="body2" className={classes.info_text}>
                            {bottle.region ? `${bottle.region}, ` : ''} {bottle.country}
                            </Typography>          
                    </ListItem>
                </Grid>

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem>      
                        <PublicIcon className={classes.info_icon}/> 

                        <Typography variant="body2" className={classes.info_label}> 
                            Appelation
                        </Typography>
                    
                        <Typography variant="body2" className={classes.info_text}>
                            {bottle.sub_region ? bottle.sub_region : 'n/a'}
                        </Typography>
                    </ListItem>
                </Grid>

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem>
                        <ShowChartIcon className={classes.info_icon}/>
                        
                        <Typography variant="body2" className={classes.info_label}> 
                            Critics Score
                        </Typography>
                    
                        <Typography variant="body2" className={classes.info_text}>
                            {bottle.score ? `${bottle.score} / 100` : 'n/a'}
                        </Typography>
                    </ListItem>
                </Grid>

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem>
                        <EventAvailableIcon className={classes.info_icon}/>
                            
                        <Typography variant="body2" className={classes.info_label}> 
                            Date Added
                        </Typography>
                    
                        <Typography variant="body2" className={classes.info_text}>
                            {bottle.date_added 
                            ? new Date(bottle.date_added).toUTCString().slice(5, 16) 
                            //? bottle.date_added
                            : format(new Date(bottle.created), 'MMM d yyyy')
                            }
                        </Typography>
                    </ListItem>
                </Grid>

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem>
                        <KitchenIcon className={classes.info_icon}/>
                        
                        <Typography variant="body2" className={classes.info_label}> 
                            Location/Cellar
                        </Typography>
                    
                        <Typography variant="body2" className={classes.info_text}>
                            {bottle.cellar ? bottle.cellar : 'n/a'}
                        </Typography>
                    </ListItem>
                </Grid>

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem>
                        <ExploreOutlinedIcon className={classes.info_icon}/>

                        <Typography variant="body2" className={classes.info_label}> 
                            Location/Bin
                        </Typography>
                    
                        <Typography variant="body2" className={classes.info_text}>
                            {bottle.bin ? bottle.bin : 'n/a'}
                        </Typography>
                    </ListItem>
                </Grid>

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem>
                        <StoreIcon className={classes.info_icon}/>
                        
                        <Typography variant="body2" className={classes.info_label}> 
                            Provenance
                        </Typography>
                    
                        <Typography variant="body2" className={classes.info_text}>
                            {bottle.store ? bottle.store : 'n/a'}
                        </Typography>
                    </ListItem>
                </Grid>

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem>
                        <AttachMoneyIcon className={classes.info_icon}/>
                
                        <Typography variant="body2" className={classes.info_label}> 
                            Price/Cost
                        </Typography>
                    
                        <Typography variant="body2" className={classes.info_text}>
                            {bottle.cost ? `$ ${bottle.cost}` : 'n/a'}
                        </Typography>
                    </ListItem>
                </Grid>

                <Grid item xs={12} className={classes.info_grid}>
                    <ListItem>
                        <CommentOutlinedIcon className={classes.info_icon}/>
                        
                        <Typography variant="body2" className={classes.info_label}> 
                            Note
                        </Typography>
                    
                        <Typography variant="body2" className={classes.info_text} style={{textAlign: 'justify'}}>
                            {bottle.note ? bottle.note : 'n/a'}
                        </Typography>
                    </ListItem>
                </Grid>

                <Grid item xs={12} container spacing={0} alignItems="center" justify="center" className={classes.info_grid}>
                    <Grid item xs={8} sm={4}>
                        <Button
                        disableElevation
                        fullWidth
                        className={classes.info_button} 
                        onClick={handleBackLinkClick}
                        variant="contained" 
                        color={ darkMode ? "secondary" : "primary" } 
                        startIcon={<ArrowBackIcon />}
                        >    
                            Back
                        </Button>
                    </Grid>
                </Grid> 

            </Grid>  
        </Card>
       

        </>
    );
} 