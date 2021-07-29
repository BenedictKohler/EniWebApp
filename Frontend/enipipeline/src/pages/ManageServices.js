import React, { useEffect, useState } from 'react';
import ShellService from '../services/ShellService';
import { CircularProgress, Container, Button, Box, Grid, TextField } from '@material-ui/core';
import { SideBar } from '../components/SideBar/SideBar';
import ServicesTable from '../components/ManageServices/ServicesTable';
import NavBar from '../components/ManageServices/NavBar';
import { manageServicesStyles } from '../components/ManageServices/Styles';

const ManageServices = (props) => {

  const classes = manageServicesStyles();

  const [services, setServices] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [serverType, setType] = useState("");

  const fetchData = async () => {
    let result = await ShellService.getRunningServices(serverType);
    setServices(result.data);
  }

  const restartAll = async () => {
    // TODO
  }

  const restartSelected = async () => {
    // TODO
  }

  useEffect(() => {

    fetchData(null).then(() => {
      setLoading(false);
    })
  }, []);

  if (isLoading) return <CircularProgress />
  return (
    <Container>
      <NavBar />
      <Box m={3} />
      <Grid container alignItems="center">
        <Grid item xs={8}>

            <TextField
              variant="outlined"
              label="Service Type"
              fullWidth
              id="outlined-basic"
              onChange={(e) => setType(e.target.value)}
            />

        </Grid>
        <Grid item xs={4}>
          <Container >
            <Button className={classes.button} variant="contained" color="primary" fullWidth onClick={fetchData}>Find Services</Button>
          </Container>
        </Grid>
      </Grid>

      <ServicesTable services={services} />

      <Box m={3} />
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Container>
            <Button className={classes.button} variant="contained" color="primary" fullWidth onClick={restartAll}>Restart All Services</Button>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container >
            <Button className={classes.button} variant="contained" color="primary" fullWidth onClick={restartSelected}>Restart Selected Services</Button>
          </Container>
        </Grid>
      </Grid>
      <Box m={3} />

      <SideBar />
    </Container>
  );

}

export default ManageServices;