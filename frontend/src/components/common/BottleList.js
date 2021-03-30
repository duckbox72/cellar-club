import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';

import { FixedSizeList } from 'react-window';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
    list: {
        margin: theme.spacing(0, 2),
        borderRadius: 10,
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaA,
        width: window.width,
    },
    lit: {
        color: 'red',
        fontSize: 48,
    },
}));

const primaryTypographyProps = { style: {color: 'red', fontSize: 14}}





export default function BottleList(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const bottleName = props.bottleName;
    const bottleList = props.bottleList != null ? props.bottleList : [];
    const bottleListLength = props.bottleListLength != null ? props.bottleListLength : 0;

    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
    }
    const classes = useStyles(mystyleprops);

    // Used for FixedSizeList layout
    //const height = 0.5 * screen.availHeight;
    const height = 0.5 * screen.availHeight;

    const bottleListItems = (bottles) => {
        if (bottles) {
            return bottles.map(bottle => (
                <ListItem button key={bottle.id}>
                    <ListItemText primary={bottle.vintage} primaryTypographyProps={primaryTypographyProps} />
                    <ListItemText secondary={bottle.display_name} />
                </ListItem>
            ));
        }     
    };


    useEffect(() => {
        //bottleList.map(bottle => {
        //    console.log(bottle)
        //})
        console.log(bottleList, bottleListLength)

    })


    function renderRow(props) {
        //const classes = useStyles();
        const { index, style } = props;

        const bottle = bottleList[index];
        console.log(bottle)
      
        return (
          <ListItem button style={{'style': 'props'}} key={index}>
            <ListItemText primaryTypographyProps={primaryTypographyProps} primary={`Item ${index + 1}`} />
            <ListItemText secondary={'secondary'} />
            <Typography></Typography>
          </ListItem>
        );
    }
      
    renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    };
    
    return (
        <div className={classes.list}>
            <ListItem>
                <Grid container spacing={1}>
                    <Grid item>
                        <Typography variant={'button'}>THIS IS MY HEADER</Typography> 
                    </Grid>
                </Grid>
            </ListItem>
            <List  style={{height: height, overflow: 'scroll'}}>
                {bottleListItems(bottleList)}
            </List>
        </div>
    );
}