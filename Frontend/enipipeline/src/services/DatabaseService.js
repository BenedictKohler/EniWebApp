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

    async getAllServerTypes() {
        return await axios.get('http://localhost:8000/serverTypes');
    }

    async getAllUsers() {
        return await axios.get('http://localhost:8000/users');
    }

    async addEnvironment(env) {
        return await axios.post('http://localhost:8000/environment', env);
    }

    async addSoftware(software) {
        return await axios.post('http://localhost:8000/software', software);
    }

    async getSoftwareByServerId(serverId) {
        return await axios.get('http://localhost:8000/software/' + serverId);
    }

    async getAllSoftware() {
        return await axios.get('http://localhost:8000/software');
    }

    async addServer(server) {
        return await axios.post('http://localhost:8000/server', server);
    }

    async deployEnvironment() {
        let body = {
            "resources": {
                "pipelines": {
                    "version": "1.0.0"
                }
            },
            "variables": {
                "Message": {"value": "Test Variable"}
            }
        };

        let auth = {
            headers: {"Authorization": "Basic YmtvaGxlcjp1a2RqY3lrM21obnFxcGE1Z3VhZzZ2ZGl6d2NocjNqbTdqb2JzcGxnYXJ6Y21pam9qdm9h"}
        };
        try {
            return await axios.post('https://dev.azure.com/benkohler/ARMPipeline/_apis/pipelines/4/runs?api-version=6.0-preview.1', body, auth);
        }
        catch (err) {
            console.log(err.message);
        }
    }

}

// Access token: ukdjcyk3mhnqqpa5guag6vdizwchr3jm7jobsplgarzcmijojvoa   but need to encode in base64 to put into header
// Get: https://dev.azure.com/benkohler/ARMPipeline/_apis/pipelines/9/runs/7?api-version=6.0-preview.1

// Note: 4 is definitonId and pipelineId
// Any username can be used in auth but must use token as password

export default new DatabaseService();