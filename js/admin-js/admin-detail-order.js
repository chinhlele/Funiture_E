let url = new URL(window.location.href);
let idOrder = url.searchParams.get("id");

const API_ORDER = `${API_LINK}/order/${idOrder}`;

async function renderOrder() {
    let dataOrder = await getData(API_ORDER);
    let orderFiled = document.querySelector("#order");
    orderFiled.innerHTML = ` <ul>
   <li>Customer Name: <span>${dataOrder.name}</span></li>
   <li>Phone Number: <span>${dataOrder.phone}</span></li>
   <li>Email: <span>${dataOrder.email}</span></li>
   <li>Address: <span>${dataOrder.address}</span></li>
   <li>Date: <span>${dataOrder.date}</span></li>
</ul>`;
}
renderOrder();

async function renderCart() {
    let dataOrder = await getData(API_ORDER);

    let cart = document.querySelector("#cart");
    let mainTotal = document.querySelector(".main-total span");
    let request = document.querySelector("#customer-order");

    let sum = 0;
    dataOrder.cart.forEach((element) => {
        cart.innerHTML += `<tr>
        <td>${element.id}</td>
        <td>${element.title}</td>
        <td>${element.quantity}</td>
        <td>$<span>${element.discount}</span>.00</td>
    </tr>`;
        sum += element.discount * element.quantity;
    });
    mainTotal.innerHTML = sum + 54;
    request.innerHTML = dataOrder.request;
}
renderCart();
