// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://www.google.com/', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json' // Optional: sets common headers
    }
});

export default apiClient;
