import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';


export default function DrawerMenu(props) {

  const darkMode = props.darkMode;
  const userProfile = props.userProfile;

  const theme = useTheme();

  const useStyles = makeStyles({
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    iconButton: {
      color: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
    },
  });


  const handleSignOutButton = () => {
    fetch('/api/signout')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log(data.success);
        props.parentSignOutCallback();
        props.history.push('/');
      } else {
        alert("Bad Request, please try again.");
      }
    });
  };

  
  const classes = useStyles();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [anchor, setAnchor] =  useState("");


  useEffect(() => {
    window.innerWidth < 600 ? setAnchor("right") : setAnchor("right");
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

        <ListItem button key="username">
          <ListItemIcon>
            <Avatar className={classes.avatar}>{userProfile.username[0]}</Avatar>
          </ListItemIcon>
          <ListItemText primary={userProfile.username} />
        </ListItem>

        <Divider />
        
        <ListItem button key="home" to="/" component={Link}>
          <ListItemIcon>
            <HomeOutlinedIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>

        <ListItem button key="cellar" to="/" component={Link}>
          <ListItemIcon>
            <ViewListOutlinedIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"My Cellar"} />
        </ListItem>

        <ListItem button key="search" to="/search" component={Link}>
          <ListItemIcon>
            <SearchIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Search"} />
        </ListItem>

        <ListItem button key="signout" onClick={handleSignOutButton}>
          <ListItemIcon>
            <ExitToAppIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Sign out"} />
        </ListItem>

      </List>
    </div>
  );

  
  return (
    <div>
      <Tooltip title="Menu">
        <IconButton
          aria-label="menu"
          onClick={toggleDrawer(anchor, true)}
        >
          <MoreVertIcon className={classes.iconButton} />
        </IconButton>
      </Tooltip>
      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        {list(anchor)}
      </Drawer>

    </div>
  );
}
