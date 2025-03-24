// Load Cart Items on Page Load
document.addEventListener("DOMContentLoaded", loadCart);

// Function to Add Item to Cart
function addToCart(item, price) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Check if item is already in cart, update quantity if exists
    let existingItem = cart.find(cartItem => cartItem.name === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: item, price: price, quantity: 1 });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Refresh cart UI
}

// Function to Load Cart
function loadCart() {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-list");
    let cartTotal = document.getElementById("cart-total");
    let checkoutBtn = document.getElementById("checkout-btn");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} x${item.quantity} - ₹${item.price * item.quantity} 
            <button onclick="removeFromCart('${item.name}')">Remove</button>`;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total;
    checkoutBtn.style.display = cart.length > 0 ? "block" : "none"; // Show checkout button if cart has items
}

// Function to Remove Item from Cart
function removeFromCart(itemName) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== itemName);

    sessionStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Refresh cart UI
}

// Function to Checkout
function checkout() {
    if (sessionStorage.getItem("cart")) {
        alert("Redirecting to checkout...");
        window.location.href = "checkout.html";
    }
}