import React, { useEffect, useState }from "react";
import { Redirect, Route, Switch, } from "react-router-dom";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import ContactPage from "./ContactPage"; 
import CollectionPage from "./CollectionPage";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import SignIn from "./Signin";
import SignUp from "./Signup";


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
            light: '#ffc947',
            main: '#ff9800',
            dark: '#c66900',
            contrastText: '#3e2723',
        },
        secondary:{
            light: '#7c5e57',
            main: '#4f342e',
            dark: '#260e04',
            contrastText: '#ffd180',
        },
        type: darkMode ? "dark" : "light",
        },
    });

    function handleCallback() {
        setDarkMode(!darkMode);
    }

    function signInCallback(status) {
        updateIsAuthenticated(status);
    }


    return (
        <ThemeProvider theme={mytheme}>
            <Paper style={{ height: "100vh", borderRadius: "0px" }}>
                <div classeName={classes.appStyles}>
                    {isAuthenticated ? 
                    (
                    <Navbar 
                        darkMode="darkMode" 
                        parentCallback = {handleCallback}
                    />
                    ) : (
                        <></>
                    )} 
                    <Switch>
                        {isAuthenticated ? 
                        (<>
                            <Route exact path="/" render={props => <Dashboard {...props} />} />
                            <Route path='/signin' render={props => <Redirect {...props} to="/" />} />
                            <Route path='/signup' render={props => <Redirect {...props} to="/" />} />
                        </>)
                        : 
                        (<>
                            <Route exact path='/' render={props => <Redirect {...props} to="/signin" />} />
                            <Route path='/signin' render={props => <SignIn parentCallback={signInCallback} {...props} />} />
                            <Route path='/signup' render={props => <SignUp parentCallback={signInCallback} {...props} />} />
                        </>)
                        }
                        <Route path='/contact' component={ContactPage} />
                        <Route path='/collection' component={CollectionPage} />
                        
                        <Route path='/signout' render={props => <SignOut {...props} />} />
                                
                    </Switch>

                </div> 
            </Paper>
        </ThemeProvider>
    );
}
