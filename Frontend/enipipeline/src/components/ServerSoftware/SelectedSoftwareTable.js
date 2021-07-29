import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { serverSoftwareStyles, StyledTableRow } from "./Styles";
import InstallButton from './InstallButton';


const SelectedSoftwareTable = (props) => {

    const classes = serverSoftwareStyles();
    let softwareList = [];

    for (let i = 0; i < props.selectedSoftware.length; i++) {
        softwareList.push(
            <TableRow>
                <TableCell align="center">{props.selectedSoftware[i].name}</TableCell>
                <TableCell align="center">{props.selectedSoftware[i].version}</TableCell>
                <TableCell align="center"><Button onClick={() => { props.removeSoftware(i) }}><DeleteIcon /> Remove</Button></TableCell>
            </TableRow>
        );
    }

    return (
        <Grid>
            <h3>Software To Install</h3>
            <Box mt={1}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <TableCell align="center">Software</TableCell>
                                <TableCell align="center">Version</TableCell>
                                <TableCell align="center"></TableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {softwareList}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


            <InstallButton addAllSoftware={props.addAllSoftware} />

        </Grid>
    );

}

export default SelectedSoftwareTable;