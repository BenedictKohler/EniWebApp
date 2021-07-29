import { Box, Button, Container, Grid } from "@material-ui/core";
import { createEnvironmentStyles } from './Styles';

const CreateEnvironmentButton = (props) => {

    const classes = createEnvironmentStyles();

    return (
        <Container>
            <Box>
                <Grid container justify="flex-start">
                    <Button fullWidth className={classes.button} onClick={props.addEnvironment} variant="contained" color="primary">Create</Button>
                </Grid>
            </Box>
        </Container>
    );
}

export default CreateEnvironmentButton;