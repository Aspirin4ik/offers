function loadSubcategories() {
  const categoryId = document.getElementById('categorySelect').value;
  fetch(`/api/subcategories?parent=${categoryId}`)
    .then(response => response.json())
    .then(data => {
      const subcatSelect = document.getElementById('subcategorySelect');
      subcatDesktop.innerHTML = '<option value="">Выберите подкатегорию</option>';
      data.forEach(subcat => {
        subcatSelect.innerHTML += `<option value="${subcat.id}">${subcat.pagetitle}</option>`;
      });
    });
}

function loadProducts() {
  const subcatId = document.getElementById('subcategorySelect').value;
  fetch(`/api/products?parent=${subcatId}`)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('productsContainer');
      container.innerHTML = '';
      data.forEach(product => {
        container.innerHTML += `
          <tr data-id="${product.id}">
            <td>${product.pagetitle}</td>
            <td>${product.price} руб.</td>
            <td><input type="number" value="1" min="1" oninput="updateRow(this)"></td>
            <td class="sum">${product.price}</td>
            <td><button onclick="removeRow(this)">×</button></td>
          </tr>`;
      });
    });
}

function addProductRow() {
  // Динамическое добавление пустой строки
  const container = document.getElementById('productsContainer');
  container.innerHTML += `
    <tr>
      <td><input type="text" placeholder="Поиск товара..." oninput="searchProduct(this)"></td>
      <td class="price">—</td>
      <td><input type="number" value="1" min="1" oninput="updateRow(this)"></td>
      <td class="sum">0</td>
      <td><button onclick="removeRow(this)">×</button></td>
    </tr>`;
}

function updateRow(input) {
  const row = input.closest('tr');
  const price = parseFloat(row.querySelector('.price').textContent);
  const qty = parseInt(input.value);
  const sum = price * qty;
  row.querySelector('.sum').textContent = sum;
  updateTotal();
}

function removeRow(button) {
  button.closest('tr').remove();
  updateTotal();
}

function updateTotal() {
  let total = 0;
  document.querySelectorAll('.sum').forEach(cell => {
    total += parseFloat(cell.textContent);
  });
  document.getElementById('totalSum').textContent = total;
}

function deleteCP(cpId) {
  if (confirm('Вы уверены, что хотите удалить это КП?')) {
    fetch(`delete-cp?id=${cpId}`)
      .then(response => {
        if (response.ok) {
          location.reload(); // Обновляем страницу
        } else {
          alert('Ошибка удаления');
        }
      })
      .catch(error => console.error('Ошибка:', error));
  }
}
