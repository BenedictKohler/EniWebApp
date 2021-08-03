import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { environmentStyles, StyledTableRow } from "./Styles";


const ServicesTable = (props) => {

    const classes = environmentStyles();
  
    return (
      <Box mt={1}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <TableCell align="left">Server</TableCell>
                <TableCell align="left">Service Name</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="center">Select Service</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {props.services.map((service) => (
                <TableRow>
                  <TableCell align="left">{service.name}</TableCell>
                  <TableCell align="left">{service.variable}</TableCell>
                  <TableCell align="left">{service.status}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      onChange={() => {
                        service.selected == null ? service.selected = true : service.selected = !service.selected
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

  export default ServicesTable;