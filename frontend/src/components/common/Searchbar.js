// THIS FILE WAS REFACTORED FROM A CLASS COMPOMNENT TO A FUNCTIONAL COMPONENT WITH HOOKS
import React, { useEffect ,useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Divider ,Grid, IconButton ,Paper, TextField } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        height: 60,
        margin: theme.spacing(2),
    },
    autocomplete: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
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


export default function Searchbar() {

    const classes = useStyles();
    
    const [searchbarValue, setSearchbarValue] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [searchIconDisabled, setSearchIconDisabled] = useState(true)
    
    
    const getSearchResults = (currentValue) => {
        fetch("/api/search" + "?display_name=" + currentValue)
        .then((response) => response.json())
        .then(data => {
            setSearchResult(data);
        });  
    }
    
    const handleSearchbarChange = e => {
        console.log(`SEARCHBAR VALUE CHANGED TO ${e.target.value}`);
        setSearchbarValue(e.target.value)

        if (e.target.value == null ) {
            setSearchIconDisabled(true);
        } else {
            getSearchResults(e.target.value)
        }
        
    }

    const handleAutocompleteChange = (value) => {
        console.log(`AUTOCOMPLETE CHANGE TO value ==>> ${value}`);
        setSearchbarValue(value)

        if (value == null) {
            setSearchIconDisabled(true);
        } else {
            setSearchIconDisabled(false);
        }
    }

    //useEffect(() => {
    //    const newValue = document.querySelector('#searchbar').value;
    //    setSearchbarValue(newValue)
        
    //    console.log(`ACTUAL VALUE FOR searchbar -->> (${newValue})`);
    //    console.log(`ACTUAL const searchbarValue -->> ${searchbarValue}`);
    //});


    
    return ( 
        <Paper className={classes.root} elevation={1}>
            <IconButton className={classes.menuIconButton}>
                <MenuIcon />
            </IconButton>
            <Autocomplete  
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
                        onChange={handleSearchbarChange} 
                        label="wine search" 
                        margin="normal" 
                        variant="standard"
                        //color="secondary"
                        />
                    </div>
                )}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
            disabled={searchIconDisabled} 
            className={classes.searchIconButton}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    )
};