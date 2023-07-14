import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36067881-7a26dd4a3bd50794fcd12a598';

export const GalleryApi = async (query, page) => {
    const searchParams = new URLSearchParams({
        q: query,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    });

    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
};