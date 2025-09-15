import axios from 'axios';



// unauthenticated api client
export const apiClient = axios.create({
    baseURL: 'https://dumbbell-don.vercel.app/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// authenticated api client
export const authApiClient = axios.create({ 
    baseURL: 'https://dumbbell-don.vercel.app/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

authApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)?.access}`;
    }
    return config;
});

 