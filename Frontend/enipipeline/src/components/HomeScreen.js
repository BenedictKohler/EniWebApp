import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatabaseService from '../services/DatabaseService';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, environments: []
        }
    }

    // Get data about environments
    async componentDidMount() {
        try {
            let result = await DatabaseService.getAllEnvironments();
            if (result.status === 200) this.setState({isLoading: false, environments: result.data});
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Container>
                <h2>ENI Energy Pipeline Controller</h2>
                <CircularProgress />
            </Container>
        );
    }

}

export default HomeScreen;