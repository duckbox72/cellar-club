import React, { Component } from "react";
import { Button, Grid, Typography, TextField, FormControl, FormHelperText } from "@material-ui/core";
import FormControlLabel from  "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from  "@material-ui/core/RadioGroup";

import { Link } from "react-router-dom";

export default class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: "",
            b: "",
            c: 0
        };
        this.handleAChange = this.handleAChange.bind(this);
        this.handleBChange = this.handleBChange.bind(this);
        this.handleCChange = this.handleCChange.bind(this);
        this.hanleButtonClick = this.hanleButtonClick.bind(this);
    }

    handleAChange(e) {
        this.setState({
            a: e.target.value,
        }); 
    }

    handleBChange(e) {
        this.setState({
            b: e.target.value,
        }); 
    }

    handleCChange(e) {
        this.setState({
            c: e.target.value,
        }); 
    }

    hanleButtonClick() {
        console.log(this.state)
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                a: this.state.a,
                b: this.state.b,
                c: this.state.c,
            })
        };
        fetch('api/create', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // redirects to an external link out of router
            window.location.href = '/api/';
            
            // redirects to an internal router link
            // this.props.history.push('/');
        });
    }

    render() {
        // each 1 in spacing means 8px in space
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h5" variant="h5">
                    Create a Sample Entry
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                    onChange={this.handleCChange}
                    required={true} 
                    type="number" 
                    defaultValue={0}
                    inputProps={{
                        min: 0,
                        style: {textAlign: "left"}
                    }}
                    />
                </FormControl> 
                <FormHelperText>
                    <div align="center">
                        enter number
                    </div>
                </FormHelperText>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                    onChange={this.handleAChange} 
                    required={true} 
                    type="text" 
                    placeholder="enter a"
                    inputProps={{
                        style: {textAlign: "left"}
                    }}
                    />
                </FormControl> 
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        onChange={this.handleBChange} 
                        required={true} 
                        type="text" 
                        placeholder="enter b"
                        inputProps={{
                            style: {textAlign: "left"}
                        }}
                    />
                </FormControl> 
            </Grid>
            <Grid item xs={12} align="center">
                <Button 
                color="primary" 
                variant="outlined"
                onClick={this.hanleButtonClick}
                >Create Sample</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button 
                color="secondary" 
                variant="outlined" 
                to="/" 
                component={ Link }
                >Cancel / Back</Button>
            </Grid>
        </Grid>
        );
    }
}