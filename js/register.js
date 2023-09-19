let inputName = document.querySelector('input[name="fullname"]');
let inputPhone = document.querySelector('input[name="phone"]');
let inputEmail = document.querySelector('input[name="email"]');
let inputPass = document.querySelector('input[name="password"]');
let btn = document.querySelector(".c-btn-2");
const API_USER = `${API_LINK}/user`;
btn.addEventListener("click", async function () {
    const objUser = {
        name: inputName.value,
        phone: inputPhone.value,
        email: inputEmail.value,
        pass: inputPass.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objUser),
    };

    if (!inputEmail.value) {
        alert("empty");
    } else {
        let CHECK_USER = await getData(`${API_LINK}/user?email=${inputEmail.value}`);
        if (CHECK_USER.length > 0) {
            alert("Account already exists");
        } else {
            let respon = await fetch(`${API_USER}`, option);

            if (respon.ok) {
                alert("true");
                window.location.href = "sign-in.html";
            } else {
                alert("false");
            }
        }
    }
});
