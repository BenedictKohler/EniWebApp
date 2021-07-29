import { Box, Button, Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { homeScreenStyles } from "./Styles";


const CreateEnvironmentButton = (props) => {

    const classes = homeScreenStyles();
  
    return (
      <Container>
        <Box>
          <Grid container justify="flex-start">
            <Button className={classes.button} variant="contained" color="primary" align="left"><Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "/createEnvironment" }}>Create Environment</Link></Button>
          </Grid>
        </Box>
      </Container>
    );
  }

  export default CreateEnvironmentButton;