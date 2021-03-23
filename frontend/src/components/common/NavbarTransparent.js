import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default function NavbarTransparent(props) {

    return (
        <AppBar position="static" color="transparent" elevation={2} style={{height: 50}}>
          <Toolbar>
          </Toolbar>
        </AppBar>
    );
};