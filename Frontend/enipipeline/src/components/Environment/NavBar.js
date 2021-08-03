import { AppBar, Backdrop, Box, Button, Container, Fade, Grid, Modal, TextField, Toolbar, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useState } from "react";
import DatabaseService from "../../services/DatabaseService";
import PipelineService from '../../services/PipelineService';
import FilterServersMenu from "./FilterServersMenu";
import ServerTypeMenu from "./ServerTypeMenu";
import { environmentStyles } from "./Styles";


const NavBar = (props) => {

    const classes = environmentStyles();
  
    const [open, setOpen] = useState(false);
    const [serverName, setName] = useState("");
    const [ipAddress, setIP] = useState("");
    const [serverType, setType] = useState({ type: "Select Server Type", id: -1 });
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const updateServerType = (sType) => {
      setType({ type: sType.serverType, id: sType.serverTypeId })
    }
  
    const validateAndSend = () => {
      if (serverName.length == 0) return;
      if (ipAddress.length == 0) return;
      if (serverType.id == -1) return;
      DatabaseService.addServer({ name: serverName, ipAddress: ipAddress, serverTypeId: serverType.id, environmentId: props.environment.environmentId }).then(() => {
        window.location.reload();
      });
    }
  
    return (
      <Container>
        <Box m={10}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h4">{props.environment.name}</Typography>
  
              <Button onClick={handleOpen} variant="h6" color="inherit"><AddIcon /> Add Server</Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Container className={classes.paper}>
  
                    <Typography component="h1" variant="h4" align="center">Create Server</Typography>
                    <Container><Box m={3} /></Container>
  
                    <Container>
                      <TextField
                        required
                        variant="outlined"
                        label="Server Name"
                        fullWidth
                        id="outlined-basic"
                        onChange={e => setName(e.target.value)}
                      />
                    </Container>
  
                    <Box m={3} />
                    <Container>
                      <TextField
                        required
                        variant="outlined"
                        label="IP Address"
                        fullWidth
                        id="outlined-basic"
                        onChange={e => setIP(e.target.value)}
                      />
                    </Container>
  
                    <Box m={3} />
                    {<ServerTypeMenu serverTypes={props.serverTypes} serverType={serverType} updateServerType={updateServerType} />}
  
                    <Box m={3} />
                    <Grid container>
                      <Grid xs={4}></Grid>
                      <Grid item xs={4}>
                        <Container>
                          <Button fullWidth color='primary' variant='contained' onClick={validateAndSend}>Submit</Button>
                        </Container>
                      </Grid>
                    </Grid>
  
                  </Container>
                </Fade>
              </Modal>

              {<FilterServersMenu availableTypes={props.availableTypes} selectType={props.selectType} />}
  
              <Button onClick={() => PipelineService.deployEnvironment()} variant="h6" color="inherit">Deploy</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    );
  }

  export default NavBar;