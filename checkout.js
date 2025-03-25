document.addEventListener("DOMContentLoaded", loadCheckout);

function loadCheckout() {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let checkoutList = document.getElementById("checkout-list");
    let checkoutTotal = document.getElementById("checkout-total");

    checkoutList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.classList.add("cart-list-item");
        li.innerHTML = `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`;
        checkoutList.appendChild(li);
        total += item.price * item.quantity;
    });

    checkoutTotal.innerText = total;
}

// Handle Order Submission & Generate Bill
document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let total = document.getElementById("checkout-total").innerText;
    
    if (name === "" || roll === "") {
        alert("Please fill in all details.");
        return;
    }

    generateBill(name, roll, total);
});

// Function to Generate Bill using Canvas API
function generateBill(name, roll, total) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let OrderId = Date.now();
    canvas.width = 400;
    canvas.height = 350 + cart.length * 30;

    // Background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.fillText("Canteen Bill", 140, 30);
    ctx.font = "14px Arial";
    ctx.fillText(`Name: ${name}`, 20, 60);
    ctx.fillText(`Admission No: ${roll}`, 20, 90);
    ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 20, 110);
    ctx.fillText(`Order ID: #${OrderId}`, 20, 140);

    // Table Headers
    let y = 180;
    ctx.font = "14px Arial";
    ctx.fillText("Item", 20, y);
    ctx.fillText("Qty", 140, y);
    ctx.fillText("Price", 200, y);
    ctx.fillText("Total", 300, y);
    ctx.fillRect(20, y + 5, 340, 1); // Line under headers

    // Table Content
    y += 30;
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        ctx.fillText(`${item.name}`, 20, y);
        ctx.fillText(`x${item.quantity}`, 140, y);
        ctx.fillText(`₹${item.price}`, 200, y);
        ctx.fillText(`₹${itemTotal}`, 320, y); // Right-align total price
        y += 30;
    });

    // Grand Total on the Right Side
    ctx.fillRect(20, y - 10, 340, 1); // Line above total
    ctx.fillText(`Total:`, 20, y + 20);
    ctx.fillText(`₹${total}`, 320, y + 20); // Right-aligned total amount

    // Load and add logo without rotation (Rubber stamp style)
    let logo = new Image();
    logo.src = "images/logo.png";
    logo.onload = function () {
        let logoWidth = 180;
        let logoHeight = 50;
        let xPos = (canvas.width - logoWidth) / 2;
        let yPos = canvas.height - logoHeight - 20;
        ctx.globalAlpha = 0.25; // Slight opacity for a stamp effect
        ctx.drawImage(logo, xPos, yPos, logoWidth, logoHeight);
        ctx.globalAlpha = 1;

        // Convert to Image & Download
        let billImage = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.href = billImage;
        link.download = `Canteen_Bill_${OrderId}.png`;
        link.click();

        // Clear cart after download
        sessionStorage.removeItem("cart");
        alert("Order Placed! Bill downloaded.");
        window.location.href = "menu.html";
    };
}