import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Box, Grid } from '@material-ui/core';
import DatabaseService from '../services/DatabaseService';
import { SideBar } from '../components/SideBar/SideBar';
import NavBar from '../components/Environment/NavBar';
import ServerTable from '../components/Environment/ServerTable';
import ServicesTable from '../components/Environment/ServicesTable';
import ServerButtonBar from '../components/Environment/ServerButtonBar';
import ServiceButtonBar from '../components/Environment/ServiceButtonBar';
import ShellService from '../services/ShellService';
import VariablesTable from '../components/Environment/VariablesTable';


const Environment = (props) => {

  if (props.location.environment != null) sessionStorage.setItem('environment', JSON.stringify(props.location.environment));

  const [environment, setEnvironment] = useState(JSON.parse(sessionStorage.getItem('environment')));
  const [servers, setServers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [serverTypes, setTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [envVariables, setVariables] = useState([]);
  const [serverObjects, setObjects] = useState({});

  var selectedServices = [];

  useEffect(() => {
    fetchData().then(() => {
      setLoading(false);
    })
  }, []);

  const fetchData = async () => {
    try {
      let result1 = await DatabaseService.getServersByEnvironmnet(environment.environmentId);
      let result2 = await DatabaseService.getAllServerTypes();
      let result3 = await DatabaseService.getEnvironmentVariablesById(environment.environmentId);
      if (result1.status === 200 && result2.status === 200 && result3.status === 200) {
        let serverObjList = buildServerList(result1.data);
        setServers(result1.data);
        setObjects(serverObjList);
        setTypes(result2.data);
        setVariables(addUniqueId(result3.data));
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Adds a unique id to all objects in a list as well as environment name
  // This is needed for the DataGrid component
  const addUniqueId = (list) => {
    let newList = [];
    let ind = 0;
    for (let val of list) {
      val.name = environment.name;
      val.id = ind++;
      newList.push(val);
    }
    return newList;
  }

  // Converts a list of all servers into {serverType : List<Servers>}
  // This is used to render servers by their type
  const buildServerList = (sList) => {
    let serverObject = {};
    for (let server of sList) {
      if (serverObject[server.serverType] == null) serverObject[server.serverType] = [];
      serverObject[server.serverType].push(server);
    }
    return serverObject;
  }

  // Renders a specific type of server
  // Used in FilterServers
  function selectType(type) {
    setServers(serverObjects[type]);
  }

  // Gets a list of all server types for this environment
  // So the user can choose to display only a certain type
  function getAvailableTypes() {
    let list = [];
    for (let obj in serverObjects) list.push(obj);
    return list;
  }

  /////////////////////////////////////////////////////SERVER MODIFICATION///////////////////////////////////////////////////////

  // Used to tell whether a server is running or not
  async function getServerStatus() {
    let selectedServers = [];
    for (let server of servers) {
      if (server.selected) selectedServers.push(server.name);
    }
    let result = await ShellService.getServerStatus({ serverList: selectedServers });
    // Need to update server statuses based on result here
  }

  async function startServers() {
    // TODO
  }

  async function stopServers() {
    // TODO
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////SERVICE MODIFICATION///////////////////////////////////////////////////////////

  // Used to tell whether a service on a particular server is running or not
  async function getServiceStatus() {
    if (selectedServices.selected == null || servers.length == 0) return;
    let chosenServices = [];
    let chosenServers = [];
    for (let server of servers) {
      if (server.selected) chosenServers.push(server.name);
    }
    for (let index of selectedServices.selected) chosenServices.push(envVariables[index].value);
    let result = await ShellService.getServiceStatus({ serverList: chosenServers, serviceList: chosenServices });
    // Need to update service statuses based on result here
  }

  async function startServices() {
    // TODO
  }

  async function stopServices() {
    // TODO
  }

  async function installService() {
    // TODO
  }

  async function uninstallService() {
    // TODO
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Container>
      {!isLoading && <NavBar availableTypes={getAvailableTypes()} selectType={selectType} serverTypes={serverTypes} environment={environment} />}
      <Container>
        {isLoading && <CircularProgress />}

        {!isLoading && services.length == 0 &&
          <Container>
            <ServerTable servers={servers} />
            <Box my={2}>
              <ServerButtonBar startServers={startServers} stopServers={stopServers} getServiceStatus={getServiceStatus} />
            </Box>
          </Container>}

        {!isLoading && services.length > 0 &&
          <Grid container>
            <Grid xs={6}>
              <Container>
                {!isLoading && <ServerTable servers={servers} />}
                <Box m={3}>
                  {!isLoading && <ServerButtonBar startServers={startServers} stopServers={stopServers} getServiceStatus={getServiceStatus} />}
                </Box>
              </Container>
            </Grid>
            <Grid xs={6}>
              <Container>
                {!isLoading && <ServicesTable services={services} />}
                <Box m={3} />
                {!isLoading && <ServiceButtonBar startServices={startServices} stopServices={stopServices} installService={installService} uninstallService={uninstallService} />}
                <Box m={3} />
              </Container>
            </Grid>
          </Grid>}

        {!isLoading && <VariablesTable selectedServices={selectedServices} variables={envVariables} />}

        {!isLoading && <SideBar />}
      </Container>
    </Container>
  );

}


export default Environment;