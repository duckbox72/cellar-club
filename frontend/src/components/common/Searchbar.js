// THIS FILE WAS REFACTORED FROM A CLASS COMPOMNENT TO A FUNCTIONAL COMPONENT WITH HOOKS
import React, { useEffect ,useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Divider ,IconButton , InputAdornment, Menu, MenuItem, Paper, TextField } from '@material-ui/core';

import FindReplaceIcon from '@material-ui/icons/FindReplace';

import brown from '@material-ui/core/colors/brown';


export default function Searchbar(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            paddingLeft: theme.spacing(0.5),
            display: 'flex',
            height: theme.spacing(7.5),
            alignItems: 'center',
            margin: theme.spacing(0, 2),
            borderRadius: 10,    
            backgroundColor: props.darkMode ? brown[600] : theme.palette.common.white 
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

    const classes = useStyles();
    
    const [sourceMenuAnchor, setSourceMenuAnchor] = useState(null);
    const [searchbarValue, setSearchbarValue] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    
    
    const getLwinData = (currentValue) => {
        //fetch('/api/get_lwin' + '?display_name=' + currentValue)
        fetch(`api/get_lwin/${currentValue}`)
        .then((response) => response.json())
        .then(lwin_data => {
            props.parentLwinDataCallback(lwin_data);
        });  
    }
    
    
    const getSearchResults = (currentValue) => {
        //fetch('/api/search_lwin' + '?display_name=' + currentValue)
        fetch(`/api/search_lwin/${currentValue}`)
        .then((response) => response.json())
        .then(data => {
            setSearchResult(data);
        });  
    }

    
    const handleAutocompleteChange = (value) => {
        console.log(`AUTOCOMPLETE CHANGE TO value ==>> ${value}`);
        setSearchbarValue(value)
        if (value !== null) {
            getLwinData(value);
        } else {
            props.parentLwinDataCallback(value); // value = false
        }
    }
    
    
    const handleSearchbarValueChange = e => {
        console.log(`SEARCHBAR VALUE CHANGED TO ${e.target.value}`);
        setSearchbarValue(e.target.value);

        if (e.target.value == null ) {
            setSearchResult([]);
        } else {
            if ((e.target.value).length > 2) {
                getSearchResults(e.target.value);
            } else {
                setSearchResult([]);
            }
        }  
    }


    const handleSourceMenuClick = (event) => {
        setSourceMenuAnchor(event.currentTarget);
        console.log(event.currentTarget);
    }


    const handleSourceMenuClose = (event) => {
        setSourceMenuAnchor(null);
        console.log(sourceMenuAnchor);
    }


    return ( 
        <Paper className={classes.root} elevation={1}>
            <IconButton 
            aria-controls="source-menu" 
            aria-haspopup="true"
            onClick={handleSourceMenuClick}
            >
                <FindReplaceIcon />
            </IconButton>
            <Menu
            id="source-menu"
            anchorEl={sourceMenuAnchor}
            keepMounted
            open={Boolean(sourceMenuAnchor)}
            onClose={handleSourceMenuClose}
            >
                <MenuItem onClick={handleSourceMenuClose}>Search CellarClub</MenuItem>
                <MenuItem onClick={handleSourceMenuClose}>Search My Collection</MenuItem>
                <MenuItem onClick={handleSourceMenuClose}>Search My Reviews</MenuItem>
            </Menu>
                <Divider className={classes.divider} orientation="vertical" />
            <Autocomplete  
                size="small"
                className={classes.autocomplete}
                id="searchbar"
                fullWidth
                freeSolo
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
                        label="Search CellarClub" 
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
