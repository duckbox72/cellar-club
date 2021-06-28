import React from 'react';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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


const useStyles = makeStyles((theme) => ({
    logo_icon: {
        height: theme.spacing(24),
        width: theme.spacing(24),
        color: theme.palette.common.white,
        [theme.breakpoints.down("sm")]: {
            color: theme.palette.secondary.dark,
        },
    },
    logo_typo: {
        marginTop: -theme.spacing(7),
        color: theme.palette.common.white,
        [theme.breakpoints.down("sm")]: {
            color: theme.palette.secondary.dark,
        },
    }
}));


export default function CClogo(props) {
    const darkMode = props.darkMode;

    const theme = useTheme(); 
    const mystyleprops = {
        colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
    }
    const classes = useStyles(mystyleprops);

    return (

        <Grid container direction="column" alignItems="center">
            <Grid item> 
                <AllInclusiveIcon className={classes.logo_icon} />
            </Grid>
            <Grid item>
                <ThemeProvider theme={logoFontTheme}>
                    <Typography variant="h5" className={classes.logo_typo}>
                        C e l l a r C l u b
                    </Typography>
                </ThemeProvider>
            </Grid>
        </Grid>            
    );
}
