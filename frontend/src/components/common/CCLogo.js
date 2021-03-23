import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';


const logoFontTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Quicksand', 'sans-serif',
        ].join(','),
    },
});


export default function CClogo(props) {
    const darkMode = props.darkMode;

    const useStyles = makeStyles((theme) => ({
        logo_icon: {
            height: theme.spacing(15),
            width: theme.spacing(15),
            marginTop: -theme.spacing(2),
            color: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        logo_typo: {
            marginTop: -theme.spacing(4),
            color: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        }
    }));


    const classes = useStyles();

    return (

        <Grid container direction="column" alignItems="center">
            <Grid item> 
                <AllInclusiveIcon className={classes.logo_icon} />
            </Grid>
            <Grid item>
                <ThemeProvider theme={logoFontTheme}>
                    <Typography className={classes.logo_typo}>
                        C e l l a r C l u b
                    </Typography>
                </ThemeProvider>
            </Grid>
            <Grid item xs={10} sm={6} md={6}>
                <Typography variant="body2" style={{textAlign: 'center'}}>
                    Search CellarClub and have acess to more than 100.000 products. Find your favorite bottle of wine or spirit, add to your collection, write a review and more.
                </Typography>
            </Grid>


        </Grid>
                
    );
}
