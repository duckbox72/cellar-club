import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid  from "@material-ui/core/Grid";

import ReviewsList from './common/ReviewsList';
import Copyright from './common/Copyright';
import Navbar from "./common/Navbar";
import NavbarTransparent from "./common/NavbarTransparent";
import Searchbar from "./common/Searchbar";


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: screen.availHeight,
    },   
}));


export default function Reviews(props) {
  
    const username = props.username;
    const [reviewDisplayName, setReviewDisplayName] = useState(null);

    const [reviewsList, setReviewsList] = useState(null);
    const [reviewsListLength, setReviewsListLength] = useState(null);

    const classes = useStyles();


    // Navbar callbacks
    const darkModeCallback = () => {
        props.parentCallback();
    }
    const signOutCallback = () => {
        props.parentSignOutCallback(false);
    }


    // Searchbar callbacks
    const ReviewDisplayNameCallback = (review_display_name) => {
        setReviewDisplayName(review_display_name);
    }
    const ReviewsListCallback = (reviews_list) => {
        setReviewsList(reviews_list);
        setReviewsListLength(Object.keys(reviews_list).length);
    }
    
    
    return (
        <div className={classes.root}>
            <Grid container  spacing={2} justify="center"> 
                <Grid item xs={12}>
                    <Navbar 
                    {...props}
                    darkMode={props.darkMode} 
                    parentCallback={darkModeCallback}
                    parentSignOutCallback={signOutCallback}
                    username={username}
                    />
                </Grid>
                <Grid item xs={12}>
                    <NavbarTransparent />
                </Grid>           
                <Grid item xs={12} sm={10} md={8}>
                    <Searchbar 
                    {...props} 
                    darkMode={props.darkMode}
                    parentReviewDisplayNameCallback={ReviewDisplayNameCallback}
                    parentReviewsListCallback={ReviewsListCallback}
                    searchLocation={'Search My Reviews'}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <ReviewsList 
                    {...props} 
                    darkMode={props.darkMode}
                    reviewsList={reviewsList}
                    reviewsListLength={reviewsListLength}
                    reviewDisplayName={reviewDisplayName}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8} style={{margin: 8}}>
                    <Copyright />
                </Grid>
            </Grid>
        </div>
    );
}