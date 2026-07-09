import apiClient from '../api/apiClient';

export const hotelService = {
    async getAll(params = {}) {
        const { data } = await apiClient.get('/hotels', { params });
        return data;
    },

    async getById(id) {
        const { data } = await apiClient.get(`/hotels/${id}`);
        return data;
    },

    async create(hotelData) {
        const { data } = await apiClient.post('/hotels', hotelData);
        return data;
    },

    async update(id, hotelData) {
        const { data } = await apiClient.patch(`/hotels/${id}`, hotelData);
        return data;
    },

    async remove(id) {
        const { data } = await apiClient.delete(`/hotels/${id}`);
        return data;
    },
};