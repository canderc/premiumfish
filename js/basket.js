const basketCloseBtn = document.querySelector ('.basket-close_button');
const basketHtml = document.querySelector ('.basket-close');
const basketIconHtml = document.querySelector ('.basket-icons');
// const basketProduct = document.querySelector ('.basket-product');
// const basketWrap = document.querySelector ('.basket-wrap');
// const spanEmptyBasket = document.querySelector ('.empty-basket');
const purchaseTotalCostHtml = document.getElementById ('purchase-total-cost');
// const spanCostSum = document.querySelector ('.order-cost_sum_number');
// const divBasketQuantity = document.querySelector ('.basket-quantity');
const productsQuantityIndicatorHtml = document.querySelector ('.basket-quantity_number');
const tableContainerHtml = document.getElementById('basket-table-container');
const tableHtml = document.getElementById('products-table');

const PRODUCTS_IN_BASKET = {};

const tablesColumnsDescriptor = [
    { displayName: '', name: 'avatar' },
    { displayName: 'Товар', name: 'title' },
    { displayName: 'Цена ( грн )', name: 'price' },
    { displayName: 'Количество ( кг )', name: 'quantity' },
    { displayName: 'Стоимость ( грн )', name: 'cost' },
    { displayName: '', name: 'removeButton' }
]

// const tableColumnsNames = [' ', 'Goods', 'Price', 'Quantity', 'Cost']

function calculateTotalCost () {
    let cost = 0;

    const keys = Object.keys (PRODUCTS_IN_BASKET);

    for (i = 0; i < keys.length; i++) {
        cost += parseFloat(PRODUCTS_IN_BASKET[keys[i]].cost);
    }

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

function increaseProductQuantity (product, quantity) { // TODO rename to increaseProductQuantity
    const quantityHtmlElement = document.querySelector(`[data-quantity-for=${product.id}]`)
    const newQuantity = Number(quantity) + Number(PRODUCTS_IN_BASKET[product.id].quantity);

    quantityHtmlElement.innerText = newQuantity;

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
        
        th.innerText = descriptor.displayName;
        tr.appendChild(th);
    })

    tableHtml.appendChild(tr);
}

function renderRemoveProductBtn (parentNode, product) {
    const closeIconBtn = document.createElement('button');
    const icon = document.createElement('span');

    closeIconBtn.classList.add('basket-close_button');
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
    tr.style = "height: 80px;"

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
                td.innerHTML = `<img style="width: 100%" alt=${product.title} src=${product.avatar} />`
                td.style = "width: 100px;"
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
        // TODO toggle "No products in basket yet" info
        // renderTableHeader()
        showBasketContent()
    } 
    
    if (PRODUCTS_IN_BASKET[productId]) {
        const quantity = +PRODUCTS_IN_BASKET[productId].quantity + +product.quantity;

        PRODUCTS_IN_BASKET[productId] = {
            cost: product.price * quantity,
            step: product.step,
            quantity,
        }
        increaseProductQuantity(product, product.quantity);
    } else {
        PRODUCTS_IN_BASKET[productId] = { 
            quantity: +product.quantity, 
            step: product.step, 
            cost: product.price * product.quantity 
        };
        addProductToTable(product)
    }

    calculateTotalCost()
    updateProductsQuantityIndicator()

}

basketCloseBtn.addEventListener ('click', function() {
    basketHtml.classList.toggle ('basket-close');
    basketHtml.classList.remove ('basket');
})

basketIconHtml.addEventListener ('click', function() {
    basketHtml.classList.toggle ('basket')
});

renderTableHeader()

module.exports = {productToBasket}