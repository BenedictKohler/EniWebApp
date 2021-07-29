import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { serverSoftwareStyles, StyledTableRow } from "./Styles";


const SoftwareTable = (props) => {

    const classes = serverSoftwareStyles();

    return (
        <Box mt={1}>
            <h3>Existing Software</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <TableCell align="center">Software</TableCell>
                            <TableCell align="center">Version</TableCell>
                            <TableCell align="center">Location</TableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {props.currentSoftware.map((software) => (
                            <TableRow>
                                <TableCell align="center">{software.name}</TableCell>
                                <TableCell align="center">{software.version}</TableCell>
                                <TableCell align="center">{software.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default SoftwareTable;