let url = new URL(window.location.href);
let id = url.searchParams.get("id");

const API_DETAIL_USER = `${API_LINK}/user/${id}`;

let nameInput = document.querySelector('input[name="fullname"]');
let phoneInput = document.querySelector('input[name="phone"]');
let passInput = document.querySelector('input[name="pass"]');
let emailInput = document.querySelector('input[name="email"]');
let select = document.querySelector("#per");
async function renderUser() {
    let data = await getData(API_DETAIL_USER);
    console.log(data);

    nameInput.value = data.name;
    phoneInput.value = data.phone;
    passInput.value = data.pass;
    emailInput.value = data.email;
    select.value = data.permission;
}
renderUser();

let btnSave = document.querySelector(".c-btn-1");
btnSave.addEventListener("click", async function () {
    const objUser = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        pass: passInput.value,
        permission: select.value,
    };

    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objUser),
    };
    let respon = await fetch(API_DETAIL_USER, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});
