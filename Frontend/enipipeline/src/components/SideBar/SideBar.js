// Generic SideBar used on all of the pages

import React from 'react';
import { Box, Drawer, Container, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { sideBarStyles } from './Styles.js'
import { Link } from 'react-router-dom';

const SideBar = (props) => {

  const classes = sideBarStyles();

  return (
    <Container>
      <Box>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: "/home" }}>
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: "/manageServices" }}>
              <ListItem button>
                <ListItemText primary="Services" />
              </ListItem>
            </Link>
          </List>
          <Divider />

        </Drawer>
      </Box>
    </Container>
  );
}

export { SideBar };