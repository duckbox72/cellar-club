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

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PublicIcon from '@material-ui/icons/Public';
import StarIcon from '@material-ui/icons/Star';
import ViewListIcon from '@material-ui/icons/ViewList';

import { GlassCheersIcon } from './SvgIcons';

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
            <HomeIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>

        <ListItem button key="collection" to="/collection" component={Link}>
          <ListItemIcon>
            <ViewListIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Collection"} />
        </ListItem>

        <ListItem button key="memories" to="/memories" component={Link}>
          <ListItemIcon>
            <GlassCheersIcon 
            className={classes.iconButton} 
            style={{width: theme.spacing(2.75), height: theme.spacing(2.75)}}
            />
          </ListItemIcon>
          <ListItemText primary={"Memories"} />
        </ListItem>

        <ListItem button key="reviews" to="/reviews" component={Link}>
          <ListItemIcon>
            <StarIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Reviews"} />
        </ListItem>

        <ListItem button key="community_reviews" to="/community_reviews" component={Link}>
          <ListItemIcon>
            <PublicIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Community"} />
        </ListItem>

        <Divider />

        <ListItem button key="toggle_dark_mode" to="/community_reviews" onClick={props.parentDarkModeCallback}>
          <ListItemIcon>
            {darkMode
              ? <Brightness7Icon className={classes.iconButton} />
              : <Brightness4Icon className={classes.iconButton} />
            }
          </ListItemIcon>
          <ListItemText primary={darkMode ? 'Light mode' : 'Dark mode'} />            
        </ListItem>

        <ListItem button key="signout" onClick={handleSignOutButton}>
          <ListItemIcon>
            <ExitToAppIcon className={classes.iconButton} />
          </ListItemIcon>
          <ListItemText primary={"Sign out"} />
        </ListItem>

        <Divider />

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
          <MenuIcon className={classes.iconButton} />
        </IconButton>
      </Tooltip>
      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        {list(anchor)}
      </Drawer>

    </div>
  );
}
