const buttonBasketClose = document.querySelector ('.basket-close_button');
const basket = document.querySelector ('.basket-close');
const basketIcons = document.querySelector ('.basket-icons');
// const basketProduct = document.querySelector ('.basket-product');
// const basketWrap = document.querySelector ('.basket-wrap');
// const spanEmptyBasket = document.querySelector ('.empty-basket');
const spanCostSum = document.querySelector ('.order-cost_sum_number');
// const divBasketQuantity = document.querySelector ('.basket-quantity');
const spanBasketQuantity = document.querySelector ('.basket-quantity_number');
const tableContainer = document.getElementById('basket-table-container');
const table = document.createElement('table');

const productsInBasket = {};

const tablesColumnsDescriptor = [
    { displayName: '', name: 'avatar' },
    { displayName: 'Товар', name: 'title' },
    { displayName: 'Цена ( грн )', name: 'price' },
    { displayName: 'Количество ( кг )', name: 'quantity' },
    { displayName: 'Стоимость ( грн )', name: 'cost' }
]

// const tableColumnsNames = [' ', 'Goods', 'Price', 'Quantity', 'Cost']

function calculateTotalCost () {
    let sum = 0;

    const keys = Object.keys (productsInBasket);

    for (i=0; i<keys.length; i++) {
        sum+= parseFloat(productsInBasket[keys[i]].cost);
    }

    spanCostSum.innerHTML = sum + ' грн';
}

function calculateNumberItemsInBasket () {
    const keys = Object.keys (productsInBasket);

    spanBasketQuantity.innerHTML = keys.length;
}

function calculateProductCost (product) {
    const costHtmlElement = document.querySelector(`[data-cost-for=${product.id}]`)
    const cost = Number(product.price) * Number(productsInBasket[product.id].quantity)

    costHtmlElement.innerText = cost;
}

function addProductQuantity (product, quantity) { // TODO rename to increaseProductQuantity
    const quantityHtmlElement = document.querySelector(`[data-quantity-for=${product.id}]`)
    const newQuantity = Number(quantity) + Number(productsInBasket[product.id].quantity);

    quantityHtmlElement.innerText = newQuantity;

    calculateProductCost(product)
}

function renderQuantityControl (parentNode, product) {
    const value = document.createElement('span');
    const increaseQuantityBtn = document.createElement('button');
    const decreaseQuantityBtn = document.createElement('button');

    value.setAttribute('data-quantity-for', product.id)

    value.innerText = product.quantity;
    increaseQuantityBtn.innerText = "+"
    decreaseQuantityBtn.innerText = "-"

    increaseQuantityBtn.addEventListener('click', function () {
        const quantity = Number(value.innerText) + Number(product.step)

        value.innerText = quantity
        productsInBasket[product.id].quantity = quantity

        calculateProductCost(product)
    })
    decreaseQuantityBtn.addEventListener('click', function () {
        const quantity = Number(value.innerText) > product.step 
            ? Number(value.innerText) - Number(product.step)
            : value.innerText;

        value.innerText = quantity;
        productsInBasket[product.id].quantity = quantity;

        calculateProductCost(product);
    })

    parentNode.appendChild(decreaseQuantityBtn);
    parentNode.appendChild(value);
    parentNode.appendChild(increaseQuantityBtn);
}

function renderTable () {
    const tr = document.createElement('tr');

    tablesColumnsDescriptor.forEach((descriptor) => {
        const th = document.createElement('th')
        
        th.innerText = descriptor.displayName;
        table.appendChild(th);
    })

    table.appendChild(tr);
    tableContainer.appendChild(table);
}

function addProductToTable (product) {
    const tr = document.createElement('tr');

    tablesColumnsDescriptor.forEach((descriptor) => {
        const td = document.createElement('td');

        switch (descriptor.name) {
            case 'title':
                td.innerText = product.title
                break;
            case 'price':
                td.innerText = product.price
                break;
            case 'quantity':
                renderQuantityControl(td, product)
                break;
            case 'cost':
                td.setAttribute('data-cost-for', product.id)
                td.innerText = productsInBasket[product.id] 
                    ? productsInBasket[product.id].quantity * product.price
                    : product.quantity * product.price
                break;
        
            default:
                td.innerHTML = `<img style="width: 100%" alt=${product.title} src=${product.avatar} />`
                td.style = "width: 100px; height: 80px;"
                break;
        }

        tr.appendChild(td);
    })

    table.appendChild(tr)
}

function productToBasket (product) {
    const productId = product.id;

    if (!Object.keys(productsInBasket).length) {
        // TODO toggle "No products in basket yet" info
        renderTable()
    } 
    
    if (productsInBasket[productId]) {
        productsInBasket[productId].quantity = +productsInBasket[productId].quantity + +product.step;
        addProductQuantity(product, product.step);
        // const productQuantityInput = document.querySelector ('[data-id =' + product.id +']');
        // const productCost = document.querySelector ('[data-sum =' + product.id +']');

        // productQuantityInput.value = productsInBasket[productId].quantity;
        // productCost.innerHTML = productQuantityInput.value * product.price;
        // productsInBasket[productId].cost = productCost.innerHTML;
    } else {
        productsInBasket[productId] = { 
            quantity: +product.quantity, 
            step: product.step, 
            cost: product.price * product.quantity 
        };
        // addToBasket(product);
        addProductToTable(product)
        // spanEmptyBasket.classList.add ('basket-goods');
    }

    calculateTotalCost()
    // calculateNumberItemsInBasket()

}

buttonBasketClose.addEventListener ('click', function() {
    basket.classList.toggle ('basket-close');
    basket.classList.remove ('basket');
})

basketIcons.addEventListener ('click', function() {
    basket.classList.toggle ('basket')
});

function addToBasket (product) {
    const wrapCard = document.createElement('div');
    const title = document.createElement('h3');
    const price = document.createElement ('span');
    const titleImage = document.createElement('img');
    const input = document.createElement('input')
    const quantityWrap = document.createElement('div');
    const increaseProductQuantity = document.createElement('button');
    const decreaseProductQuantity = document.createElement('button');
    // const spanWeight = document.createElement('span');
    const divTitlePrice = document.createElement('div');
    const divTitlePriceImg = document.createElement ('div');
    const sum = document.createElement ('div');
    const sumTitle = document.createElement ('span');
    const quantityTitle = document.createElement ('span');
    const quantityWrapItem = document.createElement ('div');
    const buttonDel = document.createElement ('button');
    const spanDel = document.createElement ('span');
    const productCost = document.createElement ('span');    

    wrapCard.className = "basket-product_wrap";
    title.className = "product-title_basket";
    price.className = "product-price_basket";
    quantityWrap.className = "quantity-wrap";

    titleImage.className = "title-img_basket";
    titleImage.setAttribute ('alt', 'titl-image_basket')
    titleImage.setAttribute ('src', product.avatar);

    input.setAttribute ("data-id", product.id);
    input.className = "quantity";

    productCost.setAttribute ("data-sum", product.id);
    productCost.className = "product_cost";


    increaseProductQuantity.className = "plus-minus";
    decreaseProductQuantity.className = "plus-minus";
    // spanWeight.className = "weight";

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

    quantityWrapItem.append (decreaseProductQuantity);
    quantityWrapItem.append (input);
    // quantityWrapItem.append (spanWeight);
    quantityWrapItem.append (increaseProductQuantity);

    sum.append (sumTitle);
    sum.append (productCost);
        
    title.innerHTML = product.title;
    price.innerHTML = 'Цена: '+ product.price + ' грн';
    increaseProductQuantity.innerHTML = "+";
    decreaseProductQuantity.innerHTML = "-";
    input.value = product.quantity;
    // spanWeight.innerHTML = "кг";
    sumTitle.innerHTML = "Сумма";
    quantityTitle.innerHTML = "Количество";
    productCost.innerHTML = input.value * product.price;
    
    increaseProductQuantity.addEventListener ('click', function () {
        const nowValue = input.value;
        const newValue = parseFloat(nowValue) + product.step;
        const productId = product.id;
        const newSum = product.price * input.value;

        input.value = newValue;
        product.quantity = newValue;

        productCost.innerHTML = newSum;

        productsInBasket[productId].quantity = newValue;
        productsInBasket[productId].cost = newSum;

        calculateTotalCost ()
    });

    decreaseProductQuantity.addEventListener ('click', function () {
        const nowValue = input.value;
        const newValue = parseFloat(nowValue) - product.step;
        const productId = product.id;
       
        if (nowValue === product.step) {
            input.value = newValue < product.quantity ? product.quantity : newValue;
        } else if (nowValue > product.step) {
            input.value = newValue < product.quantity ? newValue :product.quantity ;
        }

  
        const newSum = product.price * input.value;

        productCost.innerHTML = newSum;
        productsInBasket[productId].quantity = newValue;
        productsInBasket[productId].cost = newSum;

        calculateTotalCost ()
    });

    input.addEventListener ('change', function () {
        const productId = product.id;
        const newSum = product.price * input.value;

        input.value = this.value;
        productCost.innerHTML = newSum;

        productsInBasket[productId].quantity = +(this.value);
        productsInBasket[productId].cost = newSum;

        calculateTotalCost ()
    });

    buttonDel.addEventListener ('click', function(e) {
        // const target = e.target;
        if (product.id) {
            // basketProduct.removeChild (wrapCard);

            for (var key in productsInBasket) {
                if(product.id === key) {
                    delete productsInBasket[key]
                }    
            };
        }

        if (isEmpty(productsInBasket) === true) {
            // spanEmptyBasket.classList.toggle ('basket-goods');
        }

        calculateTotalCost ()
        numberItemsInBasket()
    });

    // basketProduct.append (wrapCard);
};

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true
}

module.exports = {productToBasket}