import { fetchImages } from '/js/pixabay-api';
import { renderImages, clearGallery } from '/js/render-functions';

let currentPage = 1;
let currentQuery = '';

const form = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = event.target.query.value.trim();
  if (!currentQuery) return;

  currentPage = 1;
  clearGallery();
  loadMoreBtn.hidden = true;

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits);
    if (data.totalHits > 15) {
      loadMoreBtn.hidden = false;
    }
  } catch (error) {
    console.error(error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits);

    if (currentPage * 15 >= data.totalHits) {
      loadMoreBtn.hidden = true;
      alert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error(error);
  }
});
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.photo-card')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

loadMoreBtn.addEventListener('click', async () => {
  smoothScroll();
});