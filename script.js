// Change background image using an API
function changeBackground() {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.unsplash.com/photos/random?query=food&orientation=landscape&client_id=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const backgroundImage = `url("${data.urls.regular}")`;
        document.querySelector('.hero').style.backgroundImage = backgroundImage;
      })
      .catch(error => {
        console.error('Error fetching background image:', error);
      });
  }
  
  // Animate the headline text
  function animateHeadline() {
    const animatedText = document.querySelector('.animated-text');
    animatedText.classList.add('animate');
  }
  
  // Trigger functions on page load
  document.addEventListener('DOMContentLoaded', () => {
    changeBackground();
    animateHeadline();
  });
  


  // Get the add-to-cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Initialize an empty cart array
let cart = [];

// Add event listener to each add-to-cart button
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Add item to the cart
function addToCart(event) {
  const button = event.target;
  const menuItem = button.parentNode;
  const itemId = button.dataset.id;
  const itemName = menuItem.querySelector('.menu-item-title').textContent;
  const itemPrice = menuItem.querySelector('.menu-item-price').textContent;

  // Extract the numeric value from the item price
  const priceRegex = /\d+(\.\d{1,2})?/;
  const priceMatch = itemPrice.match(priceRegex);
  const itemPriceValue = priceMatch ? parseFloat(priceMatch[0]) : 0;

  // Check if item already exists in the cart
  const existingItem = cart.find(item => item.id === itemId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: itemId,
      name: itemName,
      price: itemPriceValue,
      quantity: 1
    });
  }

  // Update the cart UI
  updateCartUI();
}


// Update the cart UI
function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  // Clear the cart UI
  cartItems.innerHTML = '';

  // Update the cart items and total
  let total = 0;
  cart.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
      <button class="remove-from-cart" data-id="${item.id}">Remove</button>
    `;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Add event listener to each remove-from-cart button
  const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
  removeFromCartButtons.forEach(button => {
    button.addEventListener('click', removeFromCart);
  });
}

// Remove item from the cart
function removeFromCart(event) {
  const button = event.target;
  const itemId = button.dataset.id;

  // Find the index of the item in the cart
  const itemIndex = cart.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }

  // Update the cart UI
  updateCartUI();
}

// Handle checkout
const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', checkout);

function checkout() {
  // Perform checkout logic here
  // You can redirect to a payment page or perform any additional processing
  alert('Thank you for your order!');
  cart = [];
  updateCartUI();
}

