import apiClient from '../api/apiClient';

export const reviewService = {
    // get all reviews for a single hotel
    async getForHotel(hotelId) {
        const { data } = await apiClient.get('/reviews', {
            params: { hotel: hotelId },
        });

        return data;
    },

    async create(reviewData) {
        const { data } = await apiClient.post('/reviews', reviewData);
        return data;
    },
};
