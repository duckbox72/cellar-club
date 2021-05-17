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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventIcon from '@material-ui/icons/Event';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ListIcon from '@material-ui/icons/List';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import StarOutlinedIcon from '@material-ui/icons/StarOutline';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginLeft: -theme.spacing(0.5),
    backgroundColor: mystyleprops => mystyleprops.backgroundColorSchemaB,
  },
  list: {
    width: 200,
  },
  fullList: {
    width: 'auto',
  },
  iconButton: {
    color: mystyleprops => mystyleprops.colorSchemaA
  },
}));

export default function DrawerMenu(props) {

  const darkMode = props.darkMode;
  const username = props.username;

  const theme = useTheme(); 
  const mystyleprops = {
      colorSchemaA: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
      backgroundColorSchemaB: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
  }
  const classes = useStyles(mystyleprops);


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

        <ListItem button key="username" color="primary">
          <ListItemIcon>
            <Avatar className={classes.avatar}>{username[0]}</Avatar>
          </ListItemIcon>
          <ListItemText primary={username} />
        </ListItem>

        <Divider />
        
        <ListItem button key="home" to="/" component={Link}>
          <ListItemIcon>
            <HomeOutlinedIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>

        <ListItem button key="search" to="/search" component={Link}>
          <ListItemIcon>
            <SearchIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Search"} />
        </ListItem>

        <ListItem button key="collection" to="/collection" component={Link}>
          <ListItemIcon>
            <ListIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Collection"} />
        </ListItem>

        <ListItem button key="memories" to="/memories" component={Link}>
          <ListItemIcon>
            <EventIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Memories"} />
        </ListItem>

        <ListItem button key="reviews" to="/reviews" component={Link}>
          <ListItemIcon>
            <StarOutlinedIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Reviews"} />
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
    <div >
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
