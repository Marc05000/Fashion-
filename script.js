document.addEventListener('DOMContentLoaded', function () {
  const cartButton = document.querySelector('.cart-button');
  const cartOverlay = document.querySelector('.cart-overlay');
  const cartContent = document.querySelector('.cart-content');
  const cartClearButton = document.createElement('button');

  const cartItems = [];
  let totalAmount = 0;

  cartButton.addEventListener('click', function () {
    if (cartItems.length === 0) {
      cartContent.innerHTML = '<p>Der Einkaufswagen ist leer.</p>';
    } else {
      cartContent.innerHTML = ''; // Clear the cart content

      cartItems.forEach(function (item, index) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.textContent = item.name + ' - ' + item.price.toFixed(2) + ' €';

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', function () {
          totalAmount -= item.price;
          cartItems.splice(index, 1);
          updateTotalDisplay();
          cartItem.remove();
        });

        cartItem.appendChild(removeButton);
        cartContent.appendChild(cartItem);
      });
      cartContent.appendChild(cartClearButton);
      updateTotalDisplay();
    }

    cartOverlay.style.display = 'block';
  });

  cartClearButton.className = 'clear-cart-button';
  cartClearButton.textContent = 'Warenkorb leeren';
  cartClearButton.addEventListener('click', function () {
    cartItems.length = 0;
    totalAmount = 0;
    cartContent.innerHTML = '<p>Der Einkaufswagen ist leer.</p>';
    updateTotalDisplay();
  });

  cartOverlay.addEventListener('click', function (event) {
    if (event.target === cartOverlay) {
      cartOverlay.style.display = 'none';
    }
  });

  const updateTotalDisplay = function () {
    const totalDisplay = document.createElement('div');
    totalDisplay.className = 'total-display';
    totalDisplay.textContent = 'Gesamtpreis: ' + totalAmount.toFixed(2) + ' €';

    if (cartContent.lastChild && cartContent.lastChild.className === 'total-display') {
      cartContent.lastChild.textContent = totalDisplay.textContent;
    } else {
      cartContent.appendChild(totalDisplay);
    }
  };

  // Hier fügen wir die Funktionalität zum Hinzufügen in den Warenkorb hinzu
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const productName = button.getAttribute('data-product-name');
      const productPrice = parseFloat(button.getAttribute('data-product-price'));

      cartItems.push({ name: productName, price: productPrice });
      totalAmount += productPrice;
      updateTotalDisplay();
    });
  });

  // Schaltflächen zum Umschalten zwischen Vorder- und Rückansicht
  const arrowButtons = document.querySelectorAll('.arrow');

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

  // Suchfunktion
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
});