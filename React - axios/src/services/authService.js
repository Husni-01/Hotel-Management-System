// all the requests related to user and auth

import apiClient from '../api/apiClient';

export const authService = {
    async login(credentials) {
        const { data } = await apiClient.post('/auth/login', credentials);
        // POST localhost:8000 + /auth/login + JSON Payload
        // {email : 'user@gmail.com', password: '1298q8dhq9w8d'}
        return data;
    },

    async register(payload) {
        const { data } = await apiClient.post('/auth/register', payload);
        return data;
    },

    async getCurrentUser() {
        const { data } = await apiClient.get('/auth/me');
        return data;
    },
};