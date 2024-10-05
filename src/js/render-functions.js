export function renderImages(images, galleryElement) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
            <a href="${largeImageURL}" class="gallery-item">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p><b>Likes</b> ${likes}</p>
                    <p><b>Views</b> ${views}</p>
                    <p><b>Comments</b> ${comments}</p>
                    <p><b>Downloads</b> ${downloads}</p>
                </div>
            </a>
        `;
    }).join('');
    
    galleryElement.insertAdjacentHTML('beforeend', markup);
}
export function clearGallery(galleryElement) {
    galleryElement.innerHTML = '';
}