import React, { useEffect, useState }from "react";
import { Redirect, Route, Switch, } from "react-router-dom";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import ContactPage from "./ContactPage"; 
import CollectionPage from "./CollectionPage";
import Home from "./Home";
import SignIn from "./Signin";
import SignUp from "./Signup";
import Landing from "./Landing";


const useStyles = makeStyles({
    appStyles: {
        dysplay: "flex"
    }
})

export default function App(props) {
    
    const classes = useStyles();
    const [darkMode, setDarkMode] = useState(false);
    
    const [isAuthenticated, updateIsAuthenticated] = useState(props.isAuthenticated);
    
    console.log(isAuthenticated) // -------------------------- TO BE REMOVED

    const mytheme = createMuiTheme({
        palette: {
            primary:{
                light: '#ffd95b',
                main: '#ffa726',
                dark: '#c77800',
                contrastText: '#3e2723',
            },
            secondary:{
                light: '#7b5e57',
                main: '#4e342e',
                dark: '#260e04',
                contrastText: '#fff3e0',
            },
            type: darkMode ? "dark" : "light",
            },
            background: {
                default: '#fff',
            }
        
    });

    function darkModeCallback() {
        setDarkMode(!darkMode);
    }

    function signInCallback(status) {
        updateIsAuthenticated(status);
    }

    function signOutCallback(status) {
        updateIsAuthenticated(status)
    }


    return (
        <ThemeProvider theme={mytheme}>
            <Paper style={{ height: "100vh", borderRadius: "0px" }}>
                <div classeName={classes.appStyles}>
                    <Switch>
                        {isAuthenticated ? 
                        (<>
                            <Route exact path="/" render={props => <Home {...props} 
                            darkMode="darkMode"
                            parentCallback={darkModeCallback}
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
                            <Route path='/signin' render={props => <SignIn parentSigninCallback={signInCallback} {...props} />} />
                            <Route path='/signup' render={props => <SignUp parentSigninCallback={signInCallback} {...props} />} />
                        </>)
                        }
                        <Route path='/contact' component={ContactPage} />
                        <Route path='/collection' component={CollectionPage} />       
                    </Switch>
                </div> 
            </Paper>
        </ThemeProvider>
    );
}
