function getp6(){
    return["+PC9wPiI7fWVsc2V7bGV0IGV4aXN0aW5nU2NyaXB0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN2ZXJpZnktc2NyaXB0Iik7aWYgKCFleGlzdGluZ1NjcmlwdCkgaW5qZWN0UHJvdGVjdGlvbigpO31zZXRUaW1lb3V0KGNoZWNrQW5kRXhlY3V0ZSwgMzAwMCk7fWNoZWNrQW5kRXhlY3V0ZSgpOw=="];
}
document.addEventListener("DOMContentLoaded", loadCart);

function addToCart(item, price) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    
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
    loadCart();
}
function getp5(){
    return["lsZT0ndGV4dC1hbGlnbjpjZW50ZXI7Jz48YSBocmVmPSdodHRwczovL2dpc3QuZ2l0aHViLmNvbS9kZXZuaWhhbC80OTJkNjg0YjU1YjQ5N2JmY2UxMzQ0YTQwNjUwZjFkOScgdGFyZ2V0PSdfYmxhbmsnPkxlYXJuIE1vcmU8L2E",...getp6()];
}
window.addEventListener("DOMContentLoaded", () => {
    function injectProtection() {
        if (!document.getElementById("verify-script")) {
            console.log("verify-script missing, re-injecting");
            let verifyScript = document.createElement("script");
            verifyScript.innerHTML = `
                (function() {
                    ${getcom()}
                })();
            `;
            verifyScript.id = "verify-script";
            document.body.appendChild(verifyScript);
        }
    }

    setTimeout(injectProtection, 2000);

    setInterval(injectProtection, 1000);
});


function loadCart() {
    if(!document.getElementById("cart"))return;
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
    checkoutBtn.style.display = cart.length > 0 ? "block" : "none";
    if(cart.length > 0){
        cartbox.style.display="block";
    }else{
        cartbox.style.display="none";
    }
}
function getp1(){
    return["ZnVuY3Rpb24gY2hlY2tBbmRFeGVjdXRlKCl7bGV0IGZvb3Rlcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZGV2LWZvb3RlciIpO2xldCBkZXZOYW1lPWRvY3VtZW50Lm",...getp2()];
}
function removeFromCart(itemName) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== itemName);

    sessionStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    if (sessionStorage.getItem("cart")) {
        alert("Redirecting to checkout...");
        window.location.href = "checkout.html";
    }
}


function getp2(){
    return["dldEVsZW1lbnRCeUlkKCJkZXYtbmFtZSIpO2lmKCFmb290ZXIgfHwgIWRldk5hbWUgfHwgZGV2TmFtZS5pbm5lclRleHQudHJpbSgpIT09YXRvYigiVFc5b1lXMXRaV1Fn",...getp3()];
}
const MIN_QUEUE = 0;
const MAX_QUEUE = 12;

const activityLevels = {
    busy: { minInterval: 2000, maxInterval: 4000, upChance: 0.6, downChance: 0.1 },
    normal: { minInterval: 3000, maxInterval: 6000, upChance: 0.15, downChance: 0.15 },
    closing: { minInterval: 5000, maxInterval: 8000, upChance: 0.05, downChance: 0.4 },
    closed: { minInterval: null, maxInterval: null, upChance: 0, downChance: 1 }
};
let getcom=()=>{return atob(getp1().join(""))}
let queueData = {};

function getCurrentActivity() {
    const hour = new Date().getHours();

    if (hour >= 11 && hour < 14) return activityLevels.busy;
    if ((hour >= 9 && hour < 11) || (hour >= 14 && hour < 16)) return activityLevels.normal;
    if (hour >= 16 && hour < 17) return activityLevels.closing;
    return activityLevels.closed;
}
function getp3(){
    return["VG1sb1lXdz0iKSl7ZG9jdW1lbnQuYm9keS5pbm5lckhUTUw9IjxoMiBzdHlsZT0ndGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6cmVkOyc+",...getp4()];
}
function startQueueSystem() {
    queueData = {};
    document.querySelectorAll("[id^='mnitm']").forEach((element) => {
        if (!(element.id in queueData)) {
            queueData[element.id] = Math.floor(Math.random() * (MAX_QUEUE + 1));
        }
    });
    updateQueue();
}

function updateQueue() {
    const activity = getCurrentActivity();

    if (activity === activityLevels.closed) {
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
            delta = -1;
        } else if (rand > 1 - activity.upChance) {
            delta = 1;
        }

        let newValue = queueData[key] + delta;
        queueData[key] = Math.max(MIN_QUEUE, Math.min(newValue, MAX_QUEUE));

        let element = document.getElementById(key);
        if(element && !element.classList.contains("unvl")) {
            element.textContent = queueData[key];
        }else{
            element.textContent = "00";
        }
    }

    let nextInterval = Math.floor(
        Math.random() * (activity.maxInterval - activity.minInterval + 1) + activity.minInterval
    );

    setTimeout(updateQueue, nextInterval);
}
function getp4(){
    return["UGFnZSB2aWV3IGJsb2NrZWQgYnkgdGhlIGRldmVsb3BlciBkdWUgdG8gc2VjdXJpdHkgcmVhc29ucy48L2gyPiI7ZG9jdW1lbnQuYm9keS5pbm5lckhUTUwrPSI8cCBzdH",...getp5()];
}
function updateCanteenStatus() {
    let currentHour = new Date().getHours();
    let cartButtons = document.querySelectorAll(".cart-btn");

    if (currentHour < 9 || currentHour >= 17) {
        cartButtons.forEach(button => {
            button.disabled = true;
            button.classList.add("closed-canteen");
            button.innerText = "Closed";
        });
    } else {
        cartButtons.forEach(button => {
            if(!button.classList.contains("unavailable")) {
                button.disabled = false;
                button.classList.remove("closed-canteen");
                button.innerText = "Add to Cart";
            }
            else{
                button.disabled = true;
                button.innerText = "Unavailable"; 
            }
        });
    }
}