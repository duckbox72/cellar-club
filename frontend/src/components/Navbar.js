import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import Switch from '@material-ui/core/Switch'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

const Navbar = (props) => {
    
    function toggleDarKMode() {
        props.parentCallback()
    }
    
    const classes = useStyles();

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography className={classes.typographyStyles}>
                    CellarClub 
                </Typography>
                <Switch 
                    checked={props.darKMode}
                    onChange={toggleDarKMode}
                />
                <IconButton aria-label="toggleDarkMode" onClick={toggleDarKMode}>
                  <BrightnessMediumIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;