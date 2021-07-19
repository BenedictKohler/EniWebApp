import React from 'react';
import DatabaseService from '../services/DatabaseService';
import { Container } from '@material-ui/core';

class AddSoftware extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.location.server != null) sessionStorage.setItem('server', JSON.stringify(this.props.location.server));
        this.state = {
            isLoading: true, currentSoftware: [], allSoftware: [],
            server: JSON.parse(sessionStorage.getItem('server'))
        }
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

    render() {
        return (
            <Container>
                <h3>TODO</h3>
            </Container>
        );
    }

}

export default AddSoftware;