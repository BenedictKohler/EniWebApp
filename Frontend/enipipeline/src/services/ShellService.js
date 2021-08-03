import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/'
});

class ShellService {

    async executeWindowsScript() {
        return await axiosInstance.get('windows');
    }

    async executeLinuxScript() {
        return await axiosInstance.get('linux');
    }

    async getServiceStatus(data) {
        return await axiosInstance.post('serviceStatus', data);
    }

    async getServerStatus(serverList) {
        return await axiosInstance.post('serverStatus', serverList);
    }

    async startServices(data) {
        return await axiosInstance.post('startServices', data);
    }

    async stopServices(data) {
        return await axiosInstance.post('stopServices', data);
    }

}

export default new ShellService();