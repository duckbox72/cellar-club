// THIS FILE WAS REFACTORED FROM A CLASS COMPOMNENT TO A FUNCTIONAL COMPONENT WITH HOOKS
import React, { useState } from "react";
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Typography } from '@material-ui/core';


export default function Searchbar() {
    
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
        <Grid container spacing={1} justify="center">
            <Grid item xs={12} sm={8} md={6}> 
                <Autocomplete
                    id="searchbar"
                    freeSolo
                    options={searchResult.map((option) => option.display_name)}
                    renderInput={(params) => (
                    <TextField 
                    {...params}
                    onChange={handleSearchbarChange} 
                    label="wine search" 
                    margin="normal" 
                    variant="outlined" />
                    )}
                />
            </Grid>
        </Grid>
    </div>
    )
};