import axios from 'axios';

class DatabaseService {

    async getAllEnvironments() {
        return await axios.get('http://localhost:8000/environments');
    }

    async getServersByEnvironmnet(envId) {
        return await axios.get('http://localhost:8000/servers/' + envId);
    }

    async getAllTeams() {
        return await axios.get('http://localhost:8000/teams');
    }

    async getAllUsers() {
        return await axios.get('http://localhost:8000/users');
    }

    async addEnvironment(env) {
        let r = await axios.post('http://localhost:8000/environment', env);
        return r;
    }

}

export default new DatabaseService();