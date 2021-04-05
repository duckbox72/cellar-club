// THIS FILE WAS REFACTORED FROM A CLASS COMPOMNENT TO A FUNCTIONAL COMPONENT WITH HOOKS
import React, { useEffect ,useState } from "react";
import { makeStyles , useTheme } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Divider ,IconButton , Menu, MenuItem, Paper, TextField, Tooltip } from '@material-ui/core';

import FindReplaceIcon from '@material-ui/icons/FindReplace';

import brown from '@material-ui/core/colors/brown';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(0.5),
        display: 'flex',
        height: theme.spacing(7.5),
        alignItems: 'center',
        margin: theme.spacing(0, 2),
        borderRadius: 10,    
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA 
    },
    autocomplete: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
        paddingBottom: theme.spacing(1.75),
    },
    searchIconButton: {
        padding: 10,
    },
    divider: {
        height: theme.spacing(4),
        margin: theme.spacing(.5),
    },
    adornmentButton: { 
        paddingBottom: theme.spacing(1.75),
    },
}));


export default function Searchbar(props) {

    const darkMode = props.darkMode;

    const searchLocation = props.searchLocation;
    const [sourceMenuAnchor, setSourceMenuAnchor] = useState(null);
    
    const [searchbarValue, setSearchbarValue] = useState(null);
    const [searchResult, setSearchResult] = useState([]);

    
    
    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
    }
    const classes = useStyles(mystyleprops);


    const getSearchResults = (location, value) => {
        fetch(`/api/search_${location}/${value}`)
        .then((response) => response.json())
        .then(data => {
            setSearchResult(data);
        });  
    }
    

    const getLwinData = (value) => {
        fetch(`api/get_lwin/${value}`)
        .then((response) => response.json())
        .then(lwin_data => {
            props.parentLwinDataCallback(lwin_data);
        });  
    }

    
    const getBottleName = (value) => {
        fetch(`api/get_bottle_name/${value}`)
        .then((response) => response.json())
        .then(bottle => {
            props.parentBottleNameCallback(bottle.display_name);
        });  
    }

    
    const getBottleList  = (value) => {
        fetch(`/api/get_bottle_list/${value}`)
        .then(response => response.json())
        .then(bottle_list => {
            props.parentBottleListCallback(bottle_list);
        });
    };
    
    
    // TO BE MOVED
    const getBottleData = (bottle_id) => {
        fetch(`api/get_bottle/${bottle_id}`)
        .then((response) => response.json())
        .then(bottle_data => {
            props.parentBottleDataCallback(bottle_data);
        });  
    }

    
    const handleAutocompleteChange = (value) => {
        console.log(`AUTOCOMPLETE CHANGE TO value ==>> ${value}`);
        setSearchbarValue(value)
        
        // Search.js calls
        if (searchLocation == 'Search CellarClub') {
            if (value !== null) {
                getLwinData(value);
            } else {
                props.parentLwinDataCallback(value); // value = false
                setSearchResult([]);
            }
        }

        // Collection.js calls
        if (searchLocation == 'Search My Collection') {
            getBottleList(value); //called in all change cases
            if (value !== null) {
                getBottleName(value);
            } else {
                props.parentBottleNameCallback(value); // value = false
                setSearchResult([]);
            }
        }        
    }
    
    
    const handleSearchbarValueChange = e => {
        console.log(`SEARCHBAR VALUE CHANGED TO ${e.target.value}`);
        setSearchbarValue(e.target.value);
        
        // Search.js calls
        if (searchLocation == 'Search CellarClub') {
            const location = 'lwin';
            
            if (e.target.value == null ) {
                setSearchResult([]);
            } else {
                if ((e.target.value).length > 2) {
                    getSearchResults(location, e.target.value);
                } else {
                    setSearchResult([]);
                }
            }  
        }

        // Collection.js calls
        if (searchLocation == 'Search My Collection') {
            const location = 'bottle';

            if (e.target.value == null ) {
                setSearchResult([]);
            } else {
                if ((e.target.value).length > 2) {
                    getSearchResults(location, e.target.value);
                } else {
                    setSearchResult([]);
                }
            }
        }
    }


    const handleSourceMenuClick = (event) => {
        setSourceMenuAnchor(event.currentTarget);
    }


    const handleSourceMenuClose = (event) => {
        setSourceMenuAnchor(null);
    }
    

    // toggler set to avoid infinite loop
    const [toggler, setToggler] = useState(true);
    useEffect(() => {
        if (searchLocation == 'Search My Collection' && toggler) {
                // default bottle list
                getBottleList(null); 
                setToggler(false);
        }          
    })

    
    return ( 
        <Paper className={classes.root} elevation={1}>
            <Tooltip title={'Search Menu'}>
                <IconButton 
                aria-controls="source-menu" 
                aria-haspopup="true"
                onClick={handleSourceMenuClick}
                >
                    <FindReplaceIcon />
                </IconButton>
            </Tooltip>
            <Menu
            id="source-menu"
            anchorEl={sourceMenuAnchor}
            keepMounted
            open={Boolean(sourceMenuAnchor)}
            onClose={handleSourceMenuClose}
            >
                <MenuItem dense onClick={() => props.history.push('/search')}>Search CellarClub</MenuItem>
                <MenuItem dense onClick={() => props.history.push('/collection')}>Search My Collection</MenuItem>
                <MenuItem dense onClick={handleSourceMenuClose}>Search My Reviews</MenuItem>
            </Menu>
                <Divider className={classes.divider} orientation="vertical" />
            <Autocomplete  
                size="small"
                className={classes.autocomplete}
                id="searchbar"
                fullWidth
                //freeSolo
                onChange={(event,value) => handleAutocompleteChange(value)} 
                clearOnEscape
                handleHomeEndKeys
                options={searchResult.map((option) => option.display_name)}
                renderInput={(params) => (
                    <div>
                        <TextField
                        id="search-field"
                        {...params}
                        onChange={handleSearchbarValueChange} 
                        label={searchLocation} 
                        margin="normal" 
                        variant="standard"
                        color={props.darkMode == true ? "primary" : "secondary"}
                        />
                    </div>
                )}
            />
        </Paper>
    )
};
