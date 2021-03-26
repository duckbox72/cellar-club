import React from 'react';
import { makeStyles } from "@material-ui/core/styles";


export default function NavbarTransparent(props) {
  const useStyles = makeStyles((theme) => ({
    navbar_filler: {
        height: theme.spacing(6),
        [theme.breakpoints.down("sm")]: {
            height: theme.spacing(5)},
    },
}));

  const classes = useStyles();

    return (
        <div className={classes.navbar_filler} />
    );
};