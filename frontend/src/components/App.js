import React, { useState }from "react";
import { Route, Switch } from "react-router-dom";
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


export default function App() {
        const classes = useStyles();
        const [darkMode, setDarkMode] = useState(false);

        const mytheme = createMuiTheme({
            palette: {
                type: darkMode ? "dark" : "light",
            }
        });

        function handleCallback() {
            setDarkMode(!darkMode);
        }
        
        return (
            <ThemeProvider theme={mytheme}>
                <Paper style={{ height: "100vh", borderRadius: "0px" }}>
                    <div classeName={classes.appStyles}>
                        <Navbar 
                            darkMode="darkMode" 
                            parentCallback = {handleCallback}
                        />
                        
                        <Switch>
                            <Route exact path='/' render={props => <Dashboard {...props} />} />
                            <Route path='/contact' component={ContactPage} />
                            <Route path='/collection' component={CollectionPage} />
                            <Route path='/login' render={props => <Login {...props} />} />
                            <Route path='/logout' render={props => <Logout {...props} />} />
                            <Route path='/register' render={props => <Register {...props} />} />          
                        </Switch>
                        
                    </div> 
                </Paper>
            </ThemeProvider>
        );
}
