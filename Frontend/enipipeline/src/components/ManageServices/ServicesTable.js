import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { manageServicesStyles, StyledTableRow } from "./Styles";


const ServicesTable = (props) => {

    const classes = manageServicesStyles();
  
    return (
      <Box mt={1}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <TableCell align="center">Service Name</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Service Type</TableCell>
                <TableCell align="center">Select Service</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {props.services.map((service) => (
                <TableRow>
                  <TableCell align="center">{service.name}</TableCell>
                  <TableCell align="center">{service.status}</TableCell>
                  <TableCell align="center">{service.type}</TableCell>
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