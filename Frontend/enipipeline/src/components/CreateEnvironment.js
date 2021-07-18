import React from 'react';
import { Button, Container, Grid, TextField, Box, Paper, Typography, Menu, MenuItem, CircularProgress } from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';
import DatabaseService from '../services/DatabaseService';
import { Redirect } from 'react-router-dom';

class CreateEnvironment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "", org: "", proj: "", armId: "", ansId: "", teamId: "", ownerId: "", redirect: false,
            teams: [], users: [], isLoading: true, team: { teamName: "Select Team" }, owner: { fullName: "Select Owner" }
        }
        this.updateTeam = this.updateTeam.bind(this);
        this.updateOwner = this.updateOwner.bind(this);
        this.addEnvironment = this.addEnvironment.bind(this);
    }

    async componentDidMount() {
        try {
            let teamResult = await DatabaseService.getAllTeams();
            let userResult = await DatabaseService.getAllUsers();
            if (teamResult.status === 200 && userResult.status === 200) this.setState({ isLoading: false, teams: teamResult.data, users: userResult.data });
        } catch (err) {
            console.log(err);
        }
    }

    async addEnvironment() {
        if (this.state.name.length == 0) return;
        if (this.state.org.length == 0) return;
        if (this.state.proj.length == 0) return;
        if (this.state.armId.length == 0) return;
        if (this.state.ansId.length == 0) return;
        if (this.state.teamId.length == 0) return;
        if (this.state.ownerId.length == 0) return;
        DatabaseService.addEnvironment({
            name: this.state.name, organization: this.state.org, project: this.state.proj, armId: this.state.armId,
            ansibleId: this.state.ansId, teamId: this.state.teamId, ownerId: this.state.ownerId, status: "Unallocated"
        }).then(() => {
            this.setState({redirect: true});
        });
        
    }

    updateTeam(team) {
        this.setState({ team: team, teamId: team.teamId });
    }

    updateOwner(owner) {
        this.setState({ owner: owner, ownerId: owner.personId });
    }

    render() {
        if (this.state.redirect) return <Redirect to={{ pathname: "/home" }} />
        return (
            <Container>
                {this.state.isLoading && <CircularProgress />}
                {!this.state.isLoading && <Container>
                    <Box m={2} />
                    <Paper elevation={3}>

                        <Grid container>
                            <Grid item xs={4}>
                                <Container>
                                    <Box m={2} />
                                </Container>
                            </Grid>
                        </Grid>

                        <Typography component="h1" variant="h4" align="center"><StorageIcon /> Create Environment</Typography>
                        <Container><Box m={3} /></Container>

                        <Grid container>
                            <Grid xs={2}></Grid>
                            <Grid item xs={8}>
                                <Container>
                                    <TextField
                                        required
                                        variant="outlined"
                                        label="Environment Name"
                                        fullWidth
                                        id="outlined-basic"
                                        onChange={e => this.setState({ name: e.target.value })}
                                    />
                                </Container>
                            </Grid>
                        </Grid>

                        <Box m={3} />
                        <Grid container>
                            <Grid xs={2}></Grid>
                            <Grid item xs={8}>
                                <Container>
                                    <TextField
                                        required
                                        variant="outlined"
                                        label="Organization"
                                        fullWidth
                                        id="outlined-basic"
                                        onChange={e => this.setState({ org: e.target.value })}
                                    />
                                </Container>
                            </Grid>
                        </Grid>

                        <Box m={3} />
                        <Grid container>
                            <Grid xs={2}></Grid>
                            <Grid item xs={8}>
                                <Container>
                                    <TextField
                                        required
                                        variant="outlined"
                                        label="Project"
                                        fullWidth
                                        id="outlined-basic"
                                        onChange={e => this.setState({ proj: e.target.value })}
                                    />
                                </Container>
                            </Grid>
                        </Grid>

                        <Box m={3} />
                        <Grid container>
                            <Grid xs={2}></Grid>
                            <Grid item xs={4}>
                                <Container>
                                    <TextField
                                        required
                                        variant="outlined"
                                        label="ARM ID"
                                        fullWidth
                                        id="outlined-basic"
                                        onChange={e => this.setState({ armId: e.target.value })}
                                    />
                                </Container>
                            </Grid>
                            <Grid item xs={4}>
                                <Container>
                                    <TextField
                                        required
                                        variant="outlined"
                                        label="Ansible Id"
                                        fullWidth
                                        id="outlined-basic"
                                        onChange={e => this.setState({ ansId: e.target.value })}
                                    />
                                </Container>
                            </Grid>
                        </Grid>

                        <Box m={3} />
                        <Grid container>
                            <Grid xs={2}></Grid>
                            <Grid item xs={4}>
                                {<TeamMenu teamName={this.state.team.teamName} teams={this.state.teams} updateTeam={this.updateTeam} />}
                            </Grid>
                            <Grid item xs={4}>
                                {<OwnerMenu ownerName={this.state.owner.fullName} users={this.state.users} updateOwner={this.updateOwner} />}
                            </Grid>
                        </Grid>

                        <Box m={3} />
                        <Grid container>
                            <Grid xs={4}></Grid>
                            <Grid item xs={4}>
                                <Container>
                                    <Button onClick={this.addEnvironment} fullWidth variant="contained" color="primary">Create</Button>
                                </Container>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={4}>
                                <Container>
                                    <Box m={2} />
                                </Container>
                            </Grid>
                        </Grid>

                    </Paper>
                </Container>}
            </Container>
        );
    }
}

const TeamMenu = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    let teams = [];

    for (let i = 0; i < props.teams.length; i++) {
        teams.push(
            <MenuItem onClick={() => { setAnchorEl(null); props.updateTeam(props.teams[i]) }}>{props.teams[i].teamName}</MenuItem>
        );
    }

    return (
        <Container>
            <Button fullWidth variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{props.teamName}</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null) }}
            >
                {teams}
            </Menu>
        </Container>
    );
}

const OwnerMenu = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    let users = [];

    for (let i = 0; i < props.users.length; i++) {
        users.push(
            <MenuItem onClick={() => { setAnchorEl(null); props.updateOwner(props.users[i]) }}>{props.users[i].fullName}</MenuItem>
        );
    }

    return (
        <Container>
            <Button fullWidth variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{props.ownerName}</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null) }}
            >
                {users}
            </Menu>
        </Container>
    );
}


export default CreateEnvironment;