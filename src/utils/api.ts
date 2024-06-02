import ky from 'ky';

const API_URL: string = import.meta.env.VITE_API_URL;

const api = ky.extend({
  prefixUrl: API_URL,
  mode: 'cors',
  retry: 0,
  timeout: false,
  hooks: {
    beforeRequest: [
      request => {
        const token = localStorage.getItem('token');
        token !== null && request.headers.set('Authorization', `Bearer ${token}`);
      }
    ]
  }
});

export default api;
