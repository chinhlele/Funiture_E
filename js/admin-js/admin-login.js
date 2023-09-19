let inputEmail = document.querySelector('input[name="email"]');
let inputPass = document.querySelector('input[name="pass"]');
let btn = document.querySelector(".c-btn-2");
let frameInput = document.querySelector("#s_frame");
let imgLogin = document.querySelector(".imgLogin");
const API_LINK = `https://funiture-e.onrender.com`;
async function getData(url) {
    let promise = await fetch(url);
    let data = await promise.json();
    return data;
}
let count = 0;
btn.addEventListener("click", async function () {
    let CHECK_USER = await getData(`${API_LINK}/user?email=${inputEmail.value}`);
    if (CHECK_USER.length > 0) {
        if (CHECK_USER[0].pass == inputPass.value) {
            if (CHECK_USER[0].permission == "admin") {
                window.location.href = "admin-infoWebs.html";
                let objLogin = {
                    name: CHECK_USER[0].name,
                    email: CHECK_USER[0].email,
                };
                localStorage.setItem("USER_LOGIN_ADMIN", JSON.stringify(objLogin));
            } else {
                alert("shut up");
            }
        } else {
            alert("Wrong Password");
            count++;
        }
    } else {
        alert("No have Account");
        count++;
    }
    if (count == 5) {
        frameInput.style.display = "none";
        imgLogin.style.display = "block";
        localStorage.setItem("REJECT_USER", 1);
    }
});
function checkReject() {
    let check = localStorage.getItem("REJECT_USER");
    if (check == 1) {
        frameInput.style.display = "none";
        imgLogin.style.display = "block";
    }
}
checkReject();
function unlockReject() {
    setTimeout(() => {
        localStorage.removeItem("REJECT_USER");
    }, 10000);
}
unlockReject();
