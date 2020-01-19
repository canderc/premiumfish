const basket = require ('./basket.js');

const productsMock = [
    { id: 'fish-1', avatar: 'img/title_img/5.png', title: 'Корюшка дальневосточная с икрой', description: 'Минимальный заказ 1 кг. Размер рыбы 26-33 см.', price: 'Цена: 680 грн', category: 'fish' },
    { id: 'fish-2', avatar: 'img/title_img/5.png', title: 'Камбала дальневосточная с икрой', description: 'Минимальный заказ 1 кг. Вес одной камбалы от 300 грамм.', price: "Цена: 590 грн", category: 'fish' },
    { id: 'fish-3', avatar: 'img/title_img/5.png', title: 'ОКУНЬ', description: 'Окунь предпочитает водоемы с чистой водой. Это могут быть реки, пруды, озера, водохранилища и т.д. Окунь является самым часто встречающимся хищником, но его никогда не найдешь там, где вода мутная и грязная.', price: 630, category: 'fish' },
    { id: 'fish-4', avatar: 'img/title_img/5.png', title: 'ГУСТЕРА', description: 'Это малоподвижный вид рыбы с голубовато-серым окрасом. Живет густера примерно 15 лет и врастает в длину до 35 см, при весе 1,2 кг. Густера, как и лещ, растет довольно медленно.', price: 12000, category: 'fish' },
    { id: 'fish-5', avatar: 'img/title_img/5.png', title: 'САЗАН', description: 'Эта рыба отличается темно-желто-золотистым оттенком', price: 10, category: 'fish' },
    { id: 'caviar-1', avatar: 'img/title_img/5.png', title: 'Икра лемонемы', description: 'Икра в вакуумной упаковке. Фасовка по 0,5 кг. Минимальный заказ 0,5 кг. Срок хранения 6 мес.', price: 'Цена: 700 грн', category: 'caviar'},
    { id: 'caviar-2', avatar: 'img/title_img/5.png', title: 'Икра наваги', description: 'Икра в вакуумной упаковке. Фасовка по 0,5 кг. Минимальный заказ 0,5 кг. Срок хранения 6 мес.', price: 'Цена: 680 грн', category: 'caviar'},
    { id: 'snacks-1', avatar: 'img/title_img/5.png', title: 'Палочки горбуши', description: 'Суперовые палочки горбуши фасовка по 0,5кг', price: 'Цена: 560 грн', category: 'snacks'},
    { id: 'caviar-3', avatar: 'img/title_img/5.png', title: 'Икра лосося', description: 'Очень вкусная икра в ястыке', price: 'Цена: 750 грн', category: 'caviar'},
    { id: 'caviar-4', avatar: 'img/title_img/5.png', title: 'Икра лосося', description: 'Очень вкусная икра в ястыке', price: 'Цена: 750 грн', category: 'caviar'},
    { id: 'snacks-2', avatar: 'img/title_img/5.png', title: 'Рыбные палочки', description: 'Суперовые палочки горбуши фасовка по 0,5кг', price: 'Цена 490 грн', category: 'snacks'},
]

const request = require('./services/request')


function handleProducts (products) {
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        if (product.category === 'fish') {
            drawFish(product)
        } else if (product.category === 'caviar') {
            drawCaviar(product)
        } else if (product.category === 'snacks') {
            drawSnacks(product)
        }
    };
}

function handlePlusClick() {

}

function createCard (product, option) {
    const wrapCard = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('span');
    const price = document.createElement ('span');
    const wrapButton = document.createElement('div');
    const buttonLook = document.createElement('button');
    const buttonBasket = document.createElement('button');
    const titleImage = document.createElement('img');
    const input = document.createElement('input')
    const quantityWrap = document.createElement('div');
    const spanPlus = document.createElement('span');
    const spanMinus = document.createElement('span');
    const spanWeight = document.createElement('span');

    wrapCard.className = "product-wrap";
    title.className = "product-title";
    description.className = "product-discription";
    price.className = "product-price";
    wrapButton.className = "button-wrap";
    buttonLook.className = "button-look";
    buttonBasket.className = "button-basket";
    buttonBasket.id = product.id;
    titleImage.className = "title-img";
    titleImage.setAttribute ('alt', 'titl-image')
    titleImage.setAttribute ('src', product.avatar);
    input.className = "quantity";
    quantityWrap.className = "quantity-wrap";
    spanPlus.className = "plus-minus";
    spanMinus.className = "plus-minus";
    spanWeight.className = "weight";

    wrapCard.append(titleImage);
    wrapCard.append(title);
    wrapCard.append(description);
    wrapCard.append(price);
    wrapCard.append(wrapButton);
    wrapButton.append(quantityWrap);
    quantityWrap.append(spanMinus);
    quantityWrap.append(input);
    quantityWrap.append(spanWeight);
    quantityWrap.append(spanPlus);
    wrapButton.append(buttonBasket);
    
    title.innerHTML = product.title;
    description.innerHTML = product.description;
    price.innerHTML = product.price;
    buttonBasket.innerHTML = "В корзину";
    spanPlus.innerHTML = "+";
    spanMinus.innerHTML = "-";
    input.value = option.quantity;
    spanWeight.innerHTML = "кг";
    
    spanPlus.addEventListener ('click', function () {
        const nowValue = input.value;
        const newValue = parseFloat(nowValue) + option.step;
        input.value = newValue; 
    });

    spanMinus.addEventListener ('click', function () {
        const nowValue = input.value;
        const newValue = parseFloat(nowValue) - option.step;
        input.value = newValue < option.quantity ? option.quantity : newValue;
    });

    buttonBasket.addEventListener ('click', function (event) {
        const target = event.target;
        const id = target.id;
        // cart[art] = 1;
        const product = productsMock.find (function (pr) {
            if (pr.id === id) {
                return true
            }
        });
        basket.addToBasket(product, option);
    });

    return wrapCard;
}
    
function drawFish (product) {
    const fishCategoryWrap = document.querySelector('.fish-category_wrap');

    const card = createCard(product, {quantity: 1, step: 1});

    fishCategoryWrap.append(card);
}

function drawCaviar (product) {
    const caviarCategoryWrap = document.querySelector('.caviar-category_wrap');
    
    const card = createCard(product, {quantity: 0.5, step: 0.5});

    caviarCategoryWrap.append(card);
}

function drawSnacks (product) {
    const snacksCategoryWrap = document.querySelector('.snacks-category_wrap');
    
    const card = createCard(product, {quantity: 0.5, step: 0.5});

    snacksCategoryWrap.append(card);
}

// module.exports = {
//     onLoad: function() {
//       request.get('/api/products')
//         .then(function(products) {
//           handleProducts(products)
//         });
//     }
//   }

handleProducts(productsMock);
    
