import React, { useEffect, useState } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import DatabaseService from '../services/DatabaseService';
import { SideBar } from '../components/SideBar/SideBar';
import NavBar from '../components/ServerSoftware/NavBar';
import SelectedSoftwareTable from '../components/ServerSoftware/SelectedSoftwareTable';
import SoftwareTable from '../components/ServerSoftware/SoftwareTable';


const ServerSoftware = (props) => {

    if (props.location.server != null) sessionStorage.setItem('server', JSON.stringify(props.location.server));

    const [isLoading, setLoading] = useState(true);
    const [currentSoftware, setCurrentSoftware] = useState([]);
    const [allSoftware, setAllSoftware] = useState([]);
    const [server, setServer] = useState(JSON.parse(sessionStorage.getItem('server')));
    const [selectedSoftware, setSelectedSoftware] = useState([]);

    const fetchData = async () => {
        try {
            let currentSoftware = await DatabaseService.getSoftwareByServerId(server.serverId);
            let allSoftware = await DatabaseService.getAllSoftware();
            if (currentSoftware.status === 200 && allSoftware.status === 200) {
                setCurrentSoftware(currentSoftware.data);
                setAllSoftware(allSoftware.data);
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

    const addAllSoftware = async () => {
        let newList = [];
        for (let soft of currentSoftware) newList.push(soft);
        for (let soft of selectedSoftware) newList.push(soft);
        setCurrentSoftware(newList);
        setSelectedSoftware([]);
        
        for (let i = 0; i < selectedSoftware.length; i++) {
            selectedSoftware[i].serverId = server.serverId;
            await DatabaseService.addSoftware(selectedSoftware[i]);
        }
    }

    function selectSoftware(software) {
        let newList = [];
        for (var soft of selectedSoftware) newList.push(soft);
        newList.push(software);
        setSelectedSoftware(newList);
    }

    const removeSoftware = (index) => {
        let newList = [];
        for (let i = 0; i < selectedSoftware.length; i++) {
            if (i == index) continue;
            newList.push(selectedSoftware[i]);
        }
        setSelectedSoftware(newList);
    }

    return (
        <Container>
            {!isLoading && <NavBar selectSoftware={selectSoftware} allSoftware={allSoftware} server={server} />}
            <Container>
                {isLoading && <CircularProgress />}
                {!isLoading && selectedSoftware.length > 0 && <SelectedSoftwareTable addAllSoftware={addAllSoftware} removeSoftware={removeSoftware} selectedSoftware={selectedSoftware} />}
                {!isLoading && <SoftwareTable currentSoftware={currentSoftware} />}
                {!isLoading && <SideBar />}
            </Container>
        </Container>
    );
}


export default ServerSoftware;