import React, { Component } from "react";
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

export default class CollectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchChange: "",

        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(e) {
        this.setState({
            searchChange: e.target.value,
        });

        /*
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                display_name: this.state.searchChange,
            })
        }
        */

        console.log(e.target.value)

        
        fetch("/api/search" + "?display_name=" + "margaux")//e.target.value)
        .then((response) => response.json())
        .then(data => {
            console.log(data)
        });
        
    }

    render() {
        return (
        <>
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
        </>
        )
    }
}