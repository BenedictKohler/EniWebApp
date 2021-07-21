import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, AppBar, CssBaseline, Toolbar, Drawer, Table, TableBody, TableCell, TableContainer, Button, Modal, Fade, TextField, Menu } from '@material-ui/core';
import { TableHead, TableRow, Paper, Box, makeStyles, withStyles, List, Divider, ListItem, ListItemIcon, ListItemText, Grid, Backdrop, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DatabaseService from '../services/DatabaseService';
import DeleteIcon from '@material-ui/icons/Delete';


class AddSoftware extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.location.server != null) sessionStorage.setItem('server', JSON.stringify(this.props.location.server));
        this.state = {
            isLoading: true, currentSoftware: [], allSoftware: [],
            server: JSON.parse(sessionStorage.getItem('server')), selectedSoftware: []
        }
        this.selectSoftware = this.selectSoftware.bind(this);
        this.removeSoftware = this.removeSoftware.bind(this);
        this.addAllSoftware = this.addAllSoftware.bind(this);
    }

    async componentDidMount() {
        try {
            let currentSoftware = await DatabaseService.getSoftwareByServerId(this.state.server.serverId);
            let allSoftware = await DatabaseService.getAllSoftware();
            if (currentSoftware.status === 200 && allSoftware.status === 200) this.setState({ isLoading: false, currentSoftware: currentSoftware.data, allSoftware: allSoftware.data });
        } catch (err) {
            console.log(err);
        }
    }

    async addAllSoftware() {
        for (let i = 0; i < this.state.selectedSoftware.length; i++) {
            this.state.selectedSoftware[i].serverId = this.state.server.serverId;
            await DatabaseService.addSoftware(this.state.selectedSoftware[i]);
        }
        window.location.reload();
    }

    selectSoftware(software) {
        this.state.selectedSoftware.push(software);
        this.setState({ selectedSoftware: this.state.selectedSoftware })
    }

    removeSoftware(index) {
        let newList = [];
        for (let i = 0; i < this.state.selectedSoftware.length; i++) {
            if (i == index) continue;
            newList.push(this.state.selectedSoftware[i]);
        }
        this.setState({ selectedSoftware: newList });
    }

    render() {
        return (
            <Container>
                {!this.state.isLoading && <TopNavBar selectSoftware={this.selectSoftware} allSoftware={this.state.allSoftware} server={this.state.server} />}
                <Container>
                    {this.state.isLoading && <CircularProgress />}
                    {!this.state.isLoading && this.state.selectedSoftware.length > 0 && <SelectedSoftwareTable addAllSoftware={this.addAllSoftware} removeSoftware={this.removeSoftware} selectedSoftware={this.state.selectedSoftware} />}
                    {!this.state.isLoading && <SoftwareTable currentSoftware={this.state.currentSoftware} />}
                    {!this.state.isLoading && <SideDrawer />}
                </Container>
            </Container>
        );
    }

}

//Code for side navigation
const drawerWidth = 240;

//Styling for all the elements
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        background: 'linear-gradient(150deg, #98c1d9 80%, #e0fbfc 90%)'
    },

    table: {

        minWidth: 2,
        minHeight: 38,
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        background: '#468faf',
    },

    drawerPaper: {
        width: drawerWidth,
        background: 'linear-gradient(45deg, #ced4da 50%, #dee2e6 90%)',
    },

    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },

    button: {
        background: 'linear-gradient(45deg, #98c1d9 280%, #e0fbfc 90%)'

    },
    divider: {
        // Theme Color, or use css color in quote
        background: 'linear-gradient(45deg, #ced4da 50%, #dee2e6 90%)',
    },

    listItemText: {
        fontSize: 120,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

//Styling for the top row
const StyledTableRow = withStyles((theme) => ({
    head: {
        background: '#dee2e6',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 140,
    },

}))(TableRow);

const SoftwareTable = (props) => {

    const classes = useStyles();

    return (
        <Box mt={1}>
            <h3>Existing Software</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <TableCell align="center">Software</TableCell>
                            <TableCell align="center">Version</TableCell>
                            <TableCell align="center">Location</TableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {props.currentSoftware.map((software) => (
                            <TableRow>
                                <TableCell align="center">{software.name}</TableCell>
                                <TableCell align="center">{software.version}</TableCell>
                                <TableCell align="center">{software.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

const useStylesNav = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const SelectedSoftwareTable = (props) => {

    const classes = useStyles();
    let softwareList = [];

    for (let i = 0; i < props.selectedSoftware.length; i++) {
        softwareList.push(
            <TableRow>
                <TableCell align="center">{props.selectedSoftware[i].name}</TableCell>
                <TableCell align="center">{props.selectedSoftware[i].version}</TableCell>
                <TableCell align="center"><Button onClick={() => {props.removeSoftware(i)}}><DeleteIcon /> Remove</Button></TableCell>
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
            

            <CreateButton addAllSoftware={props.addAllSoftware} />

        </Grid>
    );

}

const buttonStyles = makeStyles((theme) => ({
    button: {
      background:'linear-gradient(45deg, #98c1d9 280%, #e0fbfc 90%)'
    },
  }));

const CreateButton = (props) => {

    const classes = buttonStyles();
  
    return (
            <Grid container justify="flex-start">
              <Button fullWidth className={classes.button} onClick={props.addAllSoftware} variant="contained" color="primary">Install Software</Button>
            </Grid> 
    );
  }

const SideDrawer = (props) => {

    const classes = useStyles();

    return (
        <Container>
            <Box>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />

                    <List>
                        <Divider className={classes.divider} />
                        {['Dashboard', 'Random Button'].map((text, index) => (

                            <ListItem button key={text} >
                                <ListItemText primary={text} className={classes.listItemText} />

                            </ListItem>

                        ))}
                        <Divider className={classes.divider} />
                    </List>


                </Drawer>
            </Box>
        </Container>
    );
}

const TopNavBar = (props) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [softwareName, setName] = React.useState("");
    const [version, setVersion] = React.useState("");
    const [location, setLocation] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Need to get software from child up to top component
    const selectSoftware = (software) => {
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

const SoftwareTypeMenu = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    let allSoftware = [];

    for (let i = 0; i < props.allSoftware.length; i++) {
        allSoftware.push(
            <MenuItem onClick={() => { setAnchorEl(null); props.selectSoftware(props.allSoftware[i]) }}>{props.allSoftware[i].name}  {props.allSoftware[i].version}</MenuItem>
        );
    }

    return (

        <Grid>
            <Button variant="h6" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Select Software</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null) }}
            >
                {allSoftware}
            </Menu>
        </Grid>

    );
}


export default AddSoftware;