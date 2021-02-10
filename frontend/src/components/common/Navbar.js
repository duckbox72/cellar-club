import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import Switch from '@material-ui/core/Switch'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
    typographyStyles: {
        flex: 1,
        //color: theme.palette.common.white,
    },
    toolbarStyles: {
        //backgroundColor: theme.palette.secondary,

    },
}));

const Navbar = (props) => {
    
    function toggleDarKMode() {
        props.parentCallback()
    }

    const userProfile = props.userProfile;
    
    console.log(`NAVBAR user profile ${userProfile}`)

    const classes = useStyles();

    return (
        <AppBar position="static" color="default">
            <Toolbar className={classes.toolbarStyles}>
                <Typography className={classes.typographyStyles}>
                    CellarClub 
                </Typography>
                <Typography>
                    {userProfile.username}
                </Typography>
                <Switch 
                    checked={props.darKMode}
                    onChange={toggleDarKMode}
                    color="primary"
                />
                <Tooltip title="Toggle light/dark mode">
                    <IconButton aria-label="toggleDarkMode" onClick={toggleDarKMode}>
                         <BrightnessMediumIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;