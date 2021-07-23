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

}

export default new ShellService();