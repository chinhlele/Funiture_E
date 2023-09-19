const API_LINK = `https://funiture-e.onrender.com`;
async function getData(url) {
    let promise = await fetch(url);
    let data = await promise.json();
    return data;
}
let userLogin = JSON.parse(localStorage.getItem("USER_LOGIN_ADMIN"));
function checkUrl() {
    if (!userLogin) {
        window.location.href = "index.html";
    }
}
checkUrl();
function showLogin() {
    let login = document.querySelector("#s_login");

    login.innerHTML = `<div class="s_sign-out" onclick="logout()"><i class="fa-thin fa-arrow-right-from-bracket"></i> Sign out</div>
    <div class="c_ava" id="c_ava">
        <p>Hello, ${userLogin.name}</p>
        <img src="https://cdn-icons-png.flaticon.com/512/552/552721.png" alt="img" />
    </div>`;
}
showLogin();

function logout() {
    localStorage.removeItem("USER_LOGIN_ADMIN");
    window.location.href = "index.html";
}

function renderDash() {
    let dashboard = document.querySelector("#dashboard");
    dashboard.innerHTML = `  <div class="c-dashboard">
<h3>Dash Board</h3>
<ul class="c_main">
    <li>
        <a href="admin-infoWebs.html"><i class="fa-solid fa-house"></i> Website information</a>
    </li>
    <li class="c_menu">
        <a href="javascript:;"
            ><i class="fa-brands fa-product-hunt"></i> Website Management <i class="fa-thin fa-chevron-up"></i
        ></a>
    </li>
    <ul class="c_sub">
        <li><a href="admin-product-cate.html">Product Category</a></li>
        <li><a href="admin-product.html">Product List</a></li>
        <li><a href="admin-product-material.html">Material</a></li>
        <li><a href="javascript:;">Colour</a></li>
    </ul>
    <li>
        <a href="admin-banner.html"><i class="fa-solid fa-image"></i> Banner Management</a>
    </li>
    <li>
        <a href="admin-review.html"><i class="fa-solid fa-pen-nib"></i> Review Management</a>
    </li>
    <li>
        <a href="admin-gallery.html"><i class="fa-brands fa-envira"></i> Gallery Management</a>
    </li>
    <li>
        <a href="admin-order.html"><i class="fa-solid fa-cart-arrow-down"></i> Order Management</a>
    </li>
    <li>
        <a href="admin-user-mane.html"><i class="fa-solid fa-user"></i> User Management</a>
    </li>
</ul>
</div>`;

    let menuSlide = document.querySelector(".c-dashboard .c_menu");
    let subSlide = document.querySelector(".c-dashboard .c_sub");

    menuSlide.addEventListener("click", function () {
        subSlide.classList.toggle("active");
        menuSlide.classList.toggle("active");
    });
}
renderDash();
