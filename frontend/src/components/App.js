import React, { useState }from "react";
import { Redirect, Route, Switch, } from "react-router-dom";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core";

import Bottle from "./Bottle";
import CommunityReviews from "./CommunityReviews";
import ConsumedBottle from "./ConsumedBottle";
import Collection from "./Collection";
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
    const [username, updateUsername] = useState(props.username);
    

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
        updateIsAuthenticated(status[0]);
        updateUsername(status[1]);
    }

    const signUpCallback = (status) => {
        updateIsAuthenticated(status[0]);
        updateUsername(status[1]);
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
                            <Route exact path="/" render={props => <Search {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            username={username}
                            />} />
                            <Route path='/bottle' render= {props => <Bottle {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            username={username}
                            />} />
                            <Route path='/consumed_bottle' render= {props => <ConsumedBottle {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            username={username}
                            />} />
                            <Route path='/collection' render= {props => <Collection {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            username={username}
                            />} />
                            <Route path='/memories' render= {props => <Memories {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            username={username}
                            />} />
                            <Route path='/memory' render= {props => <Memory {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            username={username}
                            />} />
                            <Route path='/reviews' render= {props => <Reviews {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            username={username}
                            />} />
                            <Route path='/review' render= {props => <Review {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            username={username}
                            />} />
                            <Route path='/search' render={props => <Search {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            username={username}
                            />} />
                            <Route path='/community_reviews' render= {props => <CommunityReviews {...props} 
                            darkMode={darkMode}
                            parentDarkModeCallback={darkModeCallback}
                            parentSignOutCallback={signOutCallback}
                            isAuthenticated={isAuthenticated}
                            username={username}
                            />} />

                            <Route path='/signin' render={props => <Redirect {...props} to="/" />} />
                            <Route path='/signup' render={props => <Redirect {...props} to="/" />} />
                            <Route path='/signout' render={props => <Redirect {...props} to="/" />} />
                        </>)
                        : 
                        (<>
                            <Route exact path='/' render={props => <Landing {...props} />} />
                            <Route path='/search' render={props => <Landing {...props} />} />
                            <Route path='/signin' render={props => <SignIn {...props} parentSigninCallback={signInCallback} />} />
                            <Route path='/signup' render={props => <SignUp {...props} parentSignupCallback={signUpCallback} />} />
                        </>)
                        }   
                    </Switch>
                </div> 
            </Paper>
        </ThemeProvider>
    );
}
