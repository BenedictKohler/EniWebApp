import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/'
});

class DatabaseService {

    async getAllEnvironments() {
        return await axiosInstance.get('environments');
    }
   
    async updateEnvironment(newEnvInfo) {
        return await axiosInstance.put('environment', newEnvInfo);
    }

    async addUserPermission(userPermission) {
        return await axiosInstance.post('userPermission', userPermission);
    }

    async getServersByEnvironmnet(envId) {
        return await axiosInstance.get('servers/' + envId);
    }

    async getAllTeams() {
        return await axiosInstance.get('teams');
    }

    async getAllServerTypes() {
        return await axiosInstance.get('serverTypes');
    }

    async getAllUsers() {
        return await axiosInstance.get('users');
    }

    async addEnvironment(env) {
        let environmentId =  (await axiosInstance.post('environment', env)).data.environmentId;
        env.environmentId = environmentId;
        return await axiosInstance.post('pipeline', env);
    }

    async addSoftware(software) {
        return await axiosInstance.post('software', software);
    }

    async getSoftwareByServerId(serverId) {
        return await axiosInstance.get('software/' + serverId);
    }

    async getAllSoftware() {
        return await axiosInstance.get('software');
    }

    async addServer(server) {
        return await axiosInstance.post('server', server);
    }

}

export default new DatabaseService();