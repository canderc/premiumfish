const productPictures = document.querySelector ('#window-img');
const productPicturesButton = document.querySelector ('.product-pictures_button');
const picturesTitleImg = document.querySelector ('.title-pictures');
const picturesGallery = document.querySelector ('.product-pictures_gallery');

productPicturesButton.addEventListener ('click', function() {
    productPictures.classList.toggle ('product-hide');
    clearGalleryProductImages ()
});

function createGalleryProductImages (arrImg) {
    picturesTitleImg.setAttribute ('src', arrImg[0])

    for (let i = 0; i < arrImg.length; i++) {
        const img = document.createElement ('IMG');
        const divWrapImgGallery = document.createElement ('div');
        divWrapImgGallery.className = "product-pictures_img";
        picturesGallery.appendChild (divWrapImgGallery);
        divWrapImgGallery.appendChild (img);
        img.setAttribute ('src', arrImg[i]);
        img.classList = 'images-colection';
        
        if (i === 0) {
            divWrapImgGallery.classList.add ('active')
        }

        img.addEventListener ('click', function (e) {
            picturesTitleImg.setAttribute ('src', arrImg[i])
            const target = e.target;
            const child = picturesGallery.childNodes
            
            for (let i = 1; i < child.length; i++) {
                
                if (child[i].classList.contains('active') ) {
                    child[i].classList.remove ('active')
                }

                target.parentNode.classList.add ('active')
            }
        })
    }
    
    productPictures.classList.toggle ('product-hide')
}

function clearGalleryProductImages () {
    const imgColection = document.querySelectorAll ('.product-pictures_img');

    for (let i = 0; i < imgColection.length; i++) {
        const img = imgColection[i]
        img.parentNode.removeChild (img)
    }
}

module.exports = {createGalleryProductImages};

