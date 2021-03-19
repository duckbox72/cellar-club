// THIS FILE WAS REFACTORED FROM A CLASS COMPOMNENT TO A FUNCTIONAL COMPONENT WITH HOOKS
import React, { useEffect ,useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Divider ,IconButton ,Paper, TextField } from '@material-ui/core';

import { SearchLocationIcon } from './SvgIcons';

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
        svg_icon: { 
            height: theme.spacing(2.5),
            width: theme.spacing(2.5),
        },
    }));

    const classes = useStyles();
    
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


    return ( 
        <Paper className={classes.root} elevation={1}>
            <IconButton className={classes.menuIconButton}>
                <SearchLocationIcon className={classes.svg_icon} />
            </IconButton>
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