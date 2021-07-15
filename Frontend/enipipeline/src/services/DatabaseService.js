import axios from 'axios';

class DatabaseService {

    async getAllEnvironments() {
        return await axios.get('http://localhost:8000/environments');
    }

    async getServersByEnvironmnet(envId) {
        return await axios.get('http://localhost:8000/servers/' + envId);
    }

}

export default new DatabaseService();