import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, AppBar, CssBaseline, Toolbar, Drawer, Table, TableBody, TableCell, TableContainer, Button, Modal, Fade, TextField } from '@material-ui/core';
import { TableHead, TableRow, Paper, Box, makeStyles, withStyles, List, Divider, ListItem, ListItemIcon, ListItemText, Grid, Backdrop } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import DatabaseService from '../services/DatabaseService';


class Environment extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.location.environment != null) sessionStorage.setItem('environment', JSON.stringify(this.props.location.environment));
    this.state = {
      environment: JSON.parse(sessionStorage.getItem('environment')), servers: [], isLoading: true
    };
  }


  async componentDidMount() {
    try {
      let result = await DatabaseService.getServersByEnvironmnet(this.state.environment.environmentId);
      if (result.status === 200) this.setState({ isLoading: false, servers: result.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Container>
        {!this.state.isLoading && <TopNavBar environment={this.state.environment} />}
        <Container>
          {this.state.isLoading && <CircularProgress />}
          {!this.state.isLoading && <ServerTable servers={this.state.servers} />}
          {!this.state.isLoading && <SideDrawer />}
        </Container>
      </Container>
    );
  }

}

//Code for side navigation
const drawerWidth = 240;

//Styling for all the elements
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: 'linear-gradient(150deg, #98c1d9 80%, #e0fbfc 90%)'
  },

  table: {

    minWidth: 2,
    minHeight: 38,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    background: '#468faf',
  },

  drawerPaper: {
    width: drawerWidth,
    background: 'linear-gradient(45deg, #ced4da 50%, #dee2e6 90%)',
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

  button: {
    background: 'linear-gradient(45deg, #98c1d9 280%, #e0fbfc 90%)'

  },
  divider: {
    // Theme Color, or use css color in quote
    background: 'linear-gradient(45deg, #ced4da 50%, #dee2e6 90%)',
  },

  listItemText: {
    fontSize: 120,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

//Styling for the top row
const StyledTableRow = withStyles((theme) => ({
  head: {
    background: '#dee2e6',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 140,
  },

}))(TableRow);

const ServerTable = (props) => {

  const classes = useStyles();

  return (
    <Box mt={1}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <TableCell align="left">Server</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">IP Address</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.servers.map((server) => (
              <TableRow>
                <TableCell align="left"><Link style={{ textDecoration: "none" }} to={{ pathname: "/serverSoftware", server: server }}>{server.name}</Link></TableCell>
                <TableCell align="left">{server.type}</TableCell>
                <TableCell align="left">{server.ipAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const useStylesNav = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const SideDrawer = (props) => {

  const classes = useStyles();

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

          <List>
            <Divider className={classes.divider} />
            {['Dashboard', 'Random Button'].map((text, index) => (

              <ListItem button key={text} >
                <ListItemText primary={text} className={classes.listItemText} />

              </ListItem>

            ))}
            <Divider className={classes.divider} />
          </List>


        </Drawer>
      </Box>
    </Container>
  );
}

const TopNavBar = (props) => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [serverName, setName] = React.useState("");
  const [ipAddress, setIP] = React.useState("");
  const [serverType, setType] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateAndSend = () => {
    if (serverName.length == 0) return;
    if (ipAddress.length == 0) return;
    if (serverType.length == 0) return;
    DatabaseService.addServer({ name: serverName, ipAddress: ipAddress, type: serverType, environmentId: props.environment.environmentId }).then(() => {
      window.location.reload();
    });
  }

  return (
    <Container>
      <Box m={10}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4">{props.environment.name}</Typography>

            <Button onClick={handleOpen} variant="h6" color="inherit"><AddIcon /> Add Server</Button>
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

                  <Typography component="h1" variant="h4" align="center">Create Server</Typography>
                  <Container><Box m={3} /></Container>

                  <Container>
                    <TextField
                      required
                      variant="outlined"
                      label="Server Name"
                      fullWidth
                      id="outlined-basic"
                      onChange={e => setName(e.target.value)}
                    />
                  </Container>

                  <Box m={3} />
                  <Container>
                    <TextField
                      required
                      variant="outlined"
                      label="Server Type"
                      fullWidth
                      id="outlined-basic"
                      onChange={e => setType(e.target.value)}
                    />
                  </Container>

                  <Box m={3} />
                  <Container>
                    <TextField
                      required
                      variant="outlined"
                      label="IP Address"
                      fullWidth
                      id="outlined-basic"
                      onChange={e => setIP(e.target.value)}
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

            <Button onClick={() => DatabaseService.deployEnvironment()} variant="h6" color="inherit">Deploy</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
}

export default Environment;