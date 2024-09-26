  const API_KEY = '46071248-68730f1ac11d3747a84542f11';
const BASE_URL = 'https://pixabay.com/api/';


export async function fetchImages(query, page = 1, perPage = 12) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('HTTP error');
        }
        const data = await response.json();
        return data.hits;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}