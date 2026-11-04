if (localStorage.getItem("gocxanh-cart") === null) {
    const demoCart = [
        {
            drink_id: 15,
            name: "Trà đào",
            size: "M",
            price: 25000,
            quantity: 2
        },
        {
            drink_id: 18,
            name: "Trà sữa",
            size: "L",
            price: 30000,
            quantity: 1
        }
    ];

    localStorage.setItem("gocxanh-cart", JSON.stringify(demoCart));
}

const savedCart = localStorage.getItem("gocxanh-cart");

const cart = JSON.parse(savedCart || "[]");

console.log("Giỏ hàng Checkout:", cart);
const orderItems = document.getElementById("order-items");
orderItems.textContent = "";
if (cart.length === 0) {
    orderItems.textContent = "Giỏ hàng đang trống. Vui lòng chọn đồ uống!";
}
let subtotal = 0;
cart.forEach(function(drink) {
    const item = document.createElement("p");
    item.classList.add("order-item");
    const itemTotal = drink.price * drink.quantity;
    subtotal += itemTotal;
const drinkName = drink.name || ("Mã đồ uống: " + drink.drink_id);
const drinkSize = drink.size ? " - Size " + drink.size : "";

const drinkInfo = document.createElement("span");
drinkInfo.textContent = drinkName + drinkSize + " - SL: " + drink.quantity;

const drinkPrice = document.createElement("span");
drinkPrice.textContent = itemTotal.toLocaleString("vi-VN") + "đ";

item.appendChild(drinkInfo);
item.appendChild(drinkPrice);

    orderItems.appendChild(item);
});
console.log("Tạm tính:", subtotal);
document.getElementById("subtotal").textContent =
    subtotal.toLocaleString("vi-VN");
    const deliveryFee = cart.length === 0 ? 0 : 10000;
const totalPrice = subtotal + deliveryFee;
document.getElementById("delivery-fee").textContent =
    deliveryFee.toLocaleString("vi-VN");

document.getElementById("total-price").textContent =
    totalPrice.toLocaleString("vi-VN");
const placeOrderButton = document.getElementById("place-order");
placeOrderButton.disabled = cart.length === 0;

placeOrderButton.addEventListener("click", function () {
    if (cart.length === 0) {
    alert("Giỏ hàng đang trống! Vui lòng chọn đồ uống.");
    return;
}
const recipientName = document.getElementById("recipient").value;
const phoneNumber = document.getElementById("phonenumber").value;
const address = document.getElementById("address").value;
document.getElementById("recipient-error").textContent = "";
document.getElementById("phonenumber-error").textContent = "";
document.getElementById("address-error").textContent = "";

    document.getElementById("recipient-error").textContent = "";

if (recipientName.trim() === "") {
    document.getElementById("recipient-error").textContent =
        "Vui lòng nhập tên người nhận!";
    return;
}

if (phoneNumber.trim() === "") {
    document.getElementById("phonenumber-error").textContent =
        "Vui lòng nhập số điện thoại!";
    return;
}
    if (address.trim() === "") {
    document.getElementById("address-error").textContent =
        "Vui lòng nhập địa chỉ giao hàng!";
    return;
}

const phoneRegex = /^0\d{9}$/;

if (!phoneRegex.test(phoneNumber.trim())) {
    document.getElementById("phonenumber-error").textContent =
        "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0!";
    return;
}
    alert("Tên người nhận: " + recipientName);
});
const phoneInput = document.getElementById("phonenumber");

phoneInput.addEventListener("input", function () {
    document.getElementById("phonenumber-error").textContent = "";
});
const recipientInput = document.getElementById("recipient");

recipientInput.addEventListener("input", function () {
    document.getElementById("recipient-error").textContent = "";
});
const addressInput = document.getElementById("address");

addressInput.addEventListener("input", function () {
    document.getElementById("address-error").textContent = "";
});