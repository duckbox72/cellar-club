import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CloseIcon from '@material-ui/icons/Close';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import StarIcon from '@material-ui/icons/Star';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import UndoIcon from '@material-ui/icons/Undo';

import { WineBottleIcon, WineGlassIcon, WineGlassAltIcon} from './SvgIcons';

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
    review_iconbutton: {
        height: theme.spacing(6),
        width: theme.spacing(6),
    },
    review_iconbuttonOpen: {
        height: theme.spacing(6),
        width: theme.spacing(6),

        filter: 'opacity(50%)',
        backdropFilter: 'invert(10%) opacity(30%)',
    },
    review_iconbutton_icon: {
        
    },
    undo_remove_iconbutton: {
        height: theme.spacing(6),
        width: theme.spacing(6),
    },
    undo_remove_iconbuttonOpen: {
        height: theme.spacing(6),
        width: theme.spacing(6),

        filter: 'opacity(50%)',
        backdropFilter: 'invert(10%) opacity(30%)',
    },
    undo_remove_iconbutton_icon: {
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
        [theme.breakpoints.up('xs')]: {
            height: screen.availHeight * 0.48,
        },
        overflowY: 'scroll',
        margin: theme.spacing(0, 2),
        borderRadius: '0px 0px 10px 10px',
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    info_container: {
        
    },
    info_grid: {
        marginTop: theme.spacing(1.25),
    },
    info_header:{
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(0.5),
        color: mystyleprops => mystyleprops.colorSchemaA,
        fontSize: theme.spacing(2),
        //fontWeight: 400,
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
    alert_dialog: {
        borderRadius: 10,
    },
    alert_button: { 
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        borderRadius: 10,
    },  
}));


export default function MemoryCard(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const memory = props.memory;
    
    const [isFavorite, setIsFavorite] = useState(memory.bottle.favorite);
    
    const [undoRemoveAlertOpen, setUndoRemoveAlertOpen] = useState(false);


    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        flagImage: `url(/static/images/country-flags/${memory.bottle.country.split(" ").join("-").toLowerCase()}.png)`,
        infoColor: memory.bottle.colour === 'Red' ? 'maroon' : memory.bottle.colour === 'White' ? 'tan' : memory.bottle.colour === 'Rose' ? 'lightcoral' : 'grey',     
    }
    const classes = useStyles(mystyleprops);


    const handleFavoriteButton= (e) => {
        console.log("FAVORITE CLICK")
        
        fetch('/api/toggle_bottle_favorite', {
            method: 'POST',
            body: JSON.stringify({
                id: memory.bottle.id,
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


    const handleSeeReviewClick = (e) => {
        fetch(`/api/get_review/${memory.bottle.id}`)
        .then(response => response.json())
        .then(review => {
            window.scrollTo(0, 0);
            props.history.push({
                pathname: '/review',
                //search: '?query=abc',
                state: { review: review }
            });
        });
    }

   
    const handleUndoRemoveButtonClick = (e) => {
        setUndoRemoveAlertOpen(true);
    }

    const handleUndoRemoveAlertSubmit = (e) => {
        fetch(`/api/delete_memory_unconsume_bottle/${memory.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
        
        setUndoRemoveAlertOpen(false);
        props.history.push('/collection');
    }

    
    const handleUndoRemoveAlertCancel = (e) => {
        setUndoRemoveAlertOpen(false);
    }


    const handleVivinoButton = () => {
        window.location.href = `https://vivino.com/search/wines?q=${memory.bottle.display_name}`;
    };


    const handleWineSearcherButton = () => {
        window.location.href = `https://wine-searcher.com/find/${memory.bottle.display_name}`;
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
                        {isFavorite 
                        ?   <Tooltip title="Remove from Favorites">
                                <IconButton onClick={handleFavoriteButton}>
                                        <FavoriteIcon color="error" />
                                </IconButton>
                            </Tooltip>
                        :   <Tooltip title="Add to Favorites">
                                <IconButton onClick={handleFavoriteButton}>
                                        <FavoriteBorderIcon />
                                </IconButton>
                            </Tooltip>
                        }

                        <div>
                            <Tooltip title="Undo Remove Bottle">    
                                <IconButton 
                                onClick={handleUndoRemoveButtonClick} 
                                className={classes.undo_remove_iconbutton}
                                >
                                    <>
                                        <WineBottleIcon className={classes.undo_remove_iconbutton_icon}/>
                                        <UndoIcon 
                                        style={{
                                            width: theme.spacing(1.75),
                                            marginLeft: -theme.spacing(0.25),
                                            marginTop: -theme.spacing(1.5),   
                                        }}
                                        />
                                    </>
                                </IconButton>
                            </Tooltip>

                            <Dialog
                                className={classes.alert_dialog}
                                open={undoRemoveAlertOpen}
                                onClose={handleUndoRemoveAlertCancel}
                                aria-labelledby="undo-remove"
                            >
                                <DialogTitle id="undo-remove">
                                    {"Undo remove bottle?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        This will delete this memory entry and return bottle to my collection.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                    className={classes.alert_button} 
                                    disableElevation
                                    variant="contained" 
                                    startIcon={<CloseIcon />}
                                    onClick={handleUndoRemoveAlertCancel} 
                                    color="default"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                    className={classes.alert_button}
                                    disableElevation
                                    variant="contained" 
                                    startIcon={<PlaylistAddCheckIcon />}
                                    onClick={handleUndoRemoveAlertSubmit} 
                                    color={ darkMode ? "secondary" : "primary" }
                                    autoFocus
                                    >
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        <Tooltip title="See tasting review">
                            <IconButton 
                            disabled={!memory.has_review}
                            onClick={handleSeeReviewClick} 
                            className={classes.review_iconbutton}
                            >
                                <>
                                    <StarIcon className={classes.review_iconbutton_icon}/>
                                    <InfoOutlinedIcon 
                                    style={{
                                        width: theme.spacing(1.75),
                                        marginLeft: -theme.spacing(0.625),
                                        marginTop: -theme.spacing(1.5),   
                                    }}
                                    />
                                </>
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
                        {memory.bottle.vintage} {memory.bottle.display_name}
                    </Typography>}
                subheader={
                    <Typography variant="body2" className={classes.header_subheader} color="textSecondary">
                        {memory.bottle.colour ? <WineGlassIcon className={classes.info_color_icon}/> : ''} {memory.bottle.colour ? memory.bottle.colour : ''} {memory.bottle.region}, {memory.bottle.country}
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
                                Memory Profile
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
                            <EventAvailableIcon className={classes.info_icon}/>
                                
                            <Typography variant="body2" className={classes.info_label}> 
                                Date Consumed
                            </Typography>
                        
                            <Typography variant="body2" className={classes.info_text}>
                                {new Date(memory.date_consumed).toUTCString().slice(5, 16)}
                            </Typography>
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} className={classes.info_grid}>
                        <ListItem>
                                <SwapVertIcon className={classes.info_icon}/>
                                
                                <Typography variant='body2' className={classes.info_label}> 
                                    Reason for removal
                                </Typography>
                            
                                
                                <Typography variant="body2" className={classes.info_text} color="textPrimary">
                                     {memory.reason.split(" ", 1)}
                                </Typography>                               
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} className={classes.info_grid}>
                        <ListItem>
                            <AttachMoneyIcon className={classes.info_icon}/>
                    
                            <Typography variant="body2" className={classes.info_label}> 
                                Gathered
                            </Typography>
                        
                            <Typography variant="body2" className={classes.info_text}>
                                {memory.gathered ? `$ ${memory.gathered}` : 'n/a'}
                            </Typography>
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} className={classes.info_grid}>
                        <ListItem>
                            <CommentOutlinedIcon className={classes.info_icon}/>
                            
                            <Typography variant="body2" className={classes.info_label}> 
                                Private Note
                            </Typography>
                        
                            <Typography variant="body2" className={classes.info_text} style={{textAlign: 'justify'}}>
                                {memory.private_note ? memory.private_note : 'n/a'}
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