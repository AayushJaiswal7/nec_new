import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use((config) => {
    config.withCredentials = true;
    return config;
});

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        if (response) {
            const { error: errMsg, action, redirect } = response.data;

            if (action === 'clearStorage') {
                localStorage.clear();
                alert(errMsg);
                // Redirect to home page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
                if (redirect) window.location.href = redirect;
            }
        }
        return Promise.reject(error);
    }
);

export default api;