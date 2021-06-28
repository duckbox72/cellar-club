import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navbar_filler: {
      height: theme.spacing(6),
      [theme.breakpoints.down("sm")]: {
          height: theme.spacing(5)},
  },
}));

export default function NavbarTransparent(props) {
  const classes = useStyles();

    return (
        <div className={classes.navbar_filler} />
    );
};