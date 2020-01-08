const PRODUCTS_URL = '/api/products'
const FAVICON_URL = '/favicon.ico'

const GET = 'GET'

const productsMock = [
    { avatar: 'img/title_img/5.png', title: 'СУДАК', description: 'Судак, как и окунь, предпочитает лишь чистую воду, насыщенную кислородом и способствующую нормальной жизнедеятельности рыбы', price: 'Цена: 280 грн', category: 'fish' },
    { avatar: 'img/title_img/5.png', title: 'БЕРШ', description: 'Берш, как и судак, считается родственником окуня.', price: 100, category: 'fish' },
    { avatar: 'img/title_img/5.png', title: 'ОКУНЬ', description: 'Окунь предпочитает водоемы с чистой водой. Это могут быть реки, пруды, озера, водохранилища и т.д. Окунь является самым часто встречающимся хищником, но его никогда не найдешь там, где вода мутная и грязная.', price: 630, category: 'fish' },
    { avatar: 'img/title_img/5.png', title: 'ГУСТЕРА', description: 'Это малоподвижный вид рыбы с голубовато-серым окрасом. Живет густера примерно 15 лет и врастает в длину до 35 см, при весе 1,2 кг. Густера, как и лещ, растет довольно медленно.', price: 12000, category: 'fish' },
    { avatar: 'img/title_img/5.png', title: 'САЗАН', description: 'Эта рыба отличается темно-желто-золотистым оттенком', price: 10, category: 'fish' },
    { avatar: 'img/title_img/5.png', title: 'Икра лемонемы', description: 'Очень вкусная икра в ястыке', price: 'Цена: 700 грн', category: 'caviar'},
    { avatar: 'img/title_img/5.png', title: 'Икра наваги', description: 'Очень вкусная икра в ястыке', price: 'Цена: 680 грн', category: 'caviar'},
    { avatar: 'img/title_img/5.png', title: 'Палочки горбуши', description: 'Суперовые палочки горбуши фасовка по 0,5кг', price: 'Цена: 560 грн', category: 'snacks'},
    { avatar: 'img/title_img/5.png', title: 'Икра лосося', description: 'Очень вкусная икра в ястыке', price: 'Цена: 750 грн', category: 'caviar'},
    { avatar: 'img/title_img/5.png', title: 'Икра лосося', description: 'Очень вкусная икра в ястыке', price: 'Цена: 750 грн', category: 'caviar'},
    { avatar: 'img/title_img/5.png', title: 'Рыбные палочки', description: 'Суперовые палочки горбуши фасовка по 0,5кг', price: 'Цена 490 грн', category: 'snacks'},
]
module.exports = {
  PRODUCTS_URL,
  FAVICON_URL,
  GET,
  productsMock
}