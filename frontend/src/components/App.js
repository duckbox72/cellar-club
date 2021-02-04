import React, { useEffect, useState }from "react";
import { Redirect, Route, Switch, } from "react-router-dom";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import ContactPage from "./ContactPage"; 
import CollectionPage from "./CollectionPage";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Navbar from "./Navbar";


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

    function loginCallback(status) {
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
                            <Route path='/login' render={props => <Redirect {...props} to="/:user_id" />} />
                        </>)

                        : 
                        (<>
                            <Route exact path='/' render={props => <Redirect {...props} to="/login" />} />
                            <Route path='/login' render={props => <Login  parentCallback={loginCallback} {...props} />} />
                        </>)
                        }
                        <Route path='/contact' component={ContactPage} />
                        <Route path='/collection' component={CollectionPage} />
                        
                        <Route path='/logout' render={props => <Logout {...props} />} />
                        <Route path='/register' render={props => <Register {...props} />} />          
                    </Switch>

                </div> 
            </Paper>
        </ThemeProvider>
    );
}
