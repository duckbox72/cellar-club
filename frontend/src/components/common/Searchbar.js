// THIS FILE WAS REFACTORED FROM A CLASS COMPOMNENT TO A FUNCTIONAL COMPONENT WITH HOOKS
import React, { useState } from "react";
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function Searchbar() {
    
    const [searchbarChange, setSearchbarChange] = useState("")
    const [searchResult, setSearchResult] = useState([])
    
    const handleSearchbarChange = e => {
        setSearchbarChange(e.target.value)
        console.log(e.target.value)

        fetch("/api/search" + "?display_name=" + e.target.value)
        .then((response) => response.json())
        .then(data => {
            setSearchResult(data);
        });  
    }

    return (
    <div>
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
    </div>
    )
};