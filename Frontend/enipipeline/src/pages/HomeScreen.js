import React, { useEffect, useState } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import { SideBar } from '../components/SideBar/SideBar';
import EnvironmentTable from '../components/HomeScreen/EnvironmentTable';
import NavBar from '../components/HomeScreen/NavBar';
import CreateEnvironmentButton from '../components/HomeScreen/CreateEnvironmentButton';
import DatabaseService from '../services/DatabaseService';


const HomeScreen = (props) => {

  const [isLoading, setLoading] = useState(true);
  const [environments, setEnvironments] = useState([]);

  const fetchData = async () => {
    try {
      let result = await DatabaseService.getAllEnvironments();
      if (result.status == 200) setEnvironments(result.data);
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
      <NavBar />
      <CreateEnvironmentButton />
      <Container>
        {isLoading && <CircularProgress />}
        {!isLoading && <EnvironmentTable environments={environments} />}
        <SideBar />
      </Container>
    </Container>
  );

}

export default HomeScreen;