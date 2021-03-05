import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Avatar, IconButton, Toolbar, Tooltip, Typography} from '@material-ui/core';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import { makeStyles } from '@material-ui/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import DrawerMenu from "./DrawerMenu";


const logoFontTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Quicksand', 'sans-serif',
        ].join(','),
    },
});


export default function Navbar(props) {
    const useStyles = makeStyles((theme) => ({
        appbar: {
            backgroundColor: navbarDarkMode ? theme.palette.secondary.dark : theme.palette.primary.main,
        },
        appbar_typography: {
            flex: 1,
            color: navbarDarkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        iconButton: {
            color: navbarDarkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        iconLogo: {
            color: navbarDarkMode ? theme.palette.primary.main : theme.palette.secondary.main,
            width: theme.spacing(6),
            height: theme.spacing(6),
            margin: theme.spacing(0, 1, 0, 0),
        },
    }));
    
    const [navbarDarkMode, setNavbarDarkMode] = useState(props.darkMode);
    
    const toggleDarKMode = () => {
        props.parentDarkModeCallback()
        setNavbarDarkMode(!navbarDarkMode);
    }

    const sigOutCallback = () => {
        props.parentSignOutCallback();
    }

    const userProfile = props.userProfile;
    
    const classes = useStyles();

    return (
        <AppBar position="static" elevation={1} className={classes.appbar}>
            <Toolbar className={classes.toolbarStyles}>                
                <AllInclusiveIcon className={classes.iconLogo} onClick={() => {props.history.push('/')}}/>
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
