import React, { useEffect, useState } from 'react';
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
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockIcon from '@material-ui/icons/Lock';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RemoveIcon from '@material-ui/icons/Remove';
import StarIcon from '@material-ui/icons/Star';
import StarOutlinedIcon from '@material-ui/icons/StarOutline';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbsUpDownOutlinedIcon from '@material-ui/icons/ThumbsUpDownOutlined';

import { WineBottleIcon, WineGlassIcon } from './SvgIcons';

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
    bottle_iconbutton_icon: {
        marginRight: -theme.spacing(0.5),
        height: theme.spacing(2.125),
        width: theme.spacing(2.125),

        transform: 'rotate(315deg)',
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


export default function ReviewCard(props) {

    const darkMode = props.darkMode;
    const review = props.review;
    
    const [isPublic, setIsPublic] = useState(review.is_public);
    
    const [removeAlertOpen, setRemoveAlertOpen] = useState(false);


    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        flagImage: `url(/static/images/country-flags/${review.country.split(" ").join("-").toLowerCase()}.png)`,
        infoColor: review.colour === 'Red' ? 'maroon' : review.colour === 'White' ? 'tan' : review.colour === 'Rose' ? 'lightcoral' : review.type === 'Fortified Wine' ? 'firebrick' : 'grey',  
    }
    const classes = useStyles(mystyleprops);

    // TO DO 
    const handlePublicButton= (e) => {  
        fetch('/api/toggle_review_privacy', {
            method: 'POST',
            body: JSON.stringify({
                id: review.id,
                is_public: !review.is_public,
            }), 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setIsPublic(!isPublic)
            }
        })
    };


    const handleSeeBottlelClick = (e) => {
        console.log("SEE BOTLE CLICK")
        window.scrollTo(0, 0);
        props.history.push({
            pathname: '/consumed_bottle',
            //search: '?query=abc',
            state: { bottle: review.bottle }
        });
    }

   
    const handleRemoveButtonClick = (e) => {
        setRemoveAlertOpen(true);
    }

    const handleRemoveAlertSubmit = (e) => {
        
        fetch(`/api/delete_review/${review.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
        
        setRemoveAlertOpen(false);
        props.history.push('/reviews');
    }

    
    const handleRemoveAlertCancel = (e) => {
        setRemoveAlertOpen(false);
    }


    const handleVivinoButton = () => {
        window.location.href = `https://vivino.com/search/wines?q=${review.display_name}`;
    };


    const handleWineSearcherButton = () => {
        window.location.href = `https://wine-searcher.com/find/${review.display_name}`;
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
                        {isPublic 
                        ?   <Tooltip title="Toggle privacy status">
                                <IconButton onClick={handlePublicButton}>
                                        <LockOpenOutlinedIcon  />
                                </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title="Toggle privacy status">
                                <IconButton onClick={handlePublicButton}>
                                        <LockIcon />
                                </IconButton>
                            </Tooltip>
                        }

                        <div>
                            <Tooltip title="Remove Review">    
                                <IconButton 
                                onClick={handleRemoveButtonClick} 
                                className={classes.remove_iconbutton}
                                >
                                    <>
                                        <StarIcon className={classes.remove_iconbutton_icon}/>
                                        <RemoveIcon 
                                        style={{
                                            width: theme.spacing(1.75),
                                            marginLeft: -theme.spacing(0.75),
                                            marginTop: -theme.spacing(1.75),   
                                        }}
                                        />
                                    </>
                                </IconButton>
                            </Tooltip>

                            <Dialog
                                className={classes.alert_dialog}
                                open={removeAlertOpen}
                                onClose={handleRemoveAlertCancel}
                                aria-labelledby="undo-remove"
                            >
                                <DialogTitle id="undo-remove">
                                    {"Remove review?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        This will delete this review permanently.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                    className={classes.alert_button} 
                                    disableElevation
                                    variant="contained" 
                                    startIcon={<CloseIcon />}
                                    onClick={handleRemoveAlertCancel} 
                                    color="default"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                    className={classes.alert_button}
                                    disableElevation
                                    variant="contained" 
                                    startIcon={<PlaylistAddCheckIcon />}
                                    onClick={handleRemoveAlertSubmit} 
                                    color={ darkMode ? "secondary" : "primary" }
                                    autoFocus
                                    >
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        <Tooltip title="Bottle from collection, click for more info">
                            <IconButton 
                            disabled={!review.bottle}
                            onClick={handleSeeBottlelClick} 
                            className={classes.review_iconbutton}
                            >
                                <>
                                    <WineBottleIcon className={classes.bottle_iconbutton_icon}/>
                                    <InfoOutlinedIcon 
                                    style={{
                                        width: theme.spacing(1.75),
                                        marginLeft: -theme.spacing(0.25),
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
                        {review.vintage} {review.display_name}
                    </Typography>}
                subheader={
                    <Typography variant="body2" className={classes.header_subheader} color="textSecondary">
                        {review.colour || review.type === 'Fortified Wine' ? <WineGlassIcon className={classes.info_color_icon}/> : ''} {review.colour ? review.colour : ''} {review.region}, {review.country}
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
                                Review Profile
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
                                Date Tasted
                            </Typography>
                        
                            <Typography variant="body2" className={classes.info_text}>
                                {new Date(review.date_tasted).toUTCString().slice(5, 16)}
                            </Typography>
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} className={classes.info_grid}>
                        <ListItem>
                                {isPublic
                            ? <PeopleIcon className={classes.info_icon} />
                            : <PersonIcon className={classes.info_icon} />
                            }
                                
                            <Typography variant='body2' className={classes.info_label}> 
                                Privacy status
                            </Typography>
                        
                            
                            <Typography variant="body2" className={classes.info_text} color="textPrimary">
                                    {isPublic ? 'Public' : 'Private'}
                            </Typography>                               
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} className={classes.info_grid}>
                        <ListItem>
                                {review.like_status === 'like'
                            ? <ThumbUpOutlinedIcon className={classes.info_icon} />
                            : review.like_status === 'neutral'
                                ? <ThumbsUpDownOutlinedIcon className={classes.info_icon} />
                                    
                                : <ThumbDownOutlinedIcon className={classes.info_icon} />
                            }
                                
                            <Typography variant='body2' className={classes.info_label}> 
                                Gerneral Impression
                            </Typography>
                        
                            
                            <Typography variant="body2" className={classes.info_text} color="textPrimary">
                                    {(review.like_status).charAt(0).toUpperCase() + (review.like_status).slice(1)}
                            </Typography>                               
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} className={classes.info_grid}>
                        <ListItem>
                            <StarOutlinedIcon className={classes.info_icon}/>
                    
                            <Typography variant="body2" className={classes.info_label}> 
                                Score
                            </Typography>
                        
                            <Typography variant="body2" className={classes.info_text}>
                                {review.score} / 100
                            </Typography>
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} className={classes.info_grid}>
                        <ListItem>
                            <CommentOutlinedIcon className={classes.info_icon}/>
                            
                            <Typography variant="body2" className={classes.info_label}> 
                                Tasting Note
                            </Typography>
                        
                            <Typography variant="body2" className={classes.info_text} >
                                {review.tasting_note ? review.tasting_note : 'n/a'}
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