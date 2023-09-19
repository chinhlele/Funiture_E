let infoOder = JSON.parse(sessionStorage.getItem("INFO_ORDER"));
let infomation = document.querySelector(".s_info");
let item = document.querySelector("#s_item");
let subTotal = document.querySelector("#sub-total span");
let mainTotal = document.querySelector(".s_price span");

function showInfo() {
    infomation.innerHTML = `<tbody>
    <tr>
        <th>NAME</th>
        <td>${infoOder.name}</td>
    </tr>
    <tr>
        <th>EMAIL</th>
        <td>${infoOder.email}</td>
    </tr>
    <tr>
        <th>PHONE</th>
        <td>${infoOder.phone}</td>
    </tr>

    <tr>
        <th>ADDRESS</th>
        <td>${infoOder.address}</td>
    </tr>
</tbody>`;
}
showInfo();
function showCart() {
    let sum = 0;
    infoOder.cart.forEach((element) => {
        item.innerHTML += `<tr>
        <td>${element.title}</td>
        <td>${element.quantity}</td>
        <td>$<span>${element.discount}</span>.00</td>
        <td>$<span>${element.discount * element.quantity}</span>.00</td>
    </tr>`;
        sum += element.discount * element.quantity;
    });
    subTotal.innerHTML = sum;
    mainTotal.innerHTML = sum + 54;
}
showCart();
