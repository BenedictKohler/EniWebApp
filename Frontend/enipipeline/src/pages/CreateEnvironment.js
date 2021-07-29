import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Box, Paper, Typography, CircularProgress } from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';
import DatabaseService from '../services/DatabaseService';
import { Redirect } from 'react-router-dom';
import CreateEnvironmentButton from '../components/CreateEnvironment/CreateEnvironmentButton';
import TeamMenu from '../components/CreateEnvironment/TeamMenu';
import OwnerMenu from '../components/CreateEnvironment/OwnerMenu';
import { SideBar } from '../components/SideBar/SideBar';
import NavBar from '../components/CreateEnvironment/NavBar';

const CreateEnvironment = () => {

    const [name, setName] = useState("");
    const [org, setOrg] = useState("");
    const [proj, setProj] = useState("");
    const [armId, setArmId] = useState("");
    const [ansId, setAnsId] = useState("");
    const [teamId, setTeamId] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [team, setTeam] = useState({ teamName: "Select Team" });
    const [owner, setOwner] = useState({ fullName: "Select Owner" });

    const fetchData = async () => {
        try {
            let teamResult = await DatabaseService.getAllTeams();
            let userResult = await DatabaseService.getAllUsers();
            if (teamResult.status === 200 && userResult.status === 200) {
                setTeams(teamResult.data);
                setUsers(userResult.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData().then(() => {
            setLoading(false);
        })
    }, []);

    const addEnvironment = async () => {
        if (name.length == 0) return;
        if (org.length == 0) return;
        if (proj.length == 0) return;
        if (armId.length == 0) return;
        if (ansId.length == 0) return;
        if (teamId.length == 0) return;
        if (ownerId.length == 0) return;
        DatabaseService.addEnvironment({
            name: name, organization: org, project: proj, armId: armId,
            ansibleId: ansId, teamId: teamId, ownerId: ownerId, status: "Unallocated"
        }).then(() => {
            setRedirect(true);
        });

    }

    const updateTeam = (team) => {
        setTeam(team);
        setTeamId(team.teamId);
    }

    const updateOwner = (owner) => {
        setOwner(owner);
        setOwnerId(owner.personId);
    }

    if (redirect) return <Redirect to={{ pathname: "/home" }} />
    return (
        <Container>
            <NavBar />
            {isLoading && <CircularProgress />}
            {!isLoading && <Container>
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
                                    onChange={e => setName(e.target.value)}
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
                                    onChange={e => setOrg(e.target.value)}
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
                                    onChange={e => setProj(e.target.value)}
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
                                    onChange={e => setArmId(e.target.value)}
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
                                    onChange={e => setAnsId(e.target.value)}
                                />
                            </Container>
                        </Grid>
                    </Grid>

                    <Box m={3} />
                    <Grid container>
                        <Grid xs={2}></Grid>
                        <Grid item xs={4}>
                            {<TeamMenu teamName={team.teamName} teams={teams} updateTeam={updateTeam} />}
                        </Grid>
                        <Grid item xs={4}>
                            {<OwnerMenu ownerName={owner.fullName} users={users} updateOwner={updateOwner} />}
                        </Grid>
                    </Grid>

                    <Box m={3} />
                    <Grid container>
                        <Grid xs={4}></Grid>
                        <Grid item xs={4}>
                            <Container>
                                <CreateEnvironmentButton addEnvironment={addEnvironment} />
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
            <SideBar />
        </Container>
    );
}


export default CreateEnvironment;
