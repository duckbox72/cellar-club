import React, { useState } from 'react';
import { AppBar, Avatar, IconButton, Toolbar, Tooltip, Typography} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { makeStyles } from '@material-ui/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey }  from '@material-ui/core/colors';

import DrawerMenu from "./DrawerMenu";


const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Quicksand', 'sans-serif',
        ].join(','),
    },
});


const Navbar = (props) => {
    const useStyles = makeStyles((theme) => ({
        appbar: {
            backgroundColor: navbarDarkMode ? grey[900] : grey[300],
        },
        appbar_img: {
            height: "56px",
            [theme.breakpoints.down("sm")]: {
                height: "48px",
            },
            marginRight: theme.spacing(1)
        },
        appbar_typography: {
            flex: 1,
            color: navbarDarkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        avatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            backgroundColor: navbarDarkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        iconButton: {
            color: navbarDarkMode ? theme.palette.primary.main : theme.palette.secondary.main,
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
        <AppBar position="static" color="default" elevation={0} className={classes.appbar}>
            <Toolbar className={classes.toolbarStyles}>
                <img src={navbarDarkMode ? "/static/images/logo_dark.png" : "/static/images/logo_light.png"} alt="logo" className={classes.appbar_img}></img>
                <ThemeProvider theme={theme}>
                    <Typography variant={'h6'} className={classes.appbar_typography}>
                        C e l l a r C l u b
                    </Typography> 
                </ThemeProvider>
                <Tooltip title="Toggle light/dark mode">
                    <IconButton aria-label="toggleDarkMode" onClick={toggleDarKMode}>
                        <Brightness4Icon className={classes.iconButton} />
                    </IconButton>
                </Tooltip>
                <DrawerMenu 
                    darkMode={props.darkMode}
                    userProfile={props.userProfile}
                    parentSignOutCallback={sigOutCallback}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;