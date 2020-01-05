const productsMock = [
    { avatar: 'img/title_img/5.png', title: 'СУДАК', description: 'Судак, как и окунь, предпочитает лишь чистую воду, насыщенную кислородом и способствующую нормальной жизнедеятельности рыбы', price: 'Цена: 280 грн', category: 'fish' },
    { avatar: 'img/title_img/5.png', title: 'БЕРШ', description: 'Берш, как и судак, считается родственником окуня.', price: 100, category: 'fish' },
    { avatar: 'img/title_img/5.png', title: 'ОКУНЬ', description: 'Окунь предпочитает водоемы с чистой водой. Это могут быть реки, пруды, озера, водохранилища и т.д. Окунь является самым часто встречающимся хищником, но его никогда не найдешь там, где вода мутная и грязная. Для ловли окуня применяют довольно-таки тонкие снасти. Его ловля очень интересна и занимательная.', price: 630, category: 'fish' },
    { avatar: 'img/title_img/5.png', title: 'ГУСТЕРА', description: 'Это малоподвижный вид рыбы с голубовато-серым окрасом. Живет густера примерно 15 лет и врастает в длину до 35 см, при весе 1,2 кг. Густера, как и лещ, растет довольно медленно.', price: 12000, category: 'fish' },
    { avatar: 'img/title_img/5.png', title: 'САЗАН', description: 'Эта рыба отличается темно-желто-золотистым оттенком', price: 10, category: 'fish' },
    { avatar: 'img/title_img/5.png', title: 'Икра лемонемы', description: 'Очень вкусная икра в ястыке', price: 'Цена: 700 грн', category: 'caviar'},
    { avatar: 'img/title_img/5.png', title: 'Икра наваги', description: 'Очень вкусная икра в ястыке', price: 'Цена: 680 грн', category: 'caviar'},
    { avatar: 'img/title_img/5.png', title: 'Палочки горбуши', description: 'Суперовые палочки горбуши фасовка по 0,5кг', price: 'Цена: 560 грн', category: 'snacks'},
    { avatar: 'img/title_img/5.png', title: 'Икра лосося', description: 'Очень вкусная икра в ястыке', price: 'Цена: 750 грн', category: 'caviar'},
    { avatar: 'img/title_img/5.png', title: 'Икра лосося', description: 'Очень вкусная икра в ястыке', price: 'Цена: 750 грн', category: 'caviar'},
    { avatar: 'img/title_img/5.png', title: 'Рыбные палочки', description: 'Суперовые палочки горбуши фасовка по 0,5кг', price: 'Цена 490 грн', category: 'snacks'},
]

// let wrapCard = document.createElement('div');
// let title = document.createElement('h3');
// let description = document.createElement('span');
// let price = document.createElement ('span');
// let wrapButton = document.createElement('div');
// let buttonLook = document.createElement('button');
// let buttonBasket = document.createElement('button');

// wrapCard.className = "product-wrap";
// title.className = "product-title";
// description.className = "product-discription";
// price.className = "product-price";
// wrapButton.className = "button-wrap";
// buttonLook.className = "button-look";
// buttonBasket.className = "button-basket";

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

function createCard (product) {
    const wrapCard = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('span');
    const price = document.createElement ('span');
    const wrapButton = document.createElement('div');
    const buttonLook = document.createElement('button');
    const buttonBasket = document.createElement('button');
    const titleImage = document.createElement('img');

    wrapCard.className = "product-wrap";
    title.className = "product-title";
    description.className = "product-discription";
    price.className = "product-price";
    wrapButton.className = "button-wrap";
    buttonLook.className = "button-look";
    buttonBasket.className = "button-basket";
    titleImage.className = "title-img";
    titleImage.setAttribute ('alt', 'titl-image')
    titleImage.setAttribute ('src', product.avatar);

    wrapCard.append(titleImage);
    wrapCard.append(title);
    wrapCard.append(description);
    wrapCard.append(price);
    wrapCard.append(wrapButton);
    wrapButton.append(buttonBasket);

    title.innerHTML = product.title;
    description.innerHTML = product.description;
    price.innerHTML = product.price;
    buttonBasket.innerHTML = "В корзину"

    return wrapCard;
}
    
function drawFish (product) {
    const fishCategory = document.querySelector('.fish-category');

    const card = createCard(product);

    fishCategory.append(card);

    // fishCategory.append(wrapCard);
    // wrapCard.append(title);
    // wrapCard.append(description);
    // wrapCard.append(price);
    // wrapCard.append(wrapButton);
    // wrapButton.append(buttonLook);
    // wrapButton.append(buttonBasket);

    // title.innerHTML = product.title;
    // description.innerHTML = product.description;
    // price.innerHTML = product.price;
}

function drawCaviar (product) {
    const caviarCategory = document.querySelector('.caviar-category');
    
    const card = createCard(product);

    caviarCategory.append(card);
}

function drawSnacks (product) {
    const snacksCategory = document.querySelector('.snacks-category');
    
    const card = createCard(product);

    snacksCategory.append(card);
}

handleProducts(productsMock);
    
