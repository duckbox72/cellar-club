import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert'
import Autocomplete from '@material-ui/lab/Autocomplete';

import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import NatureIcon from '@material-ui/icons/Nature';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PostAddIcon from '@material-ui/icons/PostAdd';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbsUpDownOutlinedIcon from '@material-ui/icons/ThumbsUpDownOutlined';

import { getVintageOptions } from "../utils/getVintageOptions";

import brown from '@material-ui/core/colors/brown';


const useStyles = makeStyles(theme => ({
    add_review_header:{
        margin: theme.spacing(1,2,0,2.5),
        color: mystyleprops => mystyleprops.colorSchemaA,
        fontSize: theme.spacing(2),
    },
    datepicker_icon: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        marginLeft: theme.spacing(2.5),
        marginRight: theme.spacing(1),
    },
    datepicker:{
        marginRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    autocomplete_svg_icon: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        marginLeft: theme.spacing(2.5),
        marginRight: theme.spacing(1),
    },
    autocomplete : {
        marginRight: theme.spacing(2),
        paddingBottom: theme.spacing(1),   
    },
    
    description_icon: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        marginLeft: theme.spacing(2.5),
        marginRight: theme.spacing(1),
    },
    description_svg_icon: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        marginLeft: theme.spacing(2.5),
        marginRight: theme.spacing(1),
    },
    description_typo: {
        display: 'block',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    switch_label: { 
        marginLeft: 'auto',
    },
    switch: {
        marginRight: theme.spacing(2),
    },
    radio_label: {
        marginLeft: 'auto',
    },
    radio: {
        marginRight: theme.spacing(2),
    },
    auxiliar_attention_icon: {
        marginTop: -theme.spacing(0.5),
        marginLeft: theme.spacing(0.25),
        height: theme.spacing(1.75),
        width: theme.spacing(1.75),
        '&:hover': {
            color: 'red',
        }
    },
    slider: {
        marginLeft: 'auto',
        marginRight: theme.spacing(2),
        maxWidth: '30%',   
    },
    slider_label: {
        marginRight: theme.spacing(3),
    },
    tasting_note_text_field: {
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    button: { 
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: 10,
    },
    snackbar: {
        width: '100%',
    },
    alert_container: {
        margin: theme.spacing(2, 6, 2, 2),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(2, 6, 2, 0),
        },
    },
    alert: {
        width: '100%',
        borderRadius: 10,
        //margin: theme.spacing(4, 2),
    },
}));


export default function LwinAddReview(props) {

    const darkMode = props.darkMode;
    const LwinData = props.LwinData;

    const theme = useTheme(); 
    const mystyleprops = {
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
    }
    const classes = useStyles(mystyleprops);

    const vintages = getVintageOptions();

    const [selectedDate, handleDateChange] = useState(null);
    const [selectedVintage, setSelectedVintage] = useState(null);

    const [shareReview, setShareReview] = useState(true);
    
    const [selectedRadio, setSelectedRadio] = useState('like');

    const [selectedScore, setSelectedScore] = useState(0);
    const [tastingNote, setTastingNote] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('');


    const handleSelectedVintageAutocompleteChange = (value) => {
        setSelectedVintage(value);
    }


    const handleSelectedVintageTextFieldChange = (e) => {
        setSelectedVintage(e.target.value);
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


    const handleCancelButtonClick = () => { 
        props.cancelParentCallback();
    };


    const handleSubmitButtonClick = () => {

        fetch('api/add_review', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                date_tasted: selectedDate,
                bottle_id: null,

                display_name: LwinData.display_name,

                lwin_vintage: selectedVintage,
                lwin_lwin: LwinData.lwin,
                lwin_colour: LwinData.colour,
                lwin_country: LwinData.country,
                lwin_region: LwinData.region,
                lwin_type: LwinData.type,

                is_public: shareReview,
                like_status: selectedRadio,
                score: selectedScore,
                tasting_note: tastingNote,

            }),
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);

            if (result.success) {
                setSnackbarSeverity('success')
                
            } else {
                setSnackbarSeverity('error')
            }
            handleSnackbarCall();
        });    
    }


    const handleSnackbarCall = () => {
        setSnackbarOpen(true);
    }


    const handleSnackbarClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
 
        window.scrollTo(0, 0);
        props.history.push('/reviews');
    }
    

    return (
        <>
            <Grid item xs={12}>
                <ListItem dense>
                    <Typography className={classes.add_review_header} variant="button">
                        Add tasting review
                    </Typography>
                </ListItem>
            </Grid>

            <Grid item xs={12} sm={6}>
                <ListItem dense>
                    <NatureIcon className={classes.autocomplete_svg_icon} />

                    <Autocomplete  
                    className={classes.autocomplete}
                    size="small"
                    id="selected-review-vintage"
                    fullWidth
                    //freeSolo
                    //value={selectedVintage}
                    onChange={(event,value) => handleSelectedVintageAutocompleteChange(value)} 
                    clearOnEscape
                    options={vintages}
                    renderInput={(params) => (
                        <TextField className={classes.autocomplete}
                        required
                        id="review-vintage"
                        type="text"
                        {...params}
                        onChange={handleSelectedVintageTextFieldChange}
                        label="Select Vintage" 
                        variant="standard"
                        color={darkMode == true ? "primary" : "secondary"}
                        />
                    )}
                    />
                </ListItem>
            </Grid>

            <Grid item xs={12} sm={6}>             
                <ListItem dense>
                    <EventAvailableIcon className={classes.datepicker_icon} />
                
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                        className={classes.datepicker}
                        small
                        required
                        autoOk
                        clearable 
                        value={selectedDate} 
                        label="Tasting date"
                        //format="MM/dd/yyyy"
                        format='MMM d yyyy'
                        inputVariant="standard"
                        onChange={handleDateChange}
                        color={darkMode == true ? "primary" : "secondary"}
                        fullWidth
                        disableToolbar
                        />
                    </MuiPickersUtilsProvider>
                </ListItem>
            </Grid>

            <Grid item xs={12} >
                <ListItem dense>
                    {shareReview 
                    ? <PeopleIcon className={classes.description_icon}/> 
                    : <PersonIcon className={classes.description_icon}/>
                    } 
                    <Typography variant="body2">
                        Set review privacy 
                    </Typography>
                        
                    <Typography className={classes.switch_label} variant="body2">
                        {shareReview ? 'Public' : 'Private'}
                    </Typography>
                    <Switch 
                    className={classes.switch}
                    checked={shareReview}
                    onChange={handleShareReviewSwitch}
                    color={darkMode ? 'primary' : 'secondary'}
                    >
                    </Switch>
                </ListItem>
            </Grid>

            <Grid item xs={12}>
                <ListItem dense>
                    {selectedRadio === 'like' 
                    ? <ThumbUpOutlinedIcon className={classes.description_icon}/> 
                    : selectedRadio === 'neutral' 
                    ? <ThumbsUpDownOutlinedIcon className={classes.description_icon}/>
                    : <ThumbDownOutlinedIcon className={classes.description_icon} />
                    } 
                    <Typography className={classes.description_typo} variant="body2">
                        Select feedback 
                    </Typography>
        
                    <Typography className={classes.radio_label} variant="body2">
                        Like
                    </Typography>
                    <Radio
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
                    className={classes.radio}
                    checked={selectedRadio === 'dislike'}
                    onChange={handleSelectedRadio}
                    value="dislike"
                    name="radio-dislike"
                    color={darkMode ? 'primary' : 'secondary'}
                    />
                </ListItem>
            </Grid>

            <Grid item xs={12}>
                <ListItem dense>
                    <StarBorderIcon className={classes.description_icon}/>
                    <Typography variant="body2">
                        Set score
                    </Typography>
                    <Tooltip 
                    title={(
                    <>
                        <Typography variant="body2">
                            Use this guide to select the right score on Robert Parker's 100 point scale: 
                        </Typography>
                        <Typography variant="body2" align="justify" >
                            D 50-69 avoid | C 70-79 below/average | B 80-85 good | B+ 86-89 very good | A- 90-93 excelent | A 94-97 outstanding | 98-100 extraordinary.
                        </Typography>
                    </>
                    )}
                    >
                        <ErrorOutlineIcon  className={classes.auxiliar_attention_icon}/>   
                    </Tooltip>
                    
                    <Slider
                    className={classes.slider}
                    aria-label="score-slider"
                    value={selectedScore}
                    onChange={handleScoreSliderChange}
                    min={50}
                    max={100}
                    color={darkMode ? 'primary' : 'secondary'}
                    />
                
                    <Typography className={classes.slider_label} variant="body2" style={{filter: selectedScore === 0 ? 'opacity(40%)' : ''}}>
                        {selectedScore} pts 
                    </Typography>   
                </ListItem>
            </Grid>

            <Grid item xs={12} style={{marginTop: -8, marginBottom: 8}}>
                <ListItem dense>
                    <PostAddIcon className={classes.description_icon}/>
                        
                    <TextField
                    className={classes.tasting_note_text_field}
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
                    className={classes.button}  
                    onClick={handleCancelButtonClick} 
                    variant="contained" 
                    color="default"
                    startIcon={<CloseIcon />}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                    disabled={!selectedDate || !selectedVintage}
                    disableElevation
                    fullWidth
                    className={classes.button} 
                    onClick={handleSubmitButtonClick}
                    variant="contained" 
                    color={ darkMode ? "secondary" : "primary" } 
                    startIcon={<PlaylistAddCheckIcon />}
                    >    
                        Submit
                    </Button>
                </Grid>

                <Snackbar 
                        className={classes.snackbar}
                        open={snackbarOpen}
                        autoHideDuration={1000}
                        onClose={handleSnackbarClose}
                        >
                            <Grid className={classes.alert_container} container spacing={1} justify="center"> 
                                <Grid item xs={12} sm={10} md={8}>
                                <Alert
                                className={classes.alert}
                                elevation={6} 
                                variant="filled" 
                                onClose={handleSnackbarClose} 
                                severity={snackbarSeverity}
                                >
                                    {snackbarSeverity === 'success'
                                    ? 'SUCCESS - Review added to reviews.'
                                    : 'Error - Please try again.'
                                    } 
                                </Alert>
                                </Grid>
                            </Grid>
                        </Snackbar>

                
            </Grid>
        
        
        </>
    )
}