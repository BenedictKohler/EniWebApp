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
import AddIcon from '@material-ui/icons/Add';

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
            if (result.status === 200) this.setState({isLoading: false, servers: result.data});
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Container>
                <TopNavBar environment={this.state.environment} />
                <Container>
                    {this.state.isLoading && <CircularProgress />}
                    {!this.state.isLoading && <ServerTable servers={this.state.servers} />}
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

const ServerTable =  (props) => {

    const classes = useStylesTable();
  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Server</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>IP Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.servers.map((server) => (
              <TableRow>
                <TableCell><Link style={{ textDecoration: "none" }} to={{ pathname: "/serverSoftware", server: server }}>{server.name}</Link></TableCell>
                <TableCell>{server.type}</TableCell>
                <TableCell>{server.ipAddress}</TableCell>
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
            <Typography variant="h6">{props.environment.name}</Typography>
            <Button variant="h6" color="inherit"><AddIcon /> Add Server</Button>
            <Button variant="h6" color="inherit">Deploy</Button>
          </Toolbar>
        </AppBar>
      </Container>
    );
  }

export default Environment;