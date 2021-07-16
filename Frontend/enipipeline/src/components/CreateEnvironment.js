import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';

class CreateEnvironment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            environment: { name: "", org: "", proj: "", armId: "", ansId: "", team: "", owner: "" },
            servers: []
        }
    }

    render() {
        return (
            <Container className={{flexGrow: 1}}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Container className={{textAlign: 'center'}}>xs=6</Container>
                    </Grid>
                    <Grid item xs={6}>
                        <Container className={{textAlign: 'center'}}>xs=6</Container>
                    </Grid>
                </Grid>
            </Container>
        );
    }

}

export default CreateEnvironment;