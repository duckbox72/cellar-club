import React, { useEffect ,useState } from "react";
import { makeStyles , useTheme } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

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

    // LWIN SEARCH RELATED
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

    // COLLECTION SEARCH RELATED (BOTTLE)
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
    
    // TO BE MOVED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const getBottleData = (bottle_id) => {
        fetch(`api/get_bottle/${bottle_id}`)
        .then((response) => response.json())
        .then(bottle_data => {
            props.parentBottleDataCallback(bottle_data);
        });  
    }


    // MEMORIES SEARCH RELATED
    const getDisplayName = (value) => {
        fetch(`api/get_display_name/${value}`)
        .then((response) => response.json())
        .then(memory => {
            props.parenDisplayNameCallback(memory.display_name);
        });  
    }

    const getMemoriesList = (value) => {
        fetch(`/api/get_memories_list/${value}`)
        .then(response => response.json())
        .then(memories_list => {
            props.parentMemoriesListCallback(memories_list);
        });
    }


    // REVIEW SEARCH RELATED
    const getReviewDisplayName = (value) => {
        fetch(`api/get_review_display_name/${value}`)
        .then((response) => response.json())
        .then(review => {
            props.parentReviewDisplayNameCallback(review.display_name);
        });  
    }

    const getReviewsList = (value) => {
        fetch(`/api/get_reviews_list/${value}`)
        .then(response => response.json())
        .then(reviews_list => {
            props.parentReviewsListCallback(reviews_list);
        });
    }




    
    const handleAutocompleteChange = (value) => {
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
                props.parentDisplayNameCallback(value); // value = false
                setSearchResult([]);
            }
        }
        
        // Memories.js calls
        if (searchLocation == 'Search My Memories') {
            getMemoriesList(value); //called in all change cases
            if (value !== null) {
                getDisplayName(value);
            } else {
                props.parentDisplayNameCallback(value); // value = false
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

        // Memories.js calls
        if (searchLocation == 'Search My Memories') {
            const location = 'memory';

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
        
        if (searchLocation == 'Search My Memories' && toggler) {
            // default memories list
            getMemoriesList(null); 
            setToggler(false);
        }   
        
        if (searchLocation == 'Search My Reviews' && toggler) {
            // default reviews list
            getReviewsList(null); 
            setToggler(false);
        }   
    })

    
    return ( 
        <Paper className={classes.root} elevation={3}>
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
                <MenuItem dense onClick={() => props.history.push('/collection')}>Search Collection</MenuItem>
                <MenuItem dense onClick={() => props.history.push('/memories')}>Search Memories</MenuItem>
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
