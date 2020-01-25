const request = require('./services/request')

const basketCloseBtn = document.querySelector ('.window-close_button');
const basketHtml = document.querySelector ('.modal-window-close');
const basketIconHtml = document.querySelector ('.basket-icons');
const purchaseTotalCostHtml = document.getElementById ('purchase-total-cost');
const productsQuantityIndicatorHtml = document.querySelector ('.basket-quantity_number');
const tableHtml = document.getElementById('products-table');
const formHtml = document.querySelector('.form');
const inputEmail =document.querySelector ('#email');
const inputPhone = document.querySelector ('#phone');
const errorHtml = document.querySelector ('.error');

const PRODUCTS_IN_BASKET = { };
let PURCHASE_COST = 0;

const tablesColumnsDescriptor = [
    { displayName: '', name: 'avatar' },
    { displayName: 'Товар', name: 'title' },
    { displayName: 'Цена ( грн )', name: 'price' },
    { displayName: 'Количество ( кг )', name: 'quantity' },
    { displayName: 'Стоимость ( грн )', name: 'cost' },
    { displayName: '', name: 'removeButton' }
]

function calculateTotalCost () {
    let cost = 0;

    const keys = Object.keys (PRODUCTS_IN_BASKET);

    for (i = 0; i < keys.length; i++) {
        cost += parseFloat(PRODUCTS_IN_BASKET[keys[i]].cost);
    }

    PURCHASE_COST = cost;
    purchaseTotalCostHtml.innerText = cost;
}

function updateProductsQuantityIndicator () {
    const keys = Object.keys (PRODUCTS_IN_BASKET);

    productsQuantityIndicatorHtml.innerHTML = keys.length;
}

function calculateProductCost (product) {
    const costHtmlElement = document.querySelector(`[data-cost-for=${product.id}]`)
    const cost = Number(product.price) * Number(PRODUCTS_IN_BASKET[product.id].quantity)

    costHtmlElement.innerText = cost;
}

function increaseProductQuantity (product) {
    const quantityHtmlElement = document.querySelector(`[data-quantity-for=${product.id}]`)

    quantityHtmlElement.innerText = PRODUCTS_IN_BASKET[product.id].quantity;

    calculateProductCost(product)
}

function renderQuantityControl (parentNode, product) {
    const container = document.createElement('div');
    const value = document.createElement('span');
    const increaseQuantityBtn = document.createElement('button');
    const decreaseQuantityBtn = document.createElement('button');

    value.setAttribute('data-quantity-for', product.id)

    value.innerText = product.quantity;
    increaseQuantityBtn.innerText = "+";
    decreaseQuantityBtn.innerText = "-";
    increaseQuantityBtn.classList.add('product-quantity-btn');
    decreaseQuantityBtn.classList.add('product-quantity-btn');
    container.classList.add('quantity-control-container')

    increaseQuantityBtn.addEventListener('click', function () {
        const quantity = Number(value.innerText) + Number(product.step);

        value.innerText = quantity;
        PRODUCTS_IN_BASKET[product.id].quantity = quantity;
        PRODUCTS_IN_BASKET[product.id].cost = quantity * product.price;

        calculateProductCost(product);
        calculateTotalCost();
    })
    decreaseQuantityBtn.addEventListener('click', function () {
        const quantity = Number(value.innerText) > product.step 
            ? Number(value.innerText) - Number(product.step)
            : value.innerText;

        value.innerText = quantity;
        PRODUCTS_IN_BASKET[product.id].quantity = quantity;
        PRODUCTS_IN_BASKET[product.id].cost = quantity * product.price;

        calculateProductCost(product);
        calculateTotalCost();
    })

    container.appendChild(decreaseQuantityBtn);
    container.appendChild(value);
    container.appendChild(increaseQuantityBtn);
    parentNode.appendChild(container);
}

function renderTableHeader () {
    const tr = document.createElement('tr');

    tablesColumnsDescriptor.forEach((descriptor) => {
        const th = document.createElement('th')

        if (descriptor.name === 'avatar') { th.classList.add('img-cell') }

        th.innerText = descriptor.displayName;
        tr.appendChild(th);
    })

    tableHtml.appendChild(tr);
}

function renderRemoveProductBtn (parentNode, product) {
    const closeIconBtn = document.createElement('button');
    const icon = document.createElement('span');

    closeIconBtn.classList.add('window-close_button');
    icon.classList.add('button-span');

    closeIconBtn.addEventListener('click', function () {
        delete PRODUCTS_IN_BASKET[product.id];

        const rowToRemove = document.querySelector(`[data-product-row=${product.id}]`);

        rowToRemove.parentNode.removeChild(rowToRemove);

        if (!Object.keys(PRODUCTS_IN_BASKET).length) {
            hideBasketContent()
        }

        updateProductsQuantityIndicator();
        calculateTotalCost();
    })

    closeIconBtn.appendChild(icon);
    parentNode.appendChild(closeIconBtn);
}

function addProductToTable (product) {
    const tr = document.createElement('tr');

    tr.setAttribute('data-product-row', product.id);

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
                td.innerText = PRODUCTS_IN_BASKET[product.id] 
                    ? PRODUCTS_IN_BASKET[product.id].quantity * product.price
                    : product.quantity * product.price
                break;
            case 'avatar':
                td.innerHTML = `<img alt=${product.title} src=${product.avatar} />`
                td.classList.add('img-cell')
                // td.style = "width: 100px;"
                break;
        
            default:
                renderRemoveProductBtn(td, product)
                break;
        }

        tr.appendChild(td);
    })

    tableHtml.appendChild(tr)
}

function showBasketContent () {
    const itemsToShow = document.querySelectorAll('.hidden-without-products');
    const itemsToHide = document.querySelectorAll('.hidden-with-products');

    itemsToShow.forEach(function(item) { item.classList.remove('hidden') })
    itemsToHide.forEach(function(item) { item.classList.add('hidden') })
}

function hideBasketContent () {
    const itemsToShow = document.querySelectorAll('.hidden-with-products');
    const itemsToHide = document.querySelectorAll('.hidden-without-products');

    itemsToShow.forEach(function(item) { item.classList.remove('hidden') })
    itemsToHide.forEach(function(item) { item.classList.add('hidden') })
}

function productToBasket (product) {
    const productId = product.id;

    if (!Object.keys(PRODUCTS_IN_BASKET).length) {
        showBasketContent()
    } 
    
    if (PRODUCTS_IN_BASKET[productId]) {
        const quantity = +PRODUCTS_IN_BASKET[productId].quantity + +product.quantity;

        PRODUCTS_IN_BASKET[productId] = Object.assign({}, product, {
            cost: product.price * quantity,
            step: product.step,
            quantity,
        }) 
        increaseProductQuantity(product, product.quantity);
    } else {
        PRODUCTS_IN_BASKET[productId] = Object.assign({}, product, { 
            quantity: +product.quantity, 
            step: product.step, 
            cost: product.price * product.quantity 
        });
        addProductToTable(product)
    }

    calculateTotalCost()
    updateProductsQuantityIndicator()

}

basketCloseBtn.addEventListener ('click', function() {
    basketHtml.classList.toggle ('modal-window-close');
    basketHtml.classList.remove ('modal-window');
})

basketIconHtml.addEventListener ('click', function() {
    basketHtml.classList.toggle ('modal-window')
});

renderTableHeader()

function validateForm () {
    if (inputEmail.value === "" || inputPhone.value === "") {
        errorHtml.classList.remove ('hidden');

        inputEmail.value === "" && inputEmail.setAttribute ("style", "border: 1px solid red;");
        inputPhone.value === "" && inputPhone.setAttribute ("style", "border: 1px solid red;");
        
        return false;
    }

    return true;
}

function tryToHideErrorMessage () {
    if (!inputEmail.hasAttribute('style') && !inputPhone.hasAttribute('style')) {
        errorHtml.classList.add ('hidden');
    }

}

function delTextError (inputFieldHtml) {
    return function () {
        if (inputFieldHtml.hasAttribute('style')) {
           inputFieldHtml.removeAttribute('style');
        }

        tryToHideErrorMessage();
    }

}

formHtml.addEventListener('submit', function(e) {
    e.preventDefault();

    const elements = e.target.elements;
    const isFormDataValid = validateForm();
    const user = {}

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].value) {
            user[elements[i].name] = elements[i].value
        } 
    }

    if (isFormDataValid) {
        request.post('/api/products', {
            user,
            products: PRODUCTS_IN_BASKET,
            totalCost: PURCHASE_COST
        })
        .then((data) => {
            if (data.ok) {
                // TODO Show here your window with thanks for making shopping
            }
        })
        .catch((err) => {
            console.err(err);
            // TODO Handle case when something went wrong on server
        })
    } 
})

inputEmail.addEventListener ('focus', delTextError(inputEmail));
inputPhone.addEventListener ('focus', delTextError(inputPhone));

module.exports = { productToBasket }