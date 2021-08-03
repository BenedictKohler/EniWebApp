import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Link } from "react-router-dom";
import { environmentStyles, StyledTableRow } from "./Styles";


const ServerTable = (props) => {

    const classes = environmentStyles();
  
    return (
      <Box mt={1}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <TableCell align="left">Server</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">IP Address</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="center">Select Server</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {props.servers.map((server) => (
                <TableRow style={{height: 20}}>
                  <TableCell align="left"><Link style={{ textDecoration: "none" }} to={{ pathname: "/serverSoftware", server: server }}>{server.name}</Link></TableCell>
                  <TableCell align="left">{server.serverType}</TableCell>
                  <TableCell align="left">{server.ipAddress}</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="center">
                    <Checkbox
                      onChange={() => {
                        server.selected == null ? server.selected = true : server.selected = !server.selected
                      }}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  export default ServerTable;
