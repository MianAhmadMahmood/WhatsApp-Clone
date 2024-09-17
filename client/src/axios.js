import axios from 'axios' // Import from the 'axios' package

const instance = axios.create({
    baseURL: 'http://localhost:2000', // Your backend's base URL
});

export default instance;
