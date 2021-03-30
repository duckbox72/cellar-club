import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';

import { FixedSizeList } from 'react-window';
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


function renderRow(props) {
    const classes = useStyles();
    const { index, style } = props;
  
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primaryTypographyProps={primaryTypographyProps} primary={`Item ${index + 1}`} />
        <ListItemText secondary={`Item ${index + 1}`} />
        <Typography>TEST</Typography><Typography>TEST</Typography><Typography>TEST</Typography><Typography>TEST</Typography><Typography>TEST</Typography>
      </ListItem>
    );
}
  
renderRow.propTypes = {
index: PropTypes.number.isRequired,
style: PropTypes.object.isRequired,
};
  

export default function BottleList(props) {

    const darkMode = props.darkMode;
    const userProfile = props.userProfile;
    const bottleName = props.bottleName;
    
    //const bottleList = props.bottleList;

    const theme = useTheme(); 
    const mystyleprops = {
        backgroundColorSchemaA: darkMode ? brown[600] : theme.palette.common.white,
    }
    const classes = useStyles(mystyleprops);

    // Used for FixedSizeList layout
    const height = 0.5 * screen.availHeight;

    return (
        <div className={classes.list}>
            <ListItem>
                <Grid container spacing={1}>
                    <Grid item>
                        <Typography variant={'button'}>THIS IS MY HEADER</Typography> 
                    </Grid>
                </Grid>
            </ListItem>
            <FixedSizeList   height={height} itemSize={46} itemCount={200}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}