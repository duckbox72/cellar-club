import React, { useState }from "react";
import { Redirect, Route, Switch, } from "react-router-dom";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core";

import Bottle from "./Bottle";
import ConsumedBottle from "./ConsumedBottle";
import Collection from "./Collection";
import Home from "./Home";
import Landing from "./Landing";
import Memories from "./Memories";
import Memory from "./Memory";
import Reviews from "./Reviews";
import Review from "./Review";
import Search from "./Search";
import SignIn from "./Signin";
import SignUp from "./Signup";

import { brown } from "@material-ui/core/colors";


const useStyles = makeStyles({
    appStyles: {
        minWidth: '100%',
        minHeight: screen.availHeight,
        position: "absolute",
        marginTop: 0,
        borderRadius: 0,
        overflowY: "hidden",   
    }
});


export default function App(props) {  
    const classes = useStyles();


    const [isAuthenticated, updateIsAuthenticated] = useState(props.isAuthenticated);
    const [darkMode, setDarkMode] = useState(props.darkMode);
    
    console.log(`(App) props.isAuthenticated:  ${props.isAuthenticated}`)
    console.log(`(App) const isAuthenticated:  ${isAuthenticated}`)
    console.log(`(App) props.darkMode:  ${props.darkMode}`)
    console.log(`(App) const darkMode:  ${darkMode}`)

    const mytheme = createMuiTheme({ 
        palette: {
            primary:{
                light: '#fffd61',
                main: '#ffca28',
                dark: '#c79a00',
                contrastText: '#3e2723',
            },
            secondary:{
                light: '#7b5e57',
                main: '#4e342e',
                dark: '#260e04',
                contrastText: '#fff3e0',
            },
            type: darkMode ? "dark" : "light",
            
            background: {
                paper: darkMode ?  brown[900] : brown[100], 
            },
        },
            
    });

    const darkModeCallback = () => {
        setDarkMode(!darkMode);
    }

    const signInCallback = (status) => {
        updateIsAuthenticated(status);
    }

    const signUpCallback = (status) => {
        updateIsAuthenticated(status);
    }

    const signOutCallback = (status) => {
        updateIsAuthenticated(status)
    }

    return (
        <ThemeProvider theme={mytheme}>
            <Paper  className={classes.appStyles}>
                <div>
                    <Switch>
                        {isAuthenticated ? 
                        (<>
                            <Route exact path="/" render={props => <Home {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            />} />
                            <Route path='/bottle' render= {props => <Bottle {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            />} />
                            <Route path='/consumed_bottle' render= {props => <ConsumedBottle {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            />} />
                            <Route path='/collection' render= {props => <Collection {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            />} />
                            <Route path='/memories' render= {props => <Memories {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            />} />
                            <Route path='/memory' render= {props => <Memory {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            />} />
                            <Route path='/reviews' render= {props => <Reviews {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            />} />
                            <Route path='/review' render= {props => <Review {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            />} />
                            <Route path='/search' render={props => <Search {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            />} />

                            <Route path='/signin' render={props => <Redirect {...props} to="/" />} />
                            <Route path='/signup' render={props => <Redirect {...props} to="/" />} />
                            <Route path='/signout' render={props => <Redirect {...props} to="/" />} />
                        </>)
                        : 
                        (<>
                            <Route exact path='/' render={props => <Landing {...props} />} />
                            <Route path='/search' render={props => <Landing {...props} />} />
                            <Route path='/signin' render={props => <SignIn parentSigninCallback={signInCallback} {...props} />} />
                            <Route path='/signup' render={props => <SignUp parentSignupCallback={signUpCallback} {...props} />} />
                        </>)
                        }   
                    </Switch>
                </div> 
            </Paper>
        </ThemeProvider>
    );
}
