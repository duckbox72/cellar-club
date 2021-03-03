// THIS FILE WAS REFACTORED FROM A CLASS COMPOMNENT TO A FUNCTIONAL COMPONENT WITH HOOKS
import React, { useEffect ,useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Divider ,Grid, IconButton ,Paper, TextField } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';


export default function Searchbar(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            height: 54,
            margin: theme.spacing(0, 3),    
            backgroundColor: props.darkMode ? brown[600] : amber[50],   
        },
        autocomplete: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        menuIconButton: {
            padding: 10,
        },
        searchIconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }));

    const classes = useStyles();
    
    const [searchbarValue, setSearchbarValue] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [searchIconDisabled, setSearchIconDisabled] = useState(true)
    
    
    const getLwinData = (currentValue) => {
        //fetch('/api/get_lwin' + '?display_name=' + currentValue)
        fetch(`api/get_lwin/${currentValue}`)
        .then((response) => response.json())
        .then(lwin_data => {
            console.log(lwin_data);
            props.parentLwinDataCallback(lwin_data);
        });  
    }
    
    
    const getSearchResults = (currentValue) => {
        //fetch('/api/search_lwin' + '?display_name=' + currentValue)
        fetch(`/api/search_lwin/${currentValue}`)
        .then((response) => response.json())
        .then(data => {
            setSearchResult(data);
            console.log(data)
        });  
    }

    
    const handleAutocompleteChange = (value) => {
        console.log(`AUTOCOMPLETE CHANGE TO value ==>> ${value}`);
        setSearchbarValue(value)

        if (value == null) {
            setSearchIconDisabled(true);
        } else {
            setSearchIconDisabled(false);
            getLwinData(value);
        }
    }
    
    const handleSearchbarValueChange = e => {
        console.log(`SEARCHBAR VALUE CHANGED TO ${e.target.value}`);
        setSearchbarValue(e.target.value);

        if (e.target.value == null ) {
            setSearchIconDisabled(true);
            setSearchResult([]);
        } else {
            if ((e.target.value).length > 2) {
                getSearchResults(e.target.value);
            } else {
                setSearchResult([]);
            }
        }  
    }

    const handleSearchButtonClick = () => {
        console.log('SEARCH BUTTON CLICKED!');
        console.log(searchbarValue);
        getLwinData(searchbarValue)
    }

    return ( 
        <Paper className={classes.root} elevation={1}>
            <IconButton className={classes.menuIconButton}>
                <MenuIcon />
            </IconButton>
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
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
            disabled={searchIconDisabled} 
            className={classes.searchIconButton}
            onClick={handleSearchButtonClick}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    )
};