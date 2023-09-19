let cartProduct = document.querySelector("#show-cart");
let mainTotal = document.querySelector(".s_right .s_total span");
let subTotal = document.querySelector("#sub-total span");

let inputName = document.querySelector('input[name="fullname"]');
let inputPhone = document.querySelector('input[name="phone"]');
let inputAddress = document.querySelector('input[name="address"]');
let inputEmail = document.querySelector('input[name="email"]');
let inputRequest = document.querySelector('textarea[name="request"]');
let btnOrder = document.querySelector(".c-btn-2");

function showCart() {
    let sum = 0;
    arrayCart.forEach((element) => {
        cartProduct.innerHTML += `  <tr>
        <td>${element.title}<span> x${element.quantity}</span></td>
        <td>$<span>${element.discount}</span>.00</td>
    </tr>`;

        sum += element.discount * element.quantity;
    });
    subTotal.innerHTML = sum;
    mainTotal.innerHTML = sum + 54;
}
showCart();

btnOrder.addEventListener("click", async function (e) {
    const API_ORDER = `${API_LINK}/order`;
    let now = new Date();

    let objInfor = {
        name: inputName.value,
        phone: inputPhone.value,
        address: inputAddress.value,
        email: inputEmail.value,
        request: inputRequest.value,
        date: `${now.getHours()}:${now.getMinutes()} - ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
        cart: arrayCart,
    };

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objInfor),
    };
    if (inputName.value != "" && inputAddress.value != "" && inputEmail.value != "" && inputPhone.value != "") {
        let respon = await fetch(`${API_ORDER}`, option);

        if (respon.ok) {
            localStorage.removeItem("LIST_CART");
            sessionStorage.setItem("INFO_ORDER", JSON.stringify(objInfor));
            window.location.href = "success.html";
        } else {
            alert("false");
        }
    }
});
