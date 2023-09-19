let tab = document.querySelectorAll(".s-user .s_left ul li");
let frame = document.querySelectorAll(".s-user .s_right .s_frame");

tab.forEach((element) => {
    element.addEventListener("click", function () {
        tab.forEach((item) => {
            item.classList.remove("active");
        });
        element.classList.add("active");
        frame.forEach((data) => {
            if (element.getAttribute("data-item") == data.getAttribute("data-item")) {
                data.classList.add("active");
            } else {
                data.classList.remove("active");
            }
        });
    });
});

let userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
let infoUser = document.querySelector("#userInfo span");
let btnSignout = document.querySelector(".s_btn");

infoUser.innerHTML = userLogin.name;

btnSignout.addEventListener("click", function () {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "index.html";
});
let inputEmail = document.querySelector('input[name="email"]');
let inputPhone = document.querySelector('input[name="phone"]');
let inputPass = document.querySelector('input[name="pass"]');
let inputName = document.querySelector('input[name="fullname"]');
async function renderUserInfo() {
    const API_USER = `${API_LINK}/user?email=${userLogin.email}`;
    let data = await getData(API_USER);

    inputName.value = data[0].name;
    inputEmail.value = data[0].email;
    inputPhone.value = data[0].phone;
    inputPass.value = data[0].pass;
}
renderUserInfo();

let btnUpdate = document.querySelector(".c-btn-2");
btnUpdate.addEventListener("click", async function () {
    const API_USER = `${API_LINK}/user?email=${userLogin.email}`;
    let data = await getData(API_USER);

    const objInfo = {
        name: inputName.value,
        phone: inputPhone.value,
        email: inputEmail.value,
        pass: inputPass.value,
    };

    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objInfo),
    };
    let respon = await fetch(`${API_LINK}/user/${data[0].id}`, option);

    if (respon.ok) {
        alert("true");
        let objLogin = {
            name: inputName.value,
            email: inputEmail.value,
        };
        localStorage.setItem("USER_LOGIN", JSON.stringify(objLogin));
    } else {
        alert("false");
    }
});

async function renderOrder() {
    let CHECK_ORDER = await getData(`${API_LINK}/order?email=${userLogin.email}`);
    console.log(CHECK_ORDER);
    let order = document.querySelector("#order");
    CHECK_ORDER.forEach((element) => {
        let sum = 0;
        order.innerHTML += `<div class="s_order">
        <p class="s_time">${element.date}</p>
        <table>
            <thead>
                <tr>
                    <th>PRODUCT NAME</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>SUBTOTAL</th>
                </tr>
            </thead>
            <tbody>
            ${element.cart
                .map((order) => {
                    sum += order.quantity * order.discount;
                    return `<tr>
                <td>${order.title}</td>
                <td><span>$${order.discount}</span>.00</td>
                <td>${order.quantity}</td>
                <td><span>$${order.quantity * order.discount}</span>.00</td>
            </tr>
           
            `;
                })
                .join(" ")}
              
            </tbody>
        </table>
        <p style="text-align: right;">Total:$${sum}.00</p>
    </div>`;
    });
}
renderOrder();
