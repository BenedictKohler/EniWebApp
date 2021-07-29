import { AppBar, Backdrop, Box, Button, Container, Fade, Grid, Modal, TextField, Toolbar, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useState } from "react";
import DatabaseService from "../../services/DatabaseService";
import { serverSoftwareStyles } from "./Styles";
import SoftwareTypeMenu from "./SoftwareTypeMenu";



const NavBar = (props) => {

    const classes = serverSoftwareStyles();

    const [open, setOpen] = useState(false);
    const [softwareName, setName] = useState("");
    const [version, setVersion] = useState("");
    const [location, setLocation] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Need to get software from child up to top component
    function selectSoftware(software) {
        props.selectSoftware(software);
    }

    const validateAndSend = () => {
        if (softwareName.length == 0) return;
        if (version.length == 0) return;
        if (location.length == 0) return;
        DatabaseService.addSoftware({ name: softwareName, version: version, location: location, serverId: null }).then(() => {
            window.location.reload();
        });
    }

    return (
        <Container>
            <Box m={10}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h4">{props.server.name}</Typography>

                        <Button onClick={handleOpen} variant="h6" color="inherit"><AddIcon /> Add new software</Button>
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

                                    <Typography component="h1" variant="h4" align="center">Create Software</Typography>
                                    <Container><Box m={3} /></Container>

                                    <Container>
                                        <TextField
                                            required
                                            variant="outlined"
                                            label="Software Name"
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
                                            label="Version"
                                            fullWidth
                                            id="outlined-basic"
                                            onChange={e => setVersion(e.target.value)}
                                        />
                                    </Container>

                                    <Box m={3} />
                                    <Container>
                                        <TextField
                                            required
                                            variant="outlined"
                                            label="Location"
                                            fullWidth
                                            id="outlined-basic"
                                            onChange={e => setLocation(e.target.value)}
                                        />
                                    </Container>

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

                        <SoftwareTypeMenu selectSoftware={selectSoftware} allSoftware={props.allSoftware} />

                    </Toolbar>
                </AppBar>
            </Box>
        </Container>
    );
}

export default NavBar;