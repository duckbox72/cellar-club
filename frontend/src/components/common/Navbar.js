import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    typographyStyles: {
        flex: 1,
        //color: theme.palette.common.white,
    },
    toolbarStyles: {
        //backgroundColor: theme.palette.secondary,

    },
}));

const Navbar = (props) => {
    
    
    const handleSignOutButton = () => {
        
        fetch('/api/signout')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.success) {
            console.log(data.success);
            props.parentSignOutCallback()
            props.history.push('/') 
          } else {
            alert("Bad Request, please try again.")
          }
          
        });
      };
    
    
    function toggleDarKMode() {
        props.parentCallback()
    }

    const userProfile = props.userProfile;
    const classes = useStyles();

    return (
        <AppBar position="sticky" color="default">
            <Toolbar className={classes.toolbarStyles}>
                <Typography className={classes.typographyStyles}>
                    CellarClub 
                </Typography>
                <Typography>
                    {userProfile.username}
                </Typography>
                <Tooltip title="Toggle light/dark mode">
                    <IconButton aria-label="toggleDarkMode" onClick={toggleDarKMode}>
                        <BrightnessMediumIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Sign out">
                    <IconButton aria-label="signout" onClick={handleSignOutButton}>
                        <ExitToAppIcon />
                    </IconButton>                  
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;