import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, IconButton, Toolbar, Tooltip, Typography} from '@material-ui/core';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import { makeStyles, useTheme } from '@material-ui/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import DrawerMenu from "./DrawerMenu";


const logoFontTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Quicksand', 'sans-serif',
        ].join(','),
    },
});


const useStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaNav,
    },
    appbar_typography: {
        flex: 1,
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    iconButton: {
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    iconLogo: {
        color: mystyleprops => mystyleprops.colorSchemaA,
        width: theme.spacing(6),
        height: theme.spacing(6),
        margin: theme.spacing(0, 1, 0, 0),
    },
}));


export default function Navbar(props) {
    
    const [darkMode, setdarkMode] = useState(props.darkMode);
    const userProfile = props.userProfile;
    
    
    const theme = useTheme(); 
    const mystyleprops = {
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        backgroundColorSchemaNav: darkMode ? theme.palette.secondary.dark : theme.palette.primary.main,
    }
    const classes = useStyles(mystyleprops);
   
   
    const toggleDarKMode = () => {
        props.parentDarkModeCallback()
        setdarkMode(!darkMode);
    }

    const sigOutCallback = () => {
        props.parentSignOutCallback();
    }


    return (
        <AppBar position="fixed" elevation={1} className={classes.appbar}>
            <Toolbar>   
                <Tooltip title="Home">          
                    <AllInclusiveIcon className={classes.iconLogo} onClick={() => {props.history.push('/')}}/>
                </Tooltip>   
                <ThemeProvider theme={logoFontTheme}>
                    <Typography variant={'h6'} className={classes.appbar_typography} onClick={() => {props.history.push('/')}}>
                        C e l l a r C l u b
                    </Typography> 
                </ThemeProvider>
                <Tooltip title="Toggle light/dark mode">
                    <IconButton aria-label="toggleDarkMode" onClick={toggleDarKMode}>
                        <Brightness4Icon className={classes.iconButton} />
                    </IconButton>
                </Tooltip>
                <DrawerMenu 
                    {...props}
                    darkMode={props.darkMode}
                    userProfile={props.userProfile}
                    parentSignOutCallback={sigOutCallback}
                />
            </Toolbar>
        </AppBar>
    );
};
