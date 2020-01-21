const buttonBasketClose = document.querySelector ('.basket-close_button');
const basket = document.querySelector ('.basket-close');
const basketIcons = document.querySelector ('.basket-icons');
const basketProduct = document.querySelector ('.basket-product');
const basketWrap = document.querySelector ('.basket-wrap');
const spanEmptyBasket = document.querySelector ('.empty-basket');
const spanCostSum = document.querySelector ('.order-cost_sum_number');
const divBasketQuantity = document.querySelector ('.basket-quantity');
const spanBasketQuantity = document.querySelector ('.basket-quantity_number');

function calcelateTotalCost () {
    let sum = 0;
    const keys = Object.keys (productsInBasket);
    for (i=0; i<keys.length; i++) {
        sum+= parseFloat(productsInBasket[keys[i]].cost);
    }
    console.log("====",sum)
    spanCostSum.innerHTML = sum + ' грн';
}

function numberItemsInBasket () {
    const keys = Object.keys (productsInBasket);
    console.log ("количество"+keys.length);
    const keysLength = keys.length;
    spanBasketQuantity.innerHTML = keysLength;
}

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
        productsInBasket[productId].quantity = +productsInBasket[productId].quantity + +product.step;
        const input = document.querySelector ('[data-id =' + product.id +']');
        input.value = productsInBasket[productId].quantity;
        const spanSum = document.querySelector ('[data-sum =' + product.id +']');
        spanSum.innerHTML = input.value * product.price + ' грн';
        productsInBasket[productId].cost = spanSum.innerHTML;
        console.log (productsInBasket[productId].cost);
    } else {
        productsInBasket[productId] = {quantity: +product.quantity, step: product.step, cost: product.price*product.quantity};
        addToBasket(product);
        spanEmptyBasket.classList.add ('basket-goods');
    }
    calcelateTotalCost()
    numberItemsInBasket()
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
    const spanSum = document.createElement ('span');    

    wrapCard.className = "basket-product_wrap";
    title.className = "product-title_basket";
    price.className = "product-price_basket";
    titleImage.className = "title-img_basket";
    titleImage.setAttribute ('alt', 'titl-image_basket')
    titleImage.setAttribute ('src', product.avatar);
    input.setAttribute ("data-id", product.id);
    spanSum.setAttribute ("data-sum", product.id);
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
    spanSum.className = "span-sum";


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
    sum.append (spanSum);
        
    title.innerHTML = product.title;
    price.innerHTML = 'Цена: '+ product.price + ' грн';
    spanPlus.innerHTML = "+";
    spanMinus.innerHTML = "-";
    input.value = product.quantity;
    spanWeight.innerHTML = "кг";
    sumTitle.innerHTML = "Сумма";
    quantityTitle.innerHTML = "Количество";
    spanSum.innerHTML = input.value * product.price +' грн';
    
    spanPlus.addEventListener ('click', function () {
        const nowValue = input.value;
        const newValue = parseFloat(nowValue) + product.step;
        const productId = product.id;
        input.value = newValue;
        product.quantity = newValue;
        console.log ('plus+++ '+nowValue);
        console.log ('plus--- '+newValue);
        console.log ('plus product '+product.quantity); 
        const newSum = product.price * input.value;
        spanSum.innerHTML = newSum + ' грн';
        productsInBasket[productId].quantity = newValue;
        productsInBasket[productId].cost = newSum;
        calcelateTotalCost ()
    });

    spanMinus.addEventListener ('click', function () {
        const nowValue = input.value;
        const newValue = parseFloat(nowValue) - product.step;
        const productId = product.id;
        console.log ('+++ '+nowValue);
        console.log ('--- '+newValue);
        console.log ('product '+product.quantity);
        if (nowValue === product.step) {
            input.value = newValue < product.quantity ? product.quantity : newValue;
        } else if (nowValue > product.step) {
            input.value = newValue < product.quantity ? newValue :product.quantity ;
        }
        console.log ('== '+input.value);
        const newSum = product.price * input.value;
        spanSum.innerHTML = newSum + ' грн';
        productsInBasket[productId].quantity = newValue;
        productsInBasket[productId].cost = newSum;
        console.log (productsInBasket);
        calcelateTotalCost ()
    });

    input.addEventListener ('change', function () {
        const productId = product.id;
        input.value = this.value;
        const newSum = product.price * input.value;
        spanSum.innerHTML = newSum + ' грн';
        productsInBasket[productId].quantity = +(this.value);
        productsInBasket[productId].cost = newSum;
        console.log (productsInBasket[productId].cost);
        calcelateTotalCost ()
    });

    buttonDel.addEventListener ('click', function(e) {
        const target = e.target;
        if (product.id) {
            basketProduct.removeChild (wrapCard);
            for (var key in productsInBasket) {
                if(product.id === key) {
                    delete productsInBasket[key]
                }    
            };
            console.log (productsInBasket);
        }
        if (isEmpty(productsInBasket) === true) {
            spanEmptyBasket.classList.toggle ('basket-goods');
        }
        calcelateTotalCost ()
        numberItemsInBasket()
    });

    basketProduct.append (wrapCard);
};

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true
}

module.exports = {productToBasket}