const ejs =require('ejs');

const generateEmailContent = ({ name, data }) => {
  const template = templates[name]
  return ejs.render(template, { data })
}

const purchasingReceived = `
  <table
    cellpadding="0"
    cellspacing="0"
    width="100%"
  >
    <table
      align="center"
      cellpadding="0"
      cellspacing="0"

      bgcolor="#FFFFFF"
      style="
        border-collapse: separate;
        border-spacing: 10px 10px;
        box-shadow: 1px 1px 1px 1px #B8B8B8;
        font-family: Avenir, sans-serif;
        border: 1px solid black;
      "
    >
      <tr>
        <th style="border-bottom: 1px solid black;">Имя</th>
        <th style="border-bottom: 1px solid black;">Номер телефона</th>
        <th style="border-bottom: 1px solid black;">Почта</th>
        <th style="border-bottom: 1px solid black;">Стоимость (грн)</th>
        <th style="border-bottom: 1px solid black;">Дата заказа</th>
      </tr>
      <tr style="text-align: center;">
        <td><%= data.user.name %></td>
        <td><%= data.user.phone %></td>
        <td><%= data.user.email %></td>
        <td><%= data.totalCost %></td>
        <td><%= data.date %></td>
      </tr>
    </table>
    <table
      align="center"
      cellpadding="0"
      cellspacing="0"
      bgcolor="#FFFFFF"
      style="
        border-collapse: separate;
        border-spacing: 10px 10px;
        box-shadow: 1px 1px 1px 1px #B8B8B8;
        font-family: Avenir, sans-serif;
        border: 1px solid black;
      "
    >
      <caption><h3>Товары</h3></caption>
      <tr>
        <th style="border-bottom: 1px solid black;">Наименование</th>
        <th style="border-bottom: 1px solid black;">Цена (грн)</th>
        <th style="border-bottom: 1px solid black;">Количество (кг)</th>
        <th style="border-bottom: 1px solid black;">Стоимость (грн)</th>
      </tr>
      <% data.products.forEach(function(product) {%>
        <tr style="text-align: center;">
          <td><%= product.title %></td>
          <td><%= product.price %></td>
          <td><%= product.quantity %></td>
          <td><%= product.cost %></td>
        </tr>
      <% }); %>
    </table>
  </table>
`;

const templates = {
  purchasingReceived
}

module.exports = generateEmailContent;