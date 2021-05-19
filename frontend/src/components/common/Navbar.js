import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';

import { GlassCheersIcon } from './SvgIcons';

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
        letterSpacing: theme.spacing(0.75),
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    icon_button_icon: {
        color: mystyleprops => mystyleprops.colorSchemaA,
    },
    icon_logo: {
        color: mystyleprops => mystyleprops.colorSchemaA,
        width: theme.spacing(6),
        height: theme.spacing(6),
        margin: theme.spacing(0, 1, 0, 0),
    },

    main_menu_on: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        },
    },
    main_menu_off: {
        display: 'block',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
}));


export default function Navbar(props) {
    
    const [darkMode, setdarkMode] = useState(props.darkMode);
    const username = props.username;
    
    
    
    const theme = useTheme(); 
    const mainMenuVisible = false;
    const mystyleprops = {
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        backgroundColorSchemaNav: darkMode ? theme.palette.secondary.dark : theme.palette.primary.main,
        
    }
    const classes = useStyles(mystyleprops);
   
   
    const toggleDarKMode = () => {    
        // Write new user's dark_mode to User
        fetch('/api/toggle_dark_mode', {
            method: 'POST',
            body: JSON.stringify({
                dark_mode: !darkMode,
            }), 
        })
        .then(response => response.json())
        .then(data => {
            // Update darkMode and call parent callback
            if (data.success) {
                setdarkMode(!darkMode)
                props.parentDarkModeCallback()
            }
        })

    }

    // Called from DrawerMenu
    const sigOutCallback = () => {
        props.parentSignOutCallback();
    }

    // Called from self
    const handleSignOutButton = () => {
        fetch('/api/signout')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            props.parentSignOutCallback();
            props.history.push('/');
          } else {
            alert("Bad Request, please try again.");
          }
        });
      };


    return (
        <AppBar position="fixed" elevation={3} className={classes.appbar}>
            <Toolbar>   
                <Tooltip title="Home">          
                    <AllInclusiveIcon className={classes.icon_logo} onClick={() => {props.history.push('/')}}/>
                </Tooltip>   
                <ThemeProvider theme={logoFontTheme}>
                    <Typography variant="h5" className={classes.appbar_typography}>
                        CellarClub
                    </Typography> 
                </ThemeProvider>
                
                    <Tooltip title="Toggle light/dark mode">
                        <IconButton className={classes.main_menu_on} aria-label="toggleDarkMode" onClick={toggleDarKMode}>
                        { darkMode
                        ? <Brightness7Icon className={classes.icon_button_icon} />
                        : <Brightness4Icon className={classes.icon_button_icon} />
                        }
                        </IconButton>
                    </Tooltip>
                    <span className={classes.main_menu_on}>
                    <DrawerMenu
                        {...props}
                        darkMode={props.darkMode}
                        username={username}
                        parentSignOutCallback={sigOutCallback}
                    />
                    </span>
                
                    <Tooltip title="Home">
                        <IconButton className={classes.main_menu_off} aria-label="Home" to="/" component={Link}>
                            <HomeOutlinedIcon className={classes.icon_button_icon} />
                        </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Search">
                        <IconButton className={classes.main_menu_off} aria-label="Search" to="/search" component={Link}>
                            <SearchIcon className={classes.icon_button_icon} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Collection">
                        <IconButton className={classes.main_menu_off} aria-label="Collection" to="/collection" component={Link}>
                            <ListIcon className={classes.icon_button_icon} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Memories">
                        <IconButton className={classes.main_menu_off} aria-label="Memories" to="/memories" component={Link}>
                            <GlassCheersIcon 
                            className={classes.icon_button_icon} 
                            style={{width: theme.spacing(2.75), height: theme.spacing(2.75)}}
                            />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Reviews">
                        <IconButton className={classes.main_menu_off} aria-label="Reviews" to="/reviews" component={Link}>
                            <StarIcon className={classes.icon_button_icon} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip className={classes.main_menu_off} title="Toggle light/dark mode">
                        <IconButton aria-label="toggleDarkMode" onClick={toggleDarKMode}>
                        { darkMode
                        ? <Brightness7Icon className={classes.icon_button_icon} />
                        : <Brightness4Icon className={classes.icon_button_icon} />
                        }
                        </IconButton>
                    </Tooltip>

                    <Tooltip className={classes.main_menu_off} title="Signout">
                        <IconButton aria-label="Signout" onClick={handleSignOutButton}>
                            <ExitToAppIcon className={classes.icon_button_icon} />
                        </IconButton>
                    </Tooltip>  
            </Toolbar>
        </AppBar>
    );
};
