// Generic SideBar used on all of the pages

import React from 'react';
import { Box, Drawer, Container, Divider, List, ListItem, ListItemText,Modal,Backdrop,Fade,Typography,TextField,Grid,Button, } from '@material-ui/core';
import { sideBarStyles } from './Styles.js';
import { Link } from 'react-router-dom';
import DatabaseService from '../../services/DatabaseService';

const SideBar = (props) => {

  const classes = sideBarStyles();

  const [serverTypeName, setTypeName] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateAndSend = () => {
    if (serverTypeName.length == 0) return;
    console.log(serverTypeName);
    DatabaseService.addServerType({ serverType: serverTypeName }).then(() => {
      window.location.reload();
    });
  }


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
            <Link style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem button key={'Create Server Type'} button onClick={ handleOpen }>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Container className={classes.paper}>

                      <Typography component="h1" variant="h4" align="center">Create Server Type</Typography>
                      <Container><Box m={3} /></Container>

                      <Container>
                        <TextField
                          required
                          variant="outlined"
                          label="Server Type Name"
                          fullWidth
                          id="outlined-basic"
                          onChange={e => setTypeName(e.target.value)}
                        />
                      </Container>

                      <Box m={3} />
                      <Grid container>
                        <Grid xs={4}></Grid>
                        <Grid item xs={4}>
                          <Container>
                            <Button fullWidth color='primary' variant='contained' onClick={validateAndSend}>Submit</Button>
                          </Container>
                        </Grid>
                      </Grid>

                    </Container>
                  </Fade>
                </Modal>
                <ListItemText primary="Create Server Type"/>
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