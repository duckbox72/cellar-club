// THIS FILE WAS REFACTORED FROM A CLASS COMPOMNENT TO A FUNCTIONAL COMPONENT WITH HOOKS
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Divider ,Grid, IconButton ,Paper, TextField } from '@material-ui/core';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        height: 60,
    },
    autocomplete: {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(2),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Searchbar() {

    const classes = useStyles();
    
    const [searchbarValue, setSearchbarValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    
    const handleSearchbarChange = e => {
        setSearchbarValue(e.target.value)
        console.log(e.target.value)
        
        fetch("/api/search" + "?display_name=" + e.target.value)
        .then((response) => response.json())
        .then(data => {
            setSearchResult(data);
        });  
    }

    return (
    <div>
        <Paper className={classes.root}>
            <IconButton className={classes.iconButton}>
                <MenuIcon />
            </IconButton>
                <Autocomplete 
                    className={classes.autocomplete}
                    id="searchbar"
                    value={searchbarValue}
                    
                    freeSolo
                    clearOnEscape
                    handleHomeEndKeys
                    options={searchResult.map((option) => option.display_name)}
                    renderInput={(params) => (
                        <div>
                            <TextField 
                            {...params}
                            onChange={handleSearchbarChange} 
                            label="wine search" 
                            margin="normal" 
                            variant="standard" 
                            />
                        </div>
                    )}
                />
            <IconButton className={classes.iconButton}>
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton className={classes.iconButton}>
                <DirectionsIcon />
            </IconButton>
        </Paper>
    </div>
    )
};