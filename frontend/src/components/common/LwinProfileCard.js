import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import Autocomplete from '@material-ui/lab/Autocomplete';

import DateFnsUtils from '@date-io/date-fns'; //choose lib in future
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Avatar, Button, Card, CardHeader, Collapse, Divider, Grid, IconButton, TextField, Tooltip, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CloseIcon from '@material-ui/icons/Close';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import CompareArrowsOutlinedIcon from '@material-ui/icons/CompareArrowsOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RemoveIcon from '@material-ui/icons/Remove'
import ShareIcon from '@material-ui/icons/Share';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';

import { CompassIcon, GlassCheersIcon, SortIcon, StoreIcon, WineBottleIcon } from './SvgIcons';

import brown from '@material-ui/core/colors/brown';

import { currencyNumberFormat} from "../utils/currencyNumberFormat";
import { getBottleSizesOptions } from "../utils/getBottleSizesOptions";
import { getVintageOptions } from "../utils/getVintageOptions";


export default function LwinProfileCard(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const LwinData = props.LwinData;
    
    const useStyles = makeStyles((theme) => ({
        avatar: {
            backgroundColor: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        card: {
            margin: theme.spacing(0, 2),
            paddingBottom: theme.spacing(1), 
            borderRadius: 10,
            backgroundColor: darkMode ? brown[600] : theme.palette.common.white ,//brown[600]//amber[50],
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
            backgroundColor: darkMode ? theme.palette.secondary.main : theme.palette.text.secondary,
        },
        icon: { 
            color: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        svg_icon: { 
            height: theme.spacing(2.5),
            width: theme.spacing(2.5),
            color: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        button: { 
            margin: theme.spacing(1),
            borderRadius: 10,
        }
    }));

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
        clearFormState();
    };

    const bottleSizes = getBottleSizesOptions();
    const vintages = getVintageOptions();

    
    const [cost, setCost] = useState(null);
    const [comment, setComment] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [selectedBin, setSelectedBin] = useState(null);
    const [selectedCellar, setSelectedCellar] = useState(null);
    const [selectedDate, handleDateChange] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [selectedVintage, setSelectedVintage] = useState(null);
    
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const clearFormState = () => {
        setCost(null);
        setComment(null);
        setQuantity(null);
        setSelectedBin(null);
        setSelectedCellar(null);
        handleDateChange(null);
        setSelectedSize(null);
        setSelectedStore(null);
        setSelectedVintage(null);
        setSubmitButtonDisabled(true);
    };
    
    const handleCommentFieldChange = (e) => {
        setComment(e.target.value);
    }

    const handleCostFieldChange = (e) => {
        setCost(parseInt(e.target.value));
    };

    const handleQuantityFieldChange = (e) => {
        setQuantity(e.target.value);
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
        setSelectedSize(value);
    }

    const handleSelectedStoreTextFieldChange = (e) => {
        setSelectedSize(e.target.value);
    }

    const handleSelectedVintageAutocompleteChange = (value) => {
        setSelectedVintage(value);
    }

    const handleSelectedVintageTextFieldChange = (e) => {
        setSelectedVintage(e.target.value);
    }


    const handleCancelButtonClick = () => {
        setExpanded(false);
        clearFormState();
    };
    
    const handleSubmitButtonClick = () => {
        console.log('CLICK')
        console.log(LwinData)
        console.log(cost);
        console.log(selectedVintage);
        console.log(selectedSize);
        console.log(quantity);
        console.log(selectedCellar);
        console.log(selectedBin);
        console.log(selectedDate);
        console.log(selectedStore)
        console.log(comment);
    };

    const handleSubmitButtonDisabledStatus = () => {
        selectedVintage !== null && selectedSize !== null && quantity !== null ?
        setSubmitButtonDisabled(false) : setSubmitButtonDisabled(true);
    };
    
    useEffect(() => {
        handleSubmitButtonDisabledStatus()
    });


    const infodata = [
        {mock: 'some string', store: 'ABC Wine and Spirits'},
        {mock: 'some string', store: 'Total Wine & More'},
        {mock: 'some string', store: 'Goody Goody'},
        {mock: 'some string', store: 'Speck\'s Wines'},
        {mock: 'some string', store: 'Cellaraiders.com'},
    ];

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
                        onClick={() => {console.log('CLICK!')}}
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
                   {LwinData.display_name}
                </Typography>
            }
            subheader={
                <Typography variant="body2" color="textSecondary" className={classes.header_subheader}>
                   {LwinData.region !== undefined ? LwinData.colour + " " + LwinData.region + ", " + LwinData.country : "Search CellarClub for almost 100K products"}
                </Typography>
            }
            />


            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <Divider className={classes.divider} />
                
                <form>
                    <Grid container className={classes.container_collapse} spacing={1} justify="space-evenly" >
                        
                        <Grid item xs={6} >
                                <Typography size="small" variant="button">
                                    Add to my cellar
                                </Typography>
                        </Grid>

                        <Grid item xs={4}>
                                
                        </Grid>
                                        
                        <Grid item xs={6}>
                            <Autocomplete  
                            size="small"
                            id="vintage"
                            fullWidth
                            freeSolo
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
                            size="small"
                            id="size"
                            fullWidth
                            freeSolo
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
                                    <SortIcon className={classes.svg_icon} />
                                </Grid>   

                                <Grid item xs={8}>
                                    <TextField
                                    required
                                    id="quantity"
                                    type="number"
                                    fullWidth
                                    value={quantity !== null ? quantity : undefined}
                                    InputProps={{ inputProps: { min: 1 },
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
                                    id="cost"
                                    fullWidth
                                    InputProps={{ 
                                        inputProps: { min: 0 }, 
                                        inputComponent: currencyNumberFormat,
                                    }}
                                    onChange={handleCostFieldChange} 
                                    label="Cost" 
                                    variant="standard"
                                    color={darkMode == true ? "primary" : "secondary"}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Autocomplete  
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
                                        <CompassIcon className={classes.svg_icon} />
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
                                        <CompareArrowsOutlinedIcon className={classes.icon} />
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
                                        showTodayButton
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
                                    id="comment"
                                    fullWidth
                                    onChange={handleCommentFieldChange} 
                                    label="Comment" 
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
                        </Grid>

                    </Grid>
                </form>    
            </Collapse>
        </Card>
    );
}