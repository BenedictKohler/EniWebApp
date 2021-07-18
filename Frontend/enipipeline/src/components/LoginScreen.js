import React from 'react';
import Container from '@material-ui/core/Container';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <h3>This is going to be login page. Navigate to /home for now.</h3>
            </Container>
        );
    }

}

export default LoginScreen;