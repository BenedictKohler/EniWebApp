import axios from 'axios';

class DatabaseService {

    async getAllEnvironments() {
        return await axios.get('http://localhost:8000/environments');
    }

}

export default new DatabaseService();