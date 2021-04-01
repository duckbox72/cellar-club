import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import Alert from '@material-ui/lab/Alert'
import Autocomplete from '@material-ui/lab/Autocomplete';

import DateFnsUtils from '@date-io/date-fns'; //choose lib in future
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CloseIcon from '@material-ui/icons/Close';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import KitchenIcon from '@material-ui/icons/Kitchen';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RemoveIcon from '@material-ui/icons/Remove'
import ShareIcon from '@material-ui/icons/Share';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import { CompassIcon, GlassCheersIcon, StoreIcon, WineBottleIcon } from './SvgIcons';

import brown from '@material-ui/core/colors/brown';

import { currencyNumberFormat} from "../utils/currencyNumberFormat";
import { getBottleSizesOptions } from "../utils/getBottleSizesOptions";
import { getVintageOptions } from "../utils/getVintageOptions";



const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(0, 2),
        paddingBottom: theme.spacing(1), 
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
    },
    container_actions: {
        padding: theme.spacing(1, 1.25, 1, 1),
    },
    container_collapse: {
        padding: theme.spacing(2,2,1,2),
    },
    divider: {
        margin: theme.spacing(0, 2),
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)', 
    },
    header: {
        
    },
    header_title: {
        fontWeight: 600,
        fontSize: theme.spacing(2),                
    },
    header_subheader: {
        fontWeight: 500,
    },
    iconbutton_wslogo: {
        height: theme.spacing(6.5),
        width: theme.spacing(6.5),
        marginLeft: 'auto',   
    },
    avatar_wslogo: {
        backgroundImage: "url(/static/images/ws-logo-nobg.png)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
    },
    icon: { 
        height: theme.spacing(2.5),
        width: theme.spacing(2.5), 
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    svg_icon: { 
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        paddingTop: theme.spacing(1.5),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    autocomplete:{ 
        paddingBottom: theme.spacing(2),
    },
    autocomplete_store:{
        marginTop: theme.spacing(0.5),
    },
    datepicker:{
        paddingBottom: theme.spacing(2),
    },
    textfield:{
        paddingBottom: theme.spacing(2),
    },
    button: { 
        margin: theme.spacing(1),
        borderRadius: 20,
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


export default function LwinProfileCard(props) {

    // Component props
    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const LwinData = props.LwinData;
    const gwsScores = props.gwsScores;
    

    const theme = useTheme(); 
    const mystyleprops = {
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
    }
    const classes = useStyles(mystyleprops);
    
    
    const [expanded, setExpanded] = useState(false);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
        clearFormState();
        props.parentFormExpandedCallback(!expanded);
    };


    // Form options
    const bottleSizes = getBottleSizesOptions();
    const vintages = getVintageOptions();
    const infodata = [
        {mock: 'some string', store: 'ABC Wine and Spirits'},
        {mock: 'some string', store: 'Total Wine & More'},
        {mock: 'some string', store: 'Goody Goody'},
        {mock: 'some string', store: 'Speck\'s Wines'},
        {mock: 'some string', store: 'Cellaraiders.com'},
    ];


    // Form fields
    const [cost, setCost] = useState(null);
    const [note, setNote] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [selectedBin, setSelectedBin] = useState(null);
    const [selectedCellar, setSelectedCellar] = useState(null);
    const [selectedDate, handleDateChange] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [selectedVintage, setSelectedVintage] = useState(null);

    const [score, setScore] = useState(null);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const clearFormState = () => {
        setCost(null);
        setNote(null);
        setQuantity(null);
        setSelectedBin(null);
        setSelectedCellar(null);
        handleDateChange(null);
        setSelectedSize(null);
        setSelectedStore(null);
        setSelectedVintage(null);

        setScore(null);
        setSubmitButtonDisabled(true);
    };
    

    const handleNoteFieldChange = (e) => {
        setNote(e.target.value);
    }


    const handleCostFieldChange = (e) => {
        setCost(parseInt(e.target.value));
    };


    const handleQuantityFieldChange = (e) => {
        e.target.value >= 1 ?
        setQuantity(e.target.value)
        :
        setQuantity(null)

        console.log(e.target.value)
    };


    const handleSelectedBinAutocompleteChange = (value) => {
        setSelectedBin(value);
    }


    const handleSelectedBinTextFieldChange = (e) => {
        setSelectedBin(e.target.value);
    }


    const handleSelectedCellarAutocompleteChange = (value) => {
        setSelectedCellar(value);
    }


    const handleSelectedCellarTextFieldChange = (e) => {
        setSelectedCellar(e.target.value);
    }
    

    const handleSelectedSizeAutocompleteChange = (value) => {
        setSelectedSize(value);
    }


    const handleSelectedSizeTextFieldChange = (e) => {
        setSelectedSize(e.target.value);
    }


    const handleSelectedStoreAutocompleteChange = (value) => {
        setSelectedStore(value);
    }

    const handleSelectedStoreTextFieldChange = (e) => {
        setSelectedStore(e.target.value);
    }


    const handleSelectedVintageAutocompleteChange = (value) => {
        setSelectedVintage(value);
        if (value === null) {
            setScore(null)
        }
        console.log(value)
    }


    const handleSelectedVintageTextFieldChange = (e) => {
        setSelectedVintage(e.target.value);
    }


    const handleCancelButtonClick = () => {
        setExpanded(false);
        clearFormState();
        props.parentFormExpandedCallback(false);
    };
    

    const handleSubmitButtonClick = () => {

        fetch('/api/add_bottle_to_collection', {
            method: 'POST',
            //headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                cellar: selectedCellar,
                bin: selectedBin,
                score: score,
                lwin: LwinData.lwin,
                display_name: LwinData.display_name,
                producer_title: LwinData.producer_title,
                producer_name: LwinData.producer_name,
                country: LwinData.country,
                region: LwinData.region,
                colour: LwinData.colour,
                vintage: selectedVintage,
                size: selectedSize,
                store: selectedStore,
                cost: cost,
                note: note,
                lwin11: LwinData.lwin + selectedVintage,
                date_added: selectedDate,
            }),
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.success) {
                handleSnackbarCall();
              } else {
                alert(result.error)
              }
        });
    };


    const handleSubmitButtonDisabledStatus = () => {
        LwinData !== null && selectedVintage !== null && selectedSize !== null && quantity !== null ?
        setSubmitButtonDisabled(false) : setSubmitButtonDisabled(true);
    };
    

    const handleBottleScore = (vintage) => {     
        const availableVintages = [];
        gwsScores.forEach(element => {
            availableVintages.push(element.vintage);
            
        });

        availableVintages.includes(vintage) ? 
            gwsScores.forEach(element => {
                if  (element.vintage == vintage) {
                    console.log(element.vintage, element.score)
                    setScore(Math.round(element.score));
                }
            })
            :
            setScore(null);
    };


    const handleSnackbarCall = () => {
        setSnackbarOpen(true);
    }


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
        window.scrollTo(0, 0);
        props.history.push('/collection');
    }


    const handleWineSearcherButton = () => {
        window.location.href = `https://wine-searcher.com/find/${LwinData.display_name}`;
        //window.location.href = `https://vivino.com/search/wines?q=${LwinData.display_name}`;
    };


    useEffect(() => {
        handleSubmitButtonDisabledStatus()

        if (gwsScores !== null & selectedVintage !== null) {
            handleBottleScore(selectedVintage);
        }

        if (LwinData === null) {
            setScore(null);
            setExpanded(false);
        }
    });


    return (
        <Card className={classes.card}>

            <div id="actions">
                <Grid container spacing={1} className={classes.container_actions} alignItems="center">
                    <IconButton>
                        <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton >
                        <ShareIcon />
                    </IconButton>
                    <IconButton>
                        <SpeakerNotesOutlinedIcon />
                    </IconButton>
                    <Tooltip title="Find in Wine-Searcher">              
                        <IconButton
                        className={classes.iconbutton_wslogo}
                        onClick={handleWineSearcherButton}
                        aria-label="find in wine-searcher"
                        >
                            <Avatar className={classes.avatar_wslogo}>
                                <Typography></Typography>
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </div>

            <CardHeader
            disableTypography={true}
            className={classes.header}
            avatar={
                <WineBottleIcon className={classes.svg_icon} />
            }
            action={
                <Tooltip title="Add to my cellar">
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="add to cellar"
                    >
                        { expanded ? <RemoveIcon /> : <AddIcon /> }
                    </IconButton>
                </Tooltip>
            }
            title={
                <Typography variant="body2" className={classes.header_title}>
                   {LwinData !== null && LwinData !== undefined ? LwinData.display_name : ""}
                </Typography>
            }
            subheader={
                <Typography variant="body2" color="textSecondary" className={classes.header_subheader}>
                   {LwinData !== null && LwinData !== undefined ? LwinData.colour + " " + LwinData.region + ", " + LwinData.country : ""}
                </Typography>
            }
            />

            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <Divider className={classes.divider} />
                
                <form id="bottle-form" >
                    <Grid container className={classes.container_collapse} spacing={0} justify="space-evenly" >
                        
                        <Grid item xs={6} style={{marginBottom: 8}}>
                            <Grid container>
                                <Grid item xs={1}>
                
                                </Grid>
                                <Grid item>   
                                    <Typography size="small" variant="button">
                                        Add to my cellar
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        { score !== null ?
                        <Grid item xs={6} style={{marginBottom: 8}}> 
                            <Grid container spacing={1} justify="center" alignItems="center">       
                                <Grid item>
                                    <AllInclusiveIcon className={classes.icon} />
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography size="small" variant="body2" >
                                        {score} pts
                                    </Typography>  
                                </Grid>
                            </Grid> 
                        </Grid>
                        :
                        <Grid itmem xs={6} style={{marginBottom: 8}}>
                        
                        </Grid>
                        }

                        <Grid item xs={6}>
                            <Autocomplete  
                            className={classes.autocomplete}
                            size="small"
                            id="vintage"
                            fullWidth
                            //freeSolo
                            //value={selectedVintage}
                            onChange={(event,value) => handleSelectedVintageAutocompleteChange(value)} 
                            clearOnEscape
                            options={vintages}
                            renderInput={(params) => (
                                <Grid container spacing={1} justify="center" alignItems="center">
                                    <Grid item>
                                        <GlassCheersIcon className={classes.svg_icon} />
                                    </Grid>   

                                    <Grid item xs={8}>
                                    <TextField
                                    required
                                    id="vintage"
                                    type="text"
                                    {...params}
                                    onChange={handleSelectedVintageTextFieldChange}
                                    label="Vintage" 
                                    variant="standard"
                                    color={darkMode == true ? "primary" : "secondary"}
                                    />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Autocomplete
                            className={classes.autocomplete}  
                            size="small"
                            id="size"
                            fullWidth
                            //freeSolo
                            onChange={(event,value) => handleSelectedSizeAutocompleteChange(value)}
                            clearOnEscape
                            options={bottleSizes}
                            renderInput={(params) => (
                                <Grid container spacing={1} justify="center" alignItems="center">
                                    <Grid item >
                                        <ImportExportIcon className={classes.svg_icon} />
                                    </Grid>   

                                    <Grid item xs={8}>
                                        <TextField
                                        required
                                        id="size"
                                        type="text"
                                        {...params}
                                        onChange={handleSelectedSizeTextFieldChange} 
                                        label="Size" 
                                        variant="standard"
                                        color={darkMode == true ? "primary" : "secondary"}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                                
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item >
                                    <UnfoldMoreIcon className={classes.icon} />
                                </Grid>   

                                <Grid item xs={8}>
                                    <TextField
                                    className={classes.textfield}
                                    required
                                    id="quantity"
                                    type="number"
                                    fullWidth
                                    value={quantity}
                                    InputProps={{ inputProps: { min: 0 }, 
                                    }}
                                    onChange={handleQuantityFieldChange}
                                    label="Quantity" 
                                    variant="standard"
                                    color={darkMode == true ? "primary" : "secondary"}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>   
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item >
                                    <AttachMoneyIcon className={classes.icon} />
                                </Grid>   

                                <Grid item xs={8}>
                                    <TextField
                                    className={classes.textfield}
                                    id="cost"
                                    fullWidth
                                    InputProps={{ 
                                        inputProps: { min: 0 }, 
                                        inputComponent: currencyNumberFormat,
                                    }}
                                    onChange={handleCostFieldChange} 
                                    label="Unit Cost" 
                                    variant="standard"
                                    color={darkMode == true ? "primary" : "secondary"}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Autocomplete
                            className={classes.autocomplete}  
                            size="small"
                            id="location-cellar"
                            fullWidth
                            freeSolo
                            onChange={(event,value) => handleSelectedCellarAutocompleteChange(value)}
                            clearOnEscape
                            options={infodata.map((option) => option.mock)}
                            renderInput={(params) => (
                                <Grid container spacing={1} justify="center" alignItems="center">
                                    <Grid item>
                                        <KitchenIcon className={classes.svg_icon} />
                                    </Grid>   

                                    <Grid item xs={8} >
                                        <TextField
                                        id="location-cellar"
                                        {...params}
                                        onChange={handleSelectedCellarTextFieldChange} 
                                        label="Cellar" 
                                        variant="standard"
                                        color={darkMode == true ? "primary" : "secondary"}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Autocomplete
                            className={classes.autocomplete}  
                            size="small"
                            id="location-bin"
                            fullWidth
                            freeSolo
                            onChange={(event,value) => handleSelectedBinAutocompleteChange(value)} 
                            clearOnEscape
                            options={infodata.map((option) => option.mock)}
                            renderInput={(params) => (
                                <Grid container spacing={1} justify="center" alignItems="center">
                                    <Grid item>
                                    <CompassIcon className={classes.svg_icon} />
                                    </Grid>   

                                    <Grid item xs={8}>
                                        <TextField
                                        id="location-bin"
                                        {...params}
                                        onChange={handleSelectedBinTextFieldChange}
                                        label="Bin" 
                                        variant="standard"
                                        color={darkMode == true ? "primary" : "secondary"}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>  
                        
                        <Grid item xs={6}>
                            <Autocomplete
                            className={classes.autocomplete_store}  
                            size="small"
                            id="Store"
                            fullWidth
                            freeSolo
                            onChange={(event,value) => handleSelectedStoreAutocompleteChange(value)} 
                            clearOnEscape
                            options={infodata.map((option) => option.store)}
                            renderInput={(params) => (
                                <Grid container spacing={1} justify="center" alignItems="center">
                                    <Grid item>
                                        <StoreIcon className={classes.svg_icon} />
                                    </Grid>   

                                    <Grid item xs={8} >
                                        <TextField
                                        id="Store"
                                        {...params}
                                        onChange={handleSelectedStoreTextFieldChange} 
                                        label="Store" 
                                        variant="standard"
                                        color={darkMode == true ? "primary" : "secondary"}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                                
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item >
                                    <EventAvailableIcon className={classes.icon} />
                                </Grid>   

                                <Grid item xs={8}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                        className={classes.datepicker}
                                        autoOk
                                        clearable 
                                        value={selectedDate} 
                                        label="Date"
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
    
                        <Grid item xs={12}>
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item>
                                    <CommentOutlinedIcon className={classes.icon} />
                                </Grid>   

                                <Grid item xs={10} >
                                    <TextField
                                    className={classes.textfield}
                                    id="note"
                                    fullWidth
                                    onChange={handleNoteFieldChange} 
                                    label="Note" 
                                    variant="standard"
                                    color={darkMode == true ? "primary" : "secondary"}
                                    />
                                </Grid>
                            </Grid> 
                        </Grid> 

                        <Grid item xs={12} container spacing={0} alignItems="center" justify="space-around">
                            <Grid item xs={4}>
                                <Button
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
                                disabled={submitButtonDisabled}
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
                                autoHideDuration={2000}
                                onClose={handleSnackbarClose}
                                >
                                <Grid className={classes.alert_container} container spacing={1} justify="center"> 
                                    <Grid item xs={12} sm={10} md={8}>
                                    <Alert
                                    className={classes.alert}
                                    elevation={6} 
                                    variant="filled" 
                                    onClose={handleSnackbarClose} 
                                    severity="success"
                                    >
                                        SuCCESS
                                    </Alert>
                                    </Grid>
                                </Grid>
                            </Snackbar>

                        </Grid>

                    </Grid>
                </form>    
            </Collapse>
        </Card>
    );
}