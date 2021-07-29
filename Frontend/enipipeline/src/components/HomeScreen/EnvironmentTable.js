import { Box, TableContainer, Table, TableHead, TableRow, Paper, TableCell, TableBody } from "@material-ui/core";
import { Link } from "react-router-dom";
import { homeScreenStyles, StyledTableRow } from "./Styles";

const EnvironmentTable = (props) => {

    const classes = homeScreenStyles();
  
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

  export default EnvironmentTable;