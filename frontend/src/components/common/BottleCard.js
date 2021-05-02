import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import DateFnsUtils from '@date-io/date-fns'; //choose lib in future
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import Alert from '@material-ui/lab/Alert'
import Autocomplete from '@material-ui/lab/Autocomplete';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import Switch from '@material-ui/core/Switch'; 
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LanguageIcon from '@material-ui/icons/Language';
import LoopIcon from '@material-ui/icons/Loop';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PublicIcon from '@material-ui/icons/Public';
import Radio from '@material-ui/core/Radio';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import Slider from '@material-ui/core/Slider';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbsUpDownOutlinedIcon from '@material-ui/icons/ThumbsUpDownOutlined';

import { CompassIcon, GlassCheersIcon, PlaceOfWorshipIcon, StoreIcon, WineGlassIcon } from './SvgIcons';

import { currencyNumberFormat} from "../utils/currencyNumberFormat";
import { getRemovalReasonsOptions } from '../utils/getRemovalReasonsOptions';


import brown from '@material-ui/core/colors/brown';




const useStyles = makeStyles((theme) => ({
    header_card: {
        //height: screen.availHeight * 0.69,
        //overflowY: 'scroll',
        margin: theme.spacing(0, 2),
        borderRadius: '10px 10px 0px 0px',
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    actions_container: {
        margin: theme.spacing(1,1)
    },
    drink_iconbutton: {

    },
    drink_iconbuttonOpen: {
        filter: 'opacity(50%)',
        backdropFilter: 'invert(10%) opacity(30%)',
    },
    remove_iconbutton: {

    },
    remove_iconbuttonOpen: {
        filter: 'opacity(50%)',
        backdropFilter: 'invert(10%) opacity(30%)',
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
        //marginLeft: 'auto',   
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
        //color: mystyleprops => mystyleprops.colorSchemaA,       
    },
    header_subheader: {
        //fontWeight: 400,
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
        height: theme.spacing(2),
        width: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    info_color_icon: {
        height: theme.spacing(1.5),
        width: theme.spacing(1.5),
        color: mystyleprops => mystyleprops.infoColor,
    },
    info_svg_icon: { 
        height: theme.spacing(1.75),
        width: theme.spacing(1.75),
        //margin: theme.spacing(0,1),
        //color: mystyleprops => mystyleprops.colorSchemaA,
        color: theme.palette.text.secondary,
    },
    info_label: {
        //color: mystyleprops => mystyleprops.colorSchemaA,
        color: theme.palette.text.secondary,
    },
    info_text: {
        fontWeight: 500,
        marginLeft: theme.spacing(2.625),
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
        height: theme.spacing(1.75),
        width: theme.spacing(1.75),
        '&:hover': {
            color: 'red',
        }
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
        borderRadius: 20,
        //backdropFilter: 'brightness(95%)',
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
        //margin: theme.spacing(4, 2),
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
        borderRadius: 20,
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


export default function BottleCard(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const bottle = props.bottle;
    const [isFavorite, setIsFavorite] = useState(bottle.favorite);
    
    const [drinkCollapse, setDrinkCollapse] = useState(false);
    const [removeCollapse, setRemoveCollapse] = useState(false);

    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        flagImage: `url(/static/images/country-flags/${bottle.country.split(" ").join("-").toLowerCase()}.png)`,
        infoColor: bottle.colour === 'Red' ? 'maroon' : bottle.colour === 'White' ? 'tan' : bottle.colour === 'Rose' ? 'lightcoral' : 'grey',
        
    }
    const classes = useStyles(mystyleprops);

    const removalReasons = getRemovalReasonsOptions();


    // Form fields
    const [gathered, setGathered] = useState(null);
    const [privateNote, setPrivateNote] = useState(null)
    const [selectedDate, handleDateChange] = useState(null);

    const [addReview, setAddReview] = useState(false);
    const [shareReview, setShareReview] = useState(true);
    const [reviewId,setReviewId] = useState(null);

    const [selectedRadio, setSelectedRadio] = useState('like');
    
    const [selectedScore, setSelectedScore] = useState(0);
    const [tastingNote, setTastingNote] = useState(null);

    const [selectedRemovalReason, setSelectedRemovalReason] = useState(null);
    const [permanentRemoval, setPermanentRemoval] = useState(false);

    const [removeSnackbarOpen, setRemoveSnackbarOpen] = useState(false);
    const [removeSnackbarSeverity, setRemoveSnackbarSeverity] = useState('');
    const [drinkSnackbarOpen, setDrinkSnackbarOpen] = useState(false);
    const [drinkSnackbarSeverity, setDrinkSnackbarSeverity] = useState('');



    const clearFormState = () => {
        setGathered(null);
        setPrivateNote(null);
        handleDateChange(null);
        
        setAddReview(false);
        setShareReview(true);
        setSelectedRadio('like');
        setSelectedScore(0);
        setTastingNote(null);

        setSelectedRemovalReason(null);
        setPermanentRemoval(false);
    };



    const handleFavoriteButton= (e) => {
        fetch('/api/toggle_bottle_favorite', {
            method: 'POST',
            body: JSON.stringify({
                id: bottle.id,
                favorite: !isFavorite,
            }), 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setIsFavorite(!isFavorite)
            }
        })
    };


    const handleDrinkButtonClick = (e) => {
        removeCollapse ? () => {
            setRemoveCollapse(null);
            setDrinkCollapse(!drinkCollapse);
            cleaFormState()
        }
        :
            setDrinkCollapse(!drinkCollapse);
            clearFormState() 
    }

    const handleRemoveButtonClick = (e) => {
        drinkCollapse ? () => {
            setDrinkCollapse(null);
            setRemoveCollapse(!removeCollapse);
            clearFormState()
        }
        :
            setRemoveCollapse(!removeCollapse); 
            clearFormState()
    }


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


    const handleDrinkCancelLinkClick = () => {
        // Toggle view from drink card to bottle card 
        handleDrinkButtonClick();
    }


    const handleRemoveCancelLinkClick = () => {
        // Toggle view from remove card to bottle card 
        handleRemoveButtonClick();
    }


    // FORM HANDLERS
    const handlePrivateNoteChange = (e) => {
        setPrivateNote(e.target.value);
    }


    const handleGatheredChange = (e) => {
        setGathered(parseInt(e.target.value));
    };


    const handleAddReviewSwitch = (e) => {
        setAddReview(!addReview);
    }


    const handleShareReviewSwitch = (e) => {
        setShareReview(!shareReview);
    }


    const handleSelectedRadio = (e) => {
        setSelectedRadio(e.target.value)
    } 


    const handleScoreSliderChange = (event, newValue) => {
        setSelectedScore(newValue);
    }

    const handleTastingNoteChange = (e) => {
        setTastingNote(e.target.value);
    }

    const handleSelectedRemovalReasonAutocompleteChange = (value) => {
        setSelectedRemovalReason(value);
    };


    const handlePermanentRemovalSwitch = () => {
        setPermanentRemoval(!permanentRemoval);
    };
 
    
    const handleAddReview = () => {

        fetch('api/add_review', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                bottle_id: bottle.id,
                date_tasted: selectedDate,
                
                lwin_lwin: null,
                lwin_vintage: null,

                is_public: shareReview,
                like_status: selectedRadio,
                score: selectedScore,
                tasting_note: tastingNote,

            }),
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        });   

    }
    
    
    
    const handleDrinkCancelButtonClick = () => {
        // Toggle view from drink card to bottle card 
        handleDrinkButtonClick();
    };


    const handleDrinkSubmitButtonClick = () => {

        if (addReview) {
            handleAddReview()
        } 

        fetch('/api/add_consumption', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                bottle_id: bottle.id,
                date_consumed: selectedDate,
                reason: 'Drank bottle',
                private_note: privateNote,
                gathered: gathered,
                permanently_deleted: permanentRemoval,
                has_review: addReview,
            }),
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            
            if (result.success) {
                setDrinkSnackbarSeverity('success')
                
            } else {
                setDrinkSnackbarSeverity('error')
            }
            handleDrinkSnackbarCall();
        });   
    }




    const handleRemoveCancelButtonClick = () => {
        // Toggle view from drink card to bottle card 
        handleRemoveButtonClick();
    };


    const handleRemoveSubmitButtonClick = () => {

        fetch('/api/add_consumption', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                bottle_id: bottle.id,
                date_consumed: selectedDate,
                reason: selectedRemovalReason,
                private_note: privateNote,
                gathered: gathered,
                permanently_deleted: permanentRemoval,
                has_review: addReview,
            }),
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            
            if (result.success) {
                setRemoveSnackbarSeverity('success')
                
            } else {
                setRemoveSnackbarSeverity('error')
            }
            handleRemoveSnackbarCall();
        });   
    }


    const handleDrinkSnackbarCall = () => {
        setDrinkSnackbarOpen(true);
    }


    const handleDrinkSnackbarClose = (e) => {
        setDrinkSnackbarOpen(false);
        
        // TO DO -> redirect to memories page
    }


    const handleRemoveSnackbarCall = () => {
        setRemoveSnackbarOpen(true);
    }


    const handleRemoveSnackbarClose = (e) => {
        setRemoveSnackbarOpen(false);
        
        // TO DO -> redirect to memories page
    }
    

    return (
        <>
        <Card className={classes.header_card} elevation={3}> 
            <div id="actions" className={classes.actions_container}>
                <Grid container spacing={1} className={classes.container_actions} alignItems="center">
                    {
                        isFavorite ? 
                        <Tooltip title="Remove from Favorites">
                            <IconButton onClick={handleFavoriteButton}>
                                    <FavoriteIcon color="error" />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Add to Favorites">
                            <IconButton onClick={handleFavoriteButton}>
                                    <FavoriteBorderIcon />
                            </IconButton>
                        </Tooltip>
                    }

                    <Tooltip title="Drink Bottle">
                        <IconButton 
                        onClick={handleDrinkButtonClick} 
                        className={!drinkCollapse 
                            ? classes.drink_iconbutton 
                            : classes.drink_iconbuttonOpen}
                        >
                            <GlassCheersIcon style={{width: theme.spacing(2.75)}}/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Remove Bottle">    
                        <IconButton 
                        onClick={handleRemoveButtonClick} 
                        className={!removeCollapse 
                            ? classes.remove_iconbutton 
                            : classes.remove_iconbuttonOpen}
                        >
                            <DeleteSweepIcon />
                        </IconButton>
                    </Tooltip>

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
                    {bottle.region}, {bottle.country}
                </Typography>
            }  
            />
               
            <Divider className={classes.divider} />
            
        </Card>    










        <Collapse in={!drinkCollapse && !removeCollapse} timeout="auto">
            <Card className={classes.info_card} elevation={3}> 
                <Grid container className={classes.info_container}>    
                
                    <Grid item xs={7}>
                        <ListItem dense>
                            <Typography className={classes.info_header} variant="button">
                                Bottle Profile
                            </Typography>
                        </ListItem>
                    </Grid>

                    <Grid item xs={5}>
                        <ListItem dense>
                            <Link 
                            className={classes.info_link} 
                            component="button"
                            variant="body2"
                            onClick={handleBackLinkClick}
                            >
                                <ArrowBackIcon className={classes.info_link_svg_icon}/> Back
                            </Link>
                        </ListItem>
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
                                <Typography variant="body2" className={classes.info_text}>
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
                                <Typography variant="body2" className={classes.info_text}>
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
                                    <SwapVertIcon className={classes.info_icon}/> Color/Size
                                </Typography>
                            }
                            secondary={
                                <>
                                
                                <Typography variant="body2" className={classes.info_text} color="textPrimary">
                                    <WineGlassIcon className={classes.info_color_icon}/> {bottle.colour ? bottle.colour : 'n/a'} {bottle.size}
                                </Typography>
                                </>
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
                                <Typography variant="body2" className={classes.info_text}>
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
                                <Typography variant="body2" className={classes.info_text}>
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
                                <Typography variant="body2" className={classes.info_text}>
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
                                <Typography variant="body2" className={classes.info_text}>
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
                                <Typography variant="body2" className={classes.info_text}>
                                    {bottle.bin ? bottle.bin : 'n/a'}
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
                                <Typography variant="body2" className={classes.info_text}>
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
                                <Typography variant="body2" className={classes.info_text}>
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
                                <Typography variant="body2" className={classes.info_text}>
                                    {bottle.note ? bottle.note : 'n/a'}
                                </Typography>
                            }
                            />
                        </ListItem>
                    </Grid>

                </Grid>  
            </Card>
        </Collapse>










        <Collapse in={drinkCollapse} timeout="auto" unmountOnExit>
            <Card className={classes.drink_card} elevation={3}> 
                <Grid container spacing={0} className={classes.drink_container} justify="space-evenly">    
                
                    <Grid item xs={12}>
                        <ListItem dense>
                            <Typography className={classes.drink_header} variant="button">
                                Drink Bottle
                            </Typography>
                            <Link 
                            className={classes.drink_link} 
                            component="button"
                            variant="body2"
                            onClick={handleDrinkCancelLinkClick}
                            >
                                <ArrowBackIcon className={classes.drink_link_svg_icon}/> Back
                            </Link>            
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} style={{marginBottom: 8}}>
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item>
                                <CommentOutlinedIcon className={classes.drink_icon} />
                            </Grid>   

                            <Grid item xs={10} >
                                <TextField
                                small
                                className={classes.textfield}
                                id="drink-private-note"
                                fullWidth
                                onChange={handlePrivateNoteChange} 
                                label="Private note/memo" 
                                variant="standard"
                                color={darkMode == true ? "primary" : "secondary"}
                                />
                            </Grid>
                        </Grid> 
                    </Grid>

                    <Grid item xs={6}>             
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item >
                                <EventAvailableIcon className={classes.drink_icon} />
                            </Grid>   

                            <Grid item xs={8}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                    className={classes.drink_datepicker}
                                    small
                                    required
                                    autoOk
                                    clearable 
                                    value={selectedDate} 
                                    label="Drink date"
                                    format="MM/dd/yyyy"
                                    inputVariant="standard"
                                    onChange={handleDateChange}
                                    color={darkMode == true ? "primary" : "secondary"}
                                    fullWidth
                                    disableToolbar
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>   
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item >
                                <AttachMoneyIcon className={classes.drink_icon} />
                            </Grid>   

                            <Grid item xs={8}>
                                <TextField
                                className={classes.drink_textfield}
                                small
                                id="drink-gathered"
                                fullWidth
                                InputProps={{ 
                                    inputProps: { min: 0 }, 
                                    inputComponent: currencyNumberFormat,
                                }}
                                onChange={handleGatheredChange} 
                                label="Gathered" 
                                variant="standard"
                                color={darkMode == true ? "primary" : "secondary"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <ListItem dense>
                            <Typography className={classes.drink_header} variant="button">
                                Add tasting review
                            </Typography>

                            <Typography className={classes.drink_switch_header_label} variant="button">
                                {addReview ? 'Yes' : 'No'}
                            </Typography>
                            <Switch 
                            className={classes.drink_switch_header}
                            checked={addReview}
                            onChange={handleAddReviewSwitch}
                            color={darkMode ? 'primary' : 'secondary'}
                            >
                            </Switch>
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} className={!addReview ? classes.drink_list_item_disabled_hidden : ''}>
                        <ListItem dense>
                            {shareReview 
                            ? <PeopleIcon className={classes.drink_description_icon}/> 
                            : <PersonIcon className={classes.drink_description_icon}/>
                            } 
                            <Typography variant="body2">
                                Set review privacy 
                            </Typography>
                                
                            <Typography className={classes.drink_switch_label} variant="body2">
                                {shareReview ? 'Public' : 'Private'}
                            </Typography>
                            <Switch 
                            disabled={!addReview}
                            className={classes.drink_switch}
                            checked={shareReview}
                            onChange={handleShareReviewSwitch}
                            color={darkMode ? 'primary' : 'secondary'}
                            >
                            </Switch>
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} className={!addReview ? classes.drink_list_item_disabled_hidden : ''}>
                        <ListItem dense>
                            {selectedRadio === 'like' 
                            ? <ThumbUpOutlinedIcon className={classes.drink_description_icon}/> 
                            : selectedRadio === 'neutral' 
                            ? <ThumbsUpDownOutlinedIcon className={classes.drink_description_icon}/>
                            : <ThumbDownOutlinedIcon className={classes.drink_description_icon} />
                            } 
                            <Typography className={classes.drink_description_typo} variant="body2">
                                Select feedback 
                            </Typography>
                
                            <Typography className={classes.drink_radio_label} variant="body2">
                                Like
                            </Typography>
                            <Radio
                            disabled={!addReview}
                            checked={selectedRadio === 'like'}
                            onChange={handleSelectedRadio}
                            value="like"
                            name="radio-like"
                            color={darkMode ? 'primary' : 'secondary'}
                            />
                            
                            <Typography variant="body2">
                                Neutral
                            </Typography>
                            <Radio
                            disabled={!addReview}
                            checked={selectedRadio === 'neutral'}
                            onChange={handleSelectedRadio}
                            value="neutral"
                            name="radio-neutral"
                            color={darkMode ? 'primary' : 'secondary'}
                            />
                            
                            <Typography variant="body2">
                                Dislike
                            </Typography>
                            <Radio
                            disabled={!addReview}
                            className={classes.drink_radio}
                            checked={selectedRadio === 'dislike'}
                            onChange={handleSelectedRadio}
                            value="dislike"
                            name="radio-dislike"
                            color={darkMode ? 'primary' : 'secondary'}
                            />
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} Grid item xs={12} className={!addReview ? classes.drink_list_item_disabled_hidden : ''}>
                        <ListItem dense>
                            <StarBorderIcon className={classes.drink_description_icon}/>
                            <Typography variant="body2">
                                Set score
                            </Typography>
                            <Tooltip 
                            title={(
                            <>
                                <Typography>
                                    Use this guide to select the right score on Robert Parker's 100 point scale: 
                                </Typography>
                                <Typography>
                                    D 50-69 avoid | C 70-79 below/average | B 80-85 good | B+ 86-89 very good | A- 90-93 excelent | A 94-97 outstanding | 98-100 extraordinary.
                                </Typography>
                            </>
                            )}
                            >
                                <ErrorOutlineIcon  className={classes.drink_auxiliar_attention_icon}/>   
                            </Tooltip>
                            
                            <Slider
                            disabled={!addReview}
                            className={classes.drink_slider}
                            aria-label="score-slider"
                            value={selectedScore}
                            onChange={handleScoreSliderChange}
                            min={50}
                            max={100}
                            color={darkMode ? 'primary' : 'secondary'}
                            />
                        
                            <Typography className={classes.drink_slider_label} variant="body2" style={{filter: selectedScore === 0 ? 'opacity(40%)' : ''}}>
                                {selectedScore} pts 
                            </Typography>   
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} style={{marginTop: -8, marginBottom: 8}} Grid item xs={12} className={!addReview ? classes.drink_list_item_disabled : ''}>
                        <ListItem dense>
                            <PostAddIcon className={classes.drink_description_icon}/>
                              
                            <TextField
                            disabled={!addReview}
                            className={classes.drink_tasting_note_text_field}
                            small
                            id="tasting-note"
                            fullWidth
                            multiline
                            onChange={handleTastingNoteChange} 
                            label="Tasting note" 
                            variant="standard"
                            color={darkMode == true ? "primary" : "secondary"}
                            />
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} container spacing={0} alignItems="center" justify="space-around">
                        <Grid item xs={4}>
                            <Button
                            disableElevation
                            fullWidth
                            className={classes.drink_button}  
                            onClick={handleDrinkCancelButtonClick} 
                            variant="contained" 
                            color="default"
                            startIcon={<CloseIcon />}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                            disabled={!selectedDate}
                            disableElevation
                            fullWidth
                            className={classes.drink_button} 
                            onClick={handleDrinkSubmitButtonClick}
                            variant="contained" 
                            color={ darkMode ? "secondary" : "primary" } 
                            startIcon={<PlaylistAddCheckIcon />}
                            >    
                                Submit
                            </Button>
                        </Grid>

                        <Snackbar 
                        className={classes.drink_snackbar}
                        open={drinkSnackbarOpen}
                        autoHideDuration={1000}
                        onClose={handleDrinkSnackbarClose}
                        >
                            <Grid className={classes.drink_alert_container} container spacing={1} justify="center"> 
                                <Grid item xs={12} sm={10} md={8}>
                                <Alert
                                className={classes.drink_alert}
                                elevation={6} 
                                variant="filled" 
                                onClose={handleDrinkSnackbarClose} 
                                severity={drinkSnackbarSeverity}
                                >
                                    {drinkSnackbarSeverity === 'success'
                                    ? 'SUCCESS - Consumption added to memories.'
                                    : 'Error - Please try again.'
                                    } 
                                </Alert>
                                </Grid>
                            </Grid>
                        </Snackbar>

                    </Grid>

                    
                </Grid>
            </Card>
        </Collapse>










        <Collapse in={removeCollapse} timeout="auto" unmountOnExit>
            <Card className={classes.remove_card} elevation={3}> 
                <Grid container className={classes.remove_container}>    
                
                    <Grid item xs={12}>
                        <ListItem dense>
                            <Typography className={classes.drink_header} variant="button">
                                Remove Bottle
                            </Typography>

                            <Link 
                            className={classes.drink_link} 
                            component="button"
                            variant="body2"
                            onClick={handleRemoveCancelLinkClick}
                            >
                                <ArrowBackIcon className={classes.drink_link_svg_icon}/> Back
                            </Link>
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} style={{marginBottom: 8}}>
                            <Autocomplete
                            className={classes.autocomplete}  
                            size="small"
                            id="removal-reason"
                            fullWidth
                            value={selectedRemovalReason}
                            onChange={(event,value) => handleSelectedRemovalReasonAutocompleteChange(value)}
                            clearOnEscape
                            options={removalReasons}
                            renderInput={(params) => (
                                <Grid container spacing={1} justify="center" alignItems="center">
                                    <Grid item>
                                        <LoopIcon className={classes.icon} />
                                    </Grid>   

                                    <Grid item xs={10} >
                                        <TextField
                                        required
                                        id="removal-reason-input"
                                        {...params}
                                        label="Select a reason for removal" 
                                        variant="standard"
                                        color={darkMode == true ? "primary" : "secondary"}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>

                    <Grid item xs={12} style={{marginBottom: 8}}>
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item>
                                <CommentOutlinedIcon className={classes.remove_icon} />
                            </Grid>   

                            <Grid item xs={10} >
                                <TextField
                                small
                                className={classes.textfield}
                                id="remove-private-note"
                                fullWidth
                                onChange={handlePrivateNoteChange} 
                                label="Private note/memory" 
                                variant="standard"
                                color={darkMode == true ? "primary" : "secondary"}
                                />
                            </Grid>
                        </Grid> 
                    </Grid>

                    <Grid item xs={6}>             
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item >
                                <EventAvailableIcon className={classes.remove_icon} />
                            </Grid>   

                            <Grid item xs={8}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                    className={classes.remove_datepicker}
                                    small
                                    required
                                    autoOk
                                    clearable 
                                    value={selectedDate} 
                                    label="Removal date"
                                    format="MM/dd/yyyy"
                                    inputVariant="standard"
                                    onChange={handleDateChange}
                                    color={darkMode == true ? "primary" : "secondary"}
                                    fullWidth
                                    disableToolbar
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>   
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item >
                                <AttachMoneyIcon className={classes.remove_icon} />
                            </Grid>   

                            <Grid item xs={8}>
                                <TextField
                                className={classes.remove_textfield}
                                small
                                id="remove-gathered"
                                fullWidth
                                InputProps={{ 
                                    inputProps: { min: 0 }, 
                                    inputComponent: currencyNumberFormat,
                                }}
                                onChange={handleGatheredChange} 
                                label="Gathered" 
                                variant="standard"
                                color={darkMode == true ? "primary" : "secondary"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <ListItem dense>
                           
                            <DeleteOutlineIcon className={classes.remove_description_icon}/>
                            
                            <ListItemText
                            primary={
                                <Typography 
                                variant="body2"
                                color={permanentRemoval ? 'error' : 'textSecondary'}
                                >
                                    {permanentRemoval 
                                    ? 'Remove permanently from database and history. Action can\'t be undone'
                                    : 'Remove permanently from database and history'

                                    }
                                <Tooltip title="If selected item will be deleted and acction can not be undone">    
                                    <ErrorOutlineIcon className={classes.remove_auxiliar_attention_icon}/>
                                </Tooltip>
                                </Typography>
                            }
                            >
                            </ListItemText>
                            
                            <Checkbox 
                            checked={permanentRemoval}
                            onChange={handlePermanentRemovalSwitch}
                            color={darkMode ? 'primary' : 'secondary'}
                            />
                            
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} container spacing={0} alignItems="center" justify="space-around">
                        <Grid item xs={4}>
                            <Button
                            disableElevation
                            fullWidth
                            className={classes.remove_button}  
                            onClick={handleRemoveCancelButtonClick} 
                            variant="contained" 
                            color="default"
                            startIcon={<CloseIcon />}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                            disabled={!selectedDate || !selectedRemovalReason}
                            disableElevation
                            fullWidth
                            className={classes.remove_button} 
                            onClick={handleRemoveSubmitButtonClick}
                            variant="contained" 
                            color={ darkMode ? "secondary" : "primary" } 
                            startIcon={<PlaylistAddCheckIcon />}
                            >    
                                Submit
                            </Button>
                        </Grid>
                    </Grid>

                    <Snackbar 
                        className={classes.remove_snackbar}
                        open={removeSnackbarOpen}
                        autoHideDuration={1000}
                        onClose={handleRemoveSnackbarClose}
                        >
                        <Grid className={classes.remove_alert_container} container spacing={1} justify="center"> 
                            <Grid item xs={12} sm={10} md={8}>
                            <Alert
                            className={classes.remove_alert}
                            elevation={6} 
                            variant="filled" 
                            onClose={handleRemoveSnackbarClose} 
                            severity={removeSnackbarSeverity}
                            >
                                {removeSnackbarSeverity === 'success'
                                ? 'SUCCESS - Consumption added to memories.'
                                : 'Error - Please try again.'
                                } 
                            </Alert>
                            </Grid>
                        </Grid>
                    </Snackbar>

                </Grid>
            </Card>
        </Collapse>
        </>
    );
} 