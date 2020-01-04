const PRODUCTS_URL = '/api/products'
const FAVICON_URL = '/favicon.ico'

const GET = 'GET'

const productsMock = [
  { title: 'СУДАК', description: 'Судак, как и окунь, предпочитает лишь чистую воду, насыщенную кислородом и способствующую нормальной жизнедеятельности рыбы', price: 280, category: 'fish' },
  { title: 'БЕРШ', description: 'Берш, как и судак, считается родственником окуня.', price: 100, category: 'fish' },
  { title: 'ОКУНЬ', description: 'Окунь предпочитает водоемы с чистой водой. Это могут быть реки, пруды, озера, водохранилища и т.д. Окунь является самым часто встречающимся хищником, но его никогда не найдешь там, где вода мутная и грязная. Для ловли окуня применяют довольно-таки тонкие снасти. Его ловля очень интересна и занимательная.', price: 630, category: 'fish' },
  { title: 'ГУСТЕРА', description: 'Это малоподвижный вид рыбы с голубовато-серым окрасом. Живет густера примерно 15 лет и врастает в длину до 35 см, при весе 1,2 кг. Густера, как и лещ, растет довольно медленно.', price: 12000, category: 'fish' },
  { title: 'САЗАН', description: 'Эта рыба отличается темно-желто-золотистым оттенком', price: 10, category: 'fish' },
]

module.exports = {
  PRODUCTS_URL,
  FAVICON_URL,
  GET,
  productsMock
}