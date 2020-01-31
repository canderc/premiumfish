const productPictures = document.querySelector ('#window-img');
const productPicturesButton = document.querySelector ('.product-pictures_button');
const picturesTitle = document.querySelector ('.product-pictures_title');
const picturesGallery = document.querySelector ('.product-pictures_gallery');

productPicturesButton.addEventListener ('click', function() {
    productPictures.classList.toggle ('product-hide');
    clearGalleryProductImages ()
});

function createGalleryProductImages (arrImg) {
    console.log ('+++', arrImg)
    for (let i = 0; i < arrImg.length; i++) {
        console.log ('===', i)
        if (i === 0) {
            const img = document.createElement ('IMG');
            // img.src = arrImg[i]
            picturesTitle.appendChild (img);
            img.setAttribute ('src', arrImg[i])
            img.classList = 'title-pictures'
            console.log (img)
            console.log (arrImg[i])

        } else {
            const divWrapImgGallery = document.createElement ('div');
            const img = document.createElement ('IMG');
            divWrapImgGallery.className = "product-pictures_img";
            picturesGallery.appendChild (divWrapImgGallery);
            divWrapImgGallery.appendChild (img);
            img.setAttribute ('src', arrImg[i]);
            img.classList = 'images-colection';
        }
    }
    productPictures.classList.toggle ('product-hide')
}

function clearGalleryProductImages () {
    const titlePictures = document.querySelector ('.title-pictures');
    const imgColection = document.querySelectorAll ('.product-pictures_img');
    titlePictures.parentNode.removeChild (titlePictures);
    for (let i = 0; i<imgColection.length; i++) {
        const img = imgColection[i]
        img.parentNode.removeChild (img)
    }
    
    console.log (imgColection)
}

module.exports = {createGalleryProductImages};

