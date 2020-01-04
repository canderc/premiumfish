const productsMock = [
    { title: 'СУДАК', description: 'Судак, как и окунь, предпочитает лишь чистую воду, насыщенную кислородом и способствующую нормальной жизнедеятельности рыбы', price: 280, category: 'fish' },
    { title: 'БЕРШ', description: 'Берш, как и судак, считается родственником окуня.', price: 100, category: 'fish' },
    { title: 'ОКУНЬ', description: 'Окунь предпочитает водоемы с чистой водой. Это могут быть реки, пруды, озера, водохранилища и т.д. Окунь является самым часто встречающимся хищником, но его никогда не найдешь там, где вода мутная и грязная. Для ловли окуня применяют довольно-таки тонкие снасти. Его ловля очень интересна и занимательная.', price: 630, category: 'fish' },
    { title: 'ГУСТЕРА', description: 'Это малоподвижный вид рыбы с голубовато-серым окрасом. Живет густера примерно 15 лет и врастает в длину до 35 см, при весе 1,2 кг. Густера, как и лещ, растет довольно медленно.', price: 12000, category: 'fish' },
    { title: 'САЗАН', description: 'Эта рыба отличается темно-желто-золотистым оттенком', price: 10, category: 'fish' },
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

    wrapCard.className = "product-wrap";
    title.className = "product-title";
    description.className = "product-discription";
    price.className = "product-price";
    wrapButton.className = "button-wrap";
    buttonLook.className = "button-look";
    buttonBasket.className = "button-basket";

    wrapCard.append(title);
    wrapCard.append(description);
    wrapCard.append(price);
    wrapCard.append(wrapButton);
    wrapButton.append(buttonLook);
    wrapButton.append(buttonBasket);

    title.innerHTML = product.title;
    description.innerHTML = product.description;
    price.innerHTML = product.price;

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
}

function drawSnacks (product) {
    const snacksCategory = document.querySelector('.snacks-category');
}

handleProducts(productsMock);
    