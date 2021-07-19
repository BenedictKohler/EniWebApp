import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, AppBar, CssBaseline,Toolbar,Drawer, Table,TableBody,TableCell,TableContainer, Button} from '@material-ui/core';
import { TableHead,TableRow,Paper,Box,makeStyles,withStyles,List,Divider,ListItem,ListItemIcon,ListItemText,Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DatabaseService from '../services/DatabaseService';


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, environments: []
        }
    }

    // Get data about environments
    async componentDidMount() {
        try {
            let result = await DatabaseService.getAllEnvironments();
            if (result.status === 200) this.setState({isLoading: false, environments: result.data});
        } catch (err) {
            console.log(err);
        }
    }

    render() {
      return (
        <Container>
          {!this.state.isLoading && <TopNavBar />}
          {!this.state.isLoading && <CreateButton />}
          <Container>
              {this.state.isLoading && <CircularProgress />}
              {!this.state.isLoading && <EnvironmentTable environments={this.state.environments} />}
              {!this.state.isLoading && <SideDrawer/>}
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
    background:'linear-gradient(150deg, #98c1d9 80%, #e0fbfc 90%)'
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
    background:'linear-gradient(45deg, #98c1d9 280%, #e0fbfc 90%)'
   
  },
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


const TopNavBar = (props) => {

  const classes = useStyles();

  return (
    <Container>
      <Box m={10}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4">Eni Energy</Typography>
        </Toolbar>
      </AppBar>
      </Box>
    </Container>
  );
}

// <Typography variant="h6"><Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "/createEnvironment" }}>Create Environment</Link></Typography>

const CreateButton = (props) => {

  const classes = useStyles();

  return (
    <Container>
      <Box>
          <Grid container justify="flex-start">
            <Button className={classes.button} variant="contained" color="primary" align="left"><Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "/createEnvironment" }}>Create Environment</Link></Button>
          </Grid> 
        </Box>
    </Container>
  );
}

const EnvironmentTable =  (props) => {

  const classes = useStyles();

  return (
    <Box mt={1}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <TableCell align="left">Environment</TableCell>
            <TableCell align="left">Start Date</TableCell>
            <TableCell align="left">End Date</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Team</TableCell>
            <TableCell align="left">Owner</TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {props.environments.map((env) => (
            <TableRow>
            <TableCell><Link style={{ textDecoration: "none" }} to={{ pathname: "/environment", environment: env }}>{env.name}</Link></TableCell>
            <TableCell>{env.startDate == null ? "None" : env.startDate.substring(0, 10)}</TableCell>
            <TableCell>{env.endDate == null ? "None" : env.endDate.substring(0, 10)}</TableCell>
            <TableCell>{env.status}</TableCell>
            <TableCell>{env.teamName}</TableCell>
            <TableCell>{env.fullName == null ? "None" : env.fullName}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

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
        <Divider />
        <List>
          {['Dashboard', 'Random Button'].map((text, index) => (
            <ListItem button key={text}>
              
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
    
      </Drawer>
        </Box>
    </Container>
  );
}

export default HomeScreen;