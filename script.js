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
    let cartbox = document.querySelector(".cart-container");
    if(cartbox.style.display == "none") {
        cartbox.style.display="block";
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
    let cartbox = document.querySelector(".cart-container");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.classList.add("cart-list-item");
        li.innerHTML = `${item.name} x${item.quantity} - ₹${item.price * item.quantity} 
            <button class="removebtn" onclick="removeFromCart('${item.name}')">Remove</button>`;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total;
    checkoutBtn.style.display = cart.length > 0 ? "block" : "none"; // Show checkout button if cart has items
    if(cart.length > 0){
        cartbox.style.display="block";
    }else{
        cartbox.style.display="none";
    }
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



// Queue update settings
const MIN_QUEUE = 0;
const MAX_QUEUE = 12;

// Define different activity levels
const activityLevels = {
    busy: { minInterval: 2000, maxInterval: 4000, upChance: 0.6, downChance: 0.1 },
    normal: { minInterval: 3000, maxInterval: 6000, upChance: 0.15, downChance: 0.15 },
    closing: { minInterval: 5000, maxInterval: 8000, upChance: 0.05, downChance: 0.4 },
    closed: { minInterval: null, maxInterval: null, upChance: 0, downChance: 1 }
};

// Object to store queue counts
let queueData = {};

// Function to determine the current time-based activity level
function getCurrentActivity() {
    const hour = new Date().getHours();

    if (hour >= 11 && hour < 14) return activityLevels.busy; // Lunch Rush (11 AM - 2 PM)
    if ((hour >= 9 && hour < 11) || (hour >= 14 && hour < 16)) return activityLevels.normal; // Normal Time (9-11 AM, 2-4 PM)
    if (hour >= 16 && hour < 17) return activityLevels.closing; // Closing Time (4-5 PM)
    return activityLevels.closed; // Canteen Closed (After 5 PM)
}

// Function to initialize queue values and start updates
function startQueueSystem() {
    queueData = {};
    document.querySelectorAll("[id^='mnitm']").forEach((element) => {
        if (!(element.id in queueData)) {
            queueData[element.id] = Math.floor(Math.random() * (MAX_QUEUE + 1));
        }
    });
    updateQueue(); // Start updates
}

// Function to update the queue values
function updateQueue() {
    const activity = getCurrentActivity(); // Get current activity level

    if (activity === activityLevels.closed) {
        // Canteen is closed, set all queues to 0 and stop updates
        for (let key in queueData) {
            queueData[key] = 0;
            let element = document.getElementById(key);
            if (element) element.textContent = "0";
        }
        return;
    }

    for (let key in queueData) {
        let rand = Math.random();
        let delta = 0;

        if (rand < activity.downChance) {
            delta = -1; // Decrease queue
        } else if (rand > 1 - activity.upChance) {
            delta = 1; // Increase queue
        }

        let newValue = queueData[key] + delta;
        queueData[key] = Math.max(MIN_QUEUE, Math.min(newValue, MAX_QUEUE));

        let element = document.getElementById(key);
        if (element) {
            element.textContent = queueData[key];
        }
    }

    let nextInterval = Math.floor(
        Math.random() * (activity.maxInterval - activity.minInterval + 1) + activity.minInterval
    );

    setTimeout(updateQueue, nextInterval);
}

function updateCanteenStatus() {
    let currentHour = new Date().getHours();
    let cartButtons = document.querySelectorAll(".cart-btn");

    if (currentHour < 9 || currentHour >= 17) { // Before 9 AM or after 5 PM
        cartButtons.forEach(button => {
            button.disabled = true;
            button.classList.add("closed-canteen");
            button.innerText = "Closed";
        });
    } else {
        cartButtons.forEach(button => {
            button.disabled = false;
            button.classList.remove("closed-canteen");
            button.innerText = "Add to Cart";
        });
    }
}