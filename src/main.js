import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('.loader');
let lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;


loadMoreBtn.classList.add('hidden');
loader.classList.add('hidden');


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Search query cannot be empty!',
    });
    return;
  }

  
  currentPage = 1;
  totalHits = 0;
  clearGallery(gallery); 
  loadMoreBtn.classList.add('hidden');  

  
  await loadImages();
});


loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await loadImages();
});


async function loadImages() {
  showLoader(true); 
  loadMoreBtn.classList.add('hidden'); 
  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0 && currentPage === 1) {
      iziToast.info({
        title: 'Sorry',
        message: 'No images found. Please try again!',
      });
      return;
    }

    
    renderImages(data.hits, gallery);
    lightbox.refresh();  

    
    if (currentPage > 1) {
      smoothScroll();
    }

    
    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage >= totalPages) {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.classList.add('hidden');  
    } else {
      loadMoreBtn.classList.remove('hidden'); 
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    showLoader(false); 
  }
}


function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery a').getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}


function showLoader(isVisible) {
  if (isVisible) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
}
