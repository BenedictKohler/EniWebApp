import { Box, Button, Grid } from "@material-ui/core";
import { environmentStyles } from "./Styles";


const ServiceButtonBar = (props) => {

    const classes = environmentStyles();

    return (
        <Grid container alignItems="center">
            <Grid item xs={3}>
                <Box mx={1}>
                    <Button m={2} className={classes.button} variant="contained" color="primary" onClick={props.installService} fullWidth>Install</Button>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box mx={1}>
                    <Button m={2} className={classes.button} variant="contained" color="primary" onClick={props.uninstallService} fullWidth>Uninstall</Button>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box mx={1}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={props.startServices} fullWidth>Start</Button>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box mx={1}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={props.stopServices} fullWidth>Stop</Button>
                </Box>
            </Grid>
        </Grid>
    );

}

export default ServiceButtonBar;