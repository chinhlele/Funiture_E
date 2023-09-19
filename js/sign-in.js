let inputEmail = document.querySelector('input[name="email"]');
let inputPass = document.querySelector('input[name="password"]');
let btn = document.querySelector(".c-btn-2");

btn.addEventListener("click", async function () {
    let CHECK_USER = await getData(`${API_LINK}/user?email=${inputEmail.value}`);
    if (CHECK_USER.length > 0) {
        if (CHECK_USER[0].pass == inputPass.value) {
            window.location.href = "index.html";
            let objLogin = {
                name: CHECK_USER[0].name,
                email: CHECK_USER[0].email,
            };
            localStorage.setItem("USER_LOGIN", JSON.stringify(objLogin));
        } else {
            alert("Wrong Password");
            count++;
        }
    } else {
        alert("No have Account");
        count++;
    }
});
