import { Button, Grid } from "@material-ui/core";
import { serverSoftwareStyles } from "./Styles";


const InstallSoftwareButton = (props) => {

    const classes = serverSoftwareStyles();

    return (
        <Grid container justify="flex-start">
            <Button fullWidth className={classes.button} onClick={props.addAllSoftware} variant="contained" color="primary">Install Software</Button>
        </Grid>
    );
}

export default InstallSoftwareButton;