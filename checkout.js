document.addEventListener("DOMContentLoaded", loadCheckout);

function loadCheckout() {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let checkoutList = document.getElementById("checkout-list");
    let checkoutTotal = document.getElementById("checkout-total");

    checkoutList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
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

    canvas.width = 400;
    canvas.height = 300 + cart.length * 30;

    // Background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.fillText("Canteen Bill", 140, 30);
    ctx.font = "14px Arial";
    ctx.fillText(`Name: ${name}`, 20, 60);
    ctx.fillText(`Roll No: ${roll}`, 20, 90);
    ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 20, 120);

    ctx.fillText("Items:", 20, 160);
    let y = 190;
    cart.forEach(item => {
        ctx.fillText(`${item.name} x${item.quantity} - ₹${item.price * item.quantity}`, 40, y);
        y += 30;
    });

    ctx.fillText(`Total: ₹${total}`, 20, y + 20);

    // Convert to Image & Download
    let billImage = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.href = billImage;
    link.download = "Canteen_Bill.png";
    link.click();

    // Clear cart after download
    sessionStorage.removeItem("cart");
    alert("Order Placed! Bill downloaded.");
    window.location.href = "menu.html";
}