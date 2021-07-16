import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatabaseService from '../services/DatabaseService';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
            <Container>
                {this.state.isLoading && <CircularProgress />}
                {!this.state.isLoading && <EnvironmentTable environments={this.state.environments} />}
            </Container>
          </Container>
        );
    }

}

const useStylesTable = makeStyles({
    table: {
      minWidth: 650,
    },
});

const EnvironmentTable =  (props) => {

    const classes = useStylesTable();
  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Environment</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.environments.map((env) => (
              <TableRow>
                <TableCell><Link style={{ textDecoration: "none" }} to={{ pathname: "/environment", environment: env }}>{env.name}</Link></TableCell>
                <TableCell>{env.startDate}</TableCell>
                <TableCell>{env.endDate}</TableCell>
                <TableCell>{env.status}</TableCell>
                <TableCell>{env.teamName}</TableCell>
                <TableCell>{env.fullName == null ? "None" : env.fullName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

const TopNavBar = (props) => {

    //const classes = useStylesNav();
  
    return (
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Eni Energy</Typography>
            <Button variant="h6" color="inherit">Create Environment</Button>
          </Toolbar>
        </AppBar>
      </Container>
    );
  }


export default HomeScreen;