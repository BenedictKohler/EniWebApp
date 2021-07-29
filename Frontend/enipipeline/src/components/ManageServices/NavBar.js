import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core";
import { manageServicesStyles } from "./Styles";


const NavBar = (props) => {

    const classes = manageServicesStyles();
  
    return (
      <Container>
        <Box m={10}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h4">Running Services</Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    );
  }

  export default NavBar;