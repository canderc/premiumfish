const basket = require ('./basket.js'); // { productToBasket }
const pictures = require ('./productPictures.js')

const productsCard = document.querySelectorAll (`[data-card]`);

const productsMock = [
    { id: 'fish-1', avatar: 'img/title_img/5.png', img: ['img/title_img/5.png','img/koryushka/fish1.jpg', 'img/koryushka/fish2.jpg', 'img/koryushka/fish3.png'], title: 'Корюшка дальневосточная с икрой', description: 'Минимальный заказ 1 кг. Размер рыбы 26-33 см.', price: 680, quantity: 1, step: 1, category: 'fish' },
    { id: 'fish-2', avatar: 'img/title_img/5.png', img: ['img/title_img/5.png','img/koryushka/fish1.jpg', 'img/koryushka/fish2.jpg', 'img/koryushka/fish3.png'], title: 'Камбала дальневосточная с икрой', description: 'Минимальный заказ 1 кг. Вес одной камбалы от 300 грамм.', price:590, quantity: 1, step: 1, category: 'fish' },
    // { id: 'fish-3', avatar: 'img/title_img/5.png', title: 'ОКУНЬ', description: 'Окунь предпочитает водоемы с чистой водой. Это могут быть реки, пруды, озера, водохранилища и т.д. Окунь является самым часто встречающимся хищником, но его никогда не найдешь там, где вода мутная и грязная.', price: 630, quantity: 1, step: 1, category: 'fish' },
    // { id: 'fish-4', avatar: 'img/title_img/5.png', title: 'ГУСТЕРА', description: 'Это малоподвижный вид рыбы с голубовато-серым окрасом. Живет густера примерно 15 лет и врастает в длину до 35 см, при весе 1,2 кг. Густера, как и лещ, растет довольно медленно.', price: 12000, quantity: 1, step: 1, category: 'fish' },
    // { id: 'fish-5', avatar: 'img/title_img/5.png', title: 'САЗАН', description: 'Эта рыба отличается темно-желто-золотистым оттенком', price: 10, quantity: 1, step: 1, category: 'fish' },
    { id: 'caviar-1', avatar: 'img/title_img/5.png', img: ['img/title_img/5.png','img/koryushka/fish1.jpg', 'img/koryushka/fish2.jpg', 'img/koryushka/fish3.png'], title: 'Икра лемонемы', description: 'Икра в вакуумной упаковке. Фасовка по 0,5 кг. Минимальный заказ 0,5 кг. Срок хранения 6 мес.', price: 700, quantity: 0.5, step: 0.5, category: 'caviar'},
    { id: 'caviar-2', avatar: 'img/title_img/5.png', img: ['img/title_img/5.png','img/koryushka/fish1.jpg', 'img/koryushka/fish2.jpg', 'img/koryushka/fish3.png'], title: 'Икра наваги', description: 'Икра в вакуумной упаковке. Фасовка по 0,5 кг. Минимальный заказ 0,5 кг. Срок хранения 6 мес.', price: 680, quantity: 0.5, step: 0.5, category: 'caviar'},
    { id: 'snacks-1', avatar: 'img/title_img/5.png', img: ['img/title_img/5.png','img/koryushka/fish1.jpg', 'img/koryushka/fish2.jpg', 'img/koryushka/fish3.png'], title: 'Палочки горбуши', description: 'Суперовые палочки горбуши фасовка по 0,5кг', price: 560, quantity: 0.5, step: 0.5, category: 'snacks'},
    // { id: 'caviar-3', avatar: 'img/title_img/5.png', title: 'Икра лосося', description: 'Очень вкусная икра в ястыке', price: 750, quantity: 0.5, step: 0.5, category: 'caviar'},
    // { id: 'caviar-4', avatar: 'img/title_img/5.png', title: 'Икра лосося', description: 'Очень вкусная икра в ястыке', price: 750, quantity: 0.5, step: 0.5, category: 'caviar'},
    // { id: 'snacks-2', avatar: 'img/title_img/5.png', title: 'Рыбные палочки', description: 'Суперовые палочки горбуши фасовка по 0,5кг', price: 490, quantity: 0.5, step: 0.5, category: 'snacks'},
]

for (var i = 0; i < productsCard.length; i++) {
    const productHtml = productsCard[i];
    const productId = productHtml.getAttribute ('data-card');
    const productObj = productsMock.find (function (product) {
        if (productId === product.id) {
            return true
        }
    }) 

    const quantityMinus = productHtml.querySelector (".reduce");
    const quantityPlus = productHtml.querySelector (".increase");
    const quantityInput = productHtml.querySelector ('.quantity');
    const buttonBasket = productHtml.querySelector ('.button-basket');
    const avatar = productHtml.querySelector ('.title-img');
    console.log (avatar)

    quantityInput.value = productObj.quantity;
    quantityInput.step = productObj.step;


    quantityMinus.addEventListener ("click", function () {
        const nowValue = quantityInput.value
        const newValue = parseFloat(nowValue) - productObj.step;

        if (newValue >= productObj.step) {
            quantityInput.value = newValue;
            productObj.quantity = newValue;
        }
    })
    
    quantityPlus.addEventListener ("click", function () {
        const nowValue = quantityInput.value
        const newValue = parseFloat(nowValue) + productObj.step;
        quantityInput.value = newValue;
        productObj.quantity = newValue;
    });

    quantityInput.addEventListener ('change', function () {
        productObj.quantity = this.value;
    });

    buttonBasket.addEventListener ('click', function (event) {
        basket.productToBasket (productObj)
    });

    avatar.addEventListener ('click', function () {
        const productImg = productObj.img;
        pictures.createGalleryProductImages (productImg) 
        console.log (productImg);
        // console.log (productPicturesButton);
    })
}

 