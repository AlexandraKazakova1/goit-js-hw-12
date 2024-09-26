import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const query = event.currentTarget.elements.searchQuery.value.trim();
    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Search query cannot be empty!',
        });
        return;
    }
clearGallery(gallery);
    showLoader(true);
    try {
        const images = await fetchImages(query, currentPage);
        if (images.length === 0) {
            iziToast.info({
                title: 'Sorry',
                message: 'There are no images matching your search query. Please try again!',
            });
        } else {
            renderImages(images, gallery);
            lightbox.refresh();
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
        });
    } finally {
        showLoader(false);
    }
});

function showLoader(isVisible) {
    if (isVisible) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}