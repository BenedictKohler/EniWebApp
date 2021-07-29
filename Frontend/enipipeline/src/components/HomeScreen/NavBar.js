import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core";
import { homeScreenStyles } from "./Styles";


const NavBar = (props) => {

    const classes = homeScreenStyles();
  
    return (
      <Container>
        <Box m={10}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h4">Eni Energy</Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    );
  }

  export default NavBar;