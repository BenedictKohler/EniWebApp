import { Box, Button, Grid } from "@material-ui/core";
import { environmentStyles } from "./Styles";


const ServerButtonBar = (props) => {

    const classes = environmentStyles();

    return (

        <Grid container alignItems="center">
            <Grid item xs={4}>
                <Box mx={1}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={props.getServiceStatus} fullWidth>Status</Button>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box mx={1}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={props.startServers} fullWidth>Start</Button>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box mx={1}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={props.stopServers} fullWidth>Stop</Button>
                </Box>
            </Grid>
        </Grid>

    );

}

export default ServerButtonBar;