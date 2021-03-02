import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';



export default function TemporaryDrawer(props, theme) {

  const darkMode = props.darkMode;
  const userProfile = props.userProfile;

  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    iconButton: {
      //color: darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
    },
  });



  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  console.log(state)

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
        
        <ListItem button key="signout">
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
          onClick={toggleDrawer('top', true)}
        >
          <MoreVertIcon className={classes.iconButton} />
        </IconButton>
      </Tooltip>
      <Drawer anchor={'top'} open={state['top']} onClose={toggleDrawer('top', false)}>
        {list('top')}
      </Drawer>

    </div>
  );
}
