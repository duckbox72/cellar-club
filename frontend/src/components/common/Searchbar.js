import React, { Component } from "react";
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete';


export default class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchChange: "",
            searchTop10: []

        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(e) {
        this.setState({
            searchChange: e.target.value,
        });

        console.log(e.target.value)

        fetch("/api/search" + "?display_name=" + e.target.value)
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                searchTop10: data,
            });

            
        });
        
    }

    render() {
        return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <TextField
                        onChange={this.handleSearchChange}
                        label="Wine Search"
                        placeholder="Enter wine name"
                        value={this.state.searchChange}
                        variant="outlined"
                    />
                </Grid>       
            </Grid>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={this.state.searchTop10.map((option) => option.display_name)}
                renderInput={(params) => (
                <TextField 
                {...params}
                onChange={this.handleSearchChange} 
                label="wine search" 
                margin="normal" 
                
                variant="outlined" />
                )}
            />
        </div>
        )
    }
}