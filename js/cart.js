let cartProduct = document.querySelector("#cartProduct");
let total = document.querySelector(".s_total span");
let mainTotal = document.querySelector(".s-cart .s_price span");
function checkEmptyCart() {
    if (arrayCart.length == 0) {
        document.querySelector(".p-cart .s-cart .s_right").style.display = "none";
    }
}
checkEmptyCart();
function showCart() {
    let sum = 0;
    arrayCart.forEach((element) => {
        cartProduct.innerHTML += `<tr class="cartItem" data-id="${element.id}">
        <td>
            <img
                src="${element.img}"
                alt="img"
            />
        </td>
        <td>
            <p class="s_name">${element.title}</p>
        </td>
        <td><p class="s_price">$${element.discount}.00</p></td>
        <td>
            <div class="s_quantity">
                <i class="fa-thin fa-plus" onclick="changeCart(event,'Plus')"></i>
                <input type="text" value="${element.quantity}" disabled />
                <i class="fa-thin fa-minus" onclick="changeCart(event,'Minus')"></i>
            </div>
        </td>
        <td>
            <div class="s_frame">
                <p class="s_main-price" data-price="${element.discount}">$ <span>${element.discount * element.quantity}</span>.00</p>
                <i class="fa-thin fa-xmark" onclick="changeCart(event,'Dele')"></i>
            </div>
        </td>
    </tr>`;

        sum += element.discount * element.quantity;
    });
    total.innerHTML = sum;
    mainTotal.innerHTML = sum + 55;
}
showCart();
function changeCart(event, type) {
    let cartItem = event.target.closest(".cartItem");
    let quantityInput = cartItem.querySelector("input").value;
    let priceCore = cartItem.querySelector(".s_main-price").getAttribute("data-price");
    let productId = cartItem.getAttribute("data-id");
    let indexProduct = arrayCart.findIndex((item) => item.id == productId);

    if (type == "Dele") {
        cartItem.style.display = "none";
        arrayCart.splice(indexProduct, 1);
    } else {
        if (type == "Plus") {
            quantityInput++;
        } else if (type == "Minus") {
            if (quantityInput > 1) {
                quantityInput--;
            }
        }
        arrayCart[indexProduct].quantity = quantityInput;
        cartItem.querySelector("input").value = quantityInput;
        cartItem.querySelector(".s_main-price span").innerHTML = priceCore * quantityInput;
    }

    let sum = 0;
    arrayCart.forEach((element) => {
        sum += element.discount * element.quantity;
    });
    total.innerHTML = sum;
    mainTotal.innerHTML = sum + 55;

    localStorage.setItem("LIST_CART", JSON.stringify(arrayCart));
}
