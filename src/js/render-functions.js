export function renderImages(images) {
  const gallery = document.getElementById('gallery');
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads  }) =>
        `<a href="${largeImageURL}" class="gallery-item">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p>Likes ${likes}</p>
                    <p>Views ${views}</p>
                    <p>Comments ${comments}</p>
                    <p>Downloads ${downloads}</p>
                </div>
            </a>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
}
