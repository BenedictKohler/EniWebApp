import React from 'react';
import { Button, Container, Grid, List, ListItem, TextField, ListItemText, Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class CreateEnvironment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            environment: { name: "", org: "", proj: "", armId: "", ansId: "", team: "", owner: "" },
            environment: { nameErr: "", orgErr: "", projErr: "", armIdErr: "", ansIdErr: "", teamErr: "", ownerErr: "" },
            servers: [{ name: 'server1', type: 'app', ip: '127.0.0.8.22', software: ['mysql', 'python', 'java'] }, { name: 'server2', type: 'databse', ip: '129.3.0.6.22', software: ['pip'] }]
        }
    }

    render() {
        return (
            <Container className={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Container className={{ textAlign: 'center' }}>
                            <h2>Environment Details</h2>
                            <form noValidate autoComplete="off">
                                <TextField id="outlined-basic" onChange={e => this.setState({ name: e.target.value })} label="Environment Name" /><p style={{ color: 'red' }}></p>
                                <TextField id="outlined-basic" onChange={e => this.setState({ org: e.target.value })} label="Organization" /><p style={{ color: 'red' }}></p>
                                <TextField id="outlined-basic" onChange={e => this.setState({ proj: e.target.value })} label="Project" /><p style={{ color: 'red' }}></p>
                                <TextField id="outlined-basic" onChange={e => this.setState({ armId: e.target.value })} label="ARM Pipeline Id" /><p style={{ color: 'red' }}></p>
                                <TextField id="outlined-basic" onChange={e => this.setState({ ansId: e.target.value })} label="Ansible Pipeline Id" /><p style={{ color: 'red' }}></p>
                                <TextField id="outlined-basic" onChange={e => this.setState({ team: e.target.value })} label="Team Name" /><p style={{ color: 'red' }}></p>
                                <TextField id="outlined-basic" onChange={e => this.setState({ owner: e.target.value })} label="Owner" /><p style={{ color: 'red' }}></p>
                            </form>
                        </Container>
                    </Grid>
                    <Grid item xs={6}>
                        <Container className={{ textAlign: 'center' }}>
                            <h2>Servers</h2>
                            <List>
                                {<ServerList servers={this.state.servers} />}
                            </List>
                        </Container>
                    </Grid>
                </Grid>
                <Button variant="outlined" color="primary">Submit</Button>
            </Container>
        );
    }

}

const ServerList = (props) => {
    let servers = [];

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const buildMenu = (items) => {
        let mItems = [];
        for (var item of items) mItems.push(<MenuItem>{item}</MenuItem>);
        return mItems;
    }

    for (let i = 0; i < props.servers.length; i++) {
        servers.push(
            <ListItem button>
                <ListItemText primary={props.servers[i].name} />
                <ListItemText primary={props.servers[i].type} />
                <ListItemText primary={props.servers[i].ip} />
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Software</Button>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    {buildMenu(props.servers[i].software)}
                </Menu>
                <ListItemIcon><Button><DeleteIcon /></Button></ListItemIcon>
            </ListItem>
        );
    }

    return servers;
}

export default CreateEnvironment;