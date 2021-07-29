import React, { useEffect, useState } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import DatabaseService from '../services/DatabaseService';
import { SideBar } from '../components/SideBar/SideBar';
import NavBar from '../components/Environment/NavBar';
import ServerTable from '../components/Environment/ServerTable';


const Environment = (props) => {

  if (props.location.environment != null) sessionStorage.setItem('environment', JSON.stringify(props.location.environment));

  const [environment, setEnvironment] = useState(JSON.parse(sessionStorage.getItem('environment')));
  const [servers, setServers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [serverTypes, setTypes] = useState([]);

  const fetchData = async () => {
    try {
      let result1 = await DatabaseService.getServersByEnvironmnet(environment.environmentId);
      let result2 = await DatabaseService.getAllServerTypes();
      if (result1.status === 200 && result2.status === 200) {
        setServers(result1.data);
        setTypes(result2.data);
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

  return (
    <Container>
      {!isLoading && <NavBar serverTypes={serverTypes} environment={environment} />}
      <Container>
        {isLoading && <CircularProgress />}
        {!isLoading && <ServerTable servers={servers} />}
        {!isLoading && <SideBar />}
      </Container>
    </Container>
  );

}


export default Environment;