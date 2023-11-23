document.addEventListener('DOMContentLoaded', function () {
  const arrowButtons = document.querySelectorAll('.arrow');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  // Alten Code beibehalten
  arrowButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const product = button.closest('.product');
      const isBackVisible = product.querySelector('.product-view-back').classList.contains('visible');

      if (isBackVisible) {
        product.querySelector('.product-view').classList.add('visible');
        product.querySelector('.product-view-back').classList.remove('visible');
        button.textContent = '→';
      } else {
        product.querySelector('.product-view').classList.remove('visible');
        product.querySelector('.product-view-back').classList.add('visible');
        button.textContent = '←';
      }
    });
  });

  document.getElementById('search-button').addEventListener('click', function () {
    searchProduct();
  });

  document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      searchProduct();
    }
  });

  function searchProduct() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(function (product) {
      const productName = product.querySelector('h3').textContent.toLowerCase();

      if (productName.includes(searchTerm)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  // Neuer Code für den Warenkorb
  const cartItems = {}; // Objekt, um die im Warenkorb befindlichen Artikel zu verfolgen

  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const productName = button.getAttribute('data-product-name');
      const productPrice = parseFloat(button.getAttribute('data-product-price'));

      // Überprüfen, ob das Produkt bereits im Warenkorb ist
      if (cartItems[productName]) {
        cartItems[productName].quantity += 1;
      } else {
        cartItems[productName] = {
          price: productPrice,
          quantity: 1,
        };

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <span>${productName} - Menge: ${cartItems[productName].quantity}</span>
          <span>Preis: ${cartItems[productName].price * cartItems[productName].quantity}€</span>
          <button class="remove-item" data-product-name="${productName}">X</button>
        `;
        document.getElementById('cart-items').appendChild(cartItem);
      }

      updateCartTotal();
    });
  });

  // Funktion zum Aktualisieren des Gesamtpreises des Warenkorbs
  function updateCartTotal() {
    let totalPrice = 0;
    for (const product in cartItems) {
      totalPrice += cartItems[product].price * cartItems[product].quantity;
    }
    document.getElementById('total-price').textContent = totalPrice.toFixed(2) + '€';
  }

  // Entfernen eines Artikels aus dem Warenkorb
  document.getElementById('cart-items').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-item')) {
      const productName = event.target.getAttribute('data-product-name');
      const itemToRemove = document.querySelector(`.cart-item span:first-of-type[innerText="${productName}"]`);

      delete cartItems[productName];
      document.getElementById('cart-items').removeChild(itemToRemove.parentElement);
      updateCartTotal();
    }
  });
});
