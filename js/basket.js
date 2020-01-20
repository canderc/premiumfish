const buttonBasketClose = document.querySelector ('.basket-close_button');
const basket = document.querySelector ('.basket-close');
const basketIcons = document.querySelector ('.basket-icons');
const basketProduct = document.querySelector ('.basket-product');
const basketWrap = document.querySelector ('.basket-wrap');
const spanEmptyBasket = document.querySelector ('.empty-basket');

const productsInBasket = {};

buttonBasketClose.addEventListener ('click', function() {
    basket.classList.toggle ('basket-close');
    basket.classList.remove ('basket');
})

basketIcons.addEventListener ('click', function() {
    basket.classList.toggle ('basket')
});

function productToBasket (product) {
    const productId = product.id;
    console.log (productsInBasket);
    if (productsInBasket[productId]) {
        productsInBasket[productId].quantity = productsInBasket[productId].quantity + product.step;
        const input = document.querySelector ('[data-id =' + product.id +']');
        input.value = productsInBasket[productId].quantity;
        console.log (input);
    } else {
        productsInBasket[productId] = {quantity: product.quantity, step: product.step};
        addToBasket(product);
        spanEmptyBasket.classList.toggle ('basket-goods');
    }
}

function addToBasket (product) {
    const wrapCard = document.createElement('div');
    const title = document.createElement('h3');
    const price = document.createElement ('span');
    const titleImage = document.createElement('img');
    const input = document.createElement('input')
    const quantityWrap = document.createElement('div');
    const spanPlus = document.createElement('span');
    const spanMinus = document.createElement('span');
    const spanWeight = document.createElement('span');
    const divTitlePrice = document.createElement('div');
    const divTitlePriceImg = document.createElement ('div');
    const sum = document.createElement ('div');
    const sumTitle = document.createElement ('span');
    const quantityTitle = document.createElement ('span');
    const quantityWrapItem = document.createElement ('div');
    const buttonDel = document.createElement ('button');
    const spanDel = document.createElement ('span');    

    wrapCard.className = "basket-product_wrap";
    title.className = "product-title_basket";
    price.className = "product-price_basket";
    titleImage.className = "title-img_basket";
    titleImage.setAttribute ('alt', 'titl-image_basket')
    titleImage.setAttribute ('src', product.avatar);
    input.setAttribute ("data-id", product.id);
    input.className = "quantity";
    quantityWrap.className = "quantity-wrap";
    spanPlus.className = "plus-minus";
    spanMinus.className = "plus-minus";
    spanWeight.className = "weight";
    divTitlePrice.className = "title-price_wrap";
    divTitlePriceImg.className = "title-price_item";
    sum.className = "sum-wrap";
    sumTitle.className = "sum-title";
    quantityTitle.className = "quantity-title";
    quantityWrapItem.className = "quantity-wrap_item";
    buttonDel.className = "basket-close_button";
    spanDel.className = "button-span";


    wrapCard.append (divTitlePriceImg);
    wrapCard.append (quantityWrap);
    wrapCard.append (sum);
    wrapCard.append (buttonDel);
    buttonDel.append (spanDel);
    divTitlePriceImg.appendChild (titleImage);
    divTitlePriceImg.appendChild (divTitlePrice);
    divTitlePrice.append (title);
    divTitlePrice.append (price);
    quantityWrap.append (quantityTitle);
    quantityWrap.append (quantityWrapItem);
    quantityWrapItem.append (spanMinus);
    quantityWrapItem.append (input);
    quantityWrapItem.append (spanWeight);
    quantityWrapItem.append (spanPlus);
    sum.append (sumTitle);
        
    title.innerHTML = product.title;
    price.innerHTML = product.price;
    spanPlus.innerHTML = "+";
    spanMinus.innerHTML = "-";
    input.value = product.quantity;
    spanWeight.innerHTML = "кг";
    sumTitle.innerHTML = "Сумма";
    quantityTitle.innerHTML = "Количество";
    
    spanPlus.addEventListener ('click', function () {
        const nowValue = input.value;
        const newValue = parseFloat(nowValue) + product.step;
        input.value = newValue; 
    });

    spanMinus.addEventListener ('click', function () {
        const nowValue = input.value;
        const newValue = parseFloat(nowValue) - product.step;
        input.value = newValue < product.quantity ? product.quantity : newValue;
    });

    buttonDel.addEventListener ('click', function() {
        if (product.id) {
            basketProduct.removeChild (wrapCard);
            for (let key in productsInBasket) {
                delete productsInBasket[key]
            };
            console.log (productsInBasket);
            spanEmptyBasket.classList.toggle ('basket-goods');
        }
    });

    basketProduct.append (wrapCard);
    
};

module.exports = {productToBasket}