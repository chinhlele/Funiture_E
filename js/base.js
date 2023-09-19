const API_LINK = `http://localhost:3000`;
const API_INFO = `${API_LINK}/info`;
let arrayCart = localStorage.getItem("LIST_CART") ? JSON.parse(localStorage.getItem("LIST_CART")) : [];
async function getData(url) {
    let promise = await fetch(url);
    let data = await promise.json();
    return data;
}
// scroll--->
window.addEventListener("scroll", function () {
    let header = document.querySelector(".c-header");
    let logo = this.document.querySelector(".c-header .c_logo");
    if (window.pageYOffset > 50) {
        header.classList.add("sticky");
        logo.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
        logo.classList.remove("sticky");
    }
});

// render header--->
let header = document.querySelector(".c-header");

async function renderHeader() {
    let userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
    header.innerHTML = ` <div class="c_top"></div>
<div class="c_bot">
    <div class="s_col">
        <div class="c_logo">
            <a href="index.html">
                <svg id="c_symbol" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29">
                    <path
                        class="c_symbol"
                        d="m30,29h-5.71c0-.39-.07-.77-.2-1.15-.11-.38-.31-.76-.57-1.15-.26-.39-.56-.83-.93-1.29-.37-.48-.8-1.01-1.29-1.58l-7.06-8.6h-3.62c-.07,1.84-.44,3.56-1.12,5.16-.76,1.79-1.77,3.33-3.06,4.65-1.3,1.3-2.79,2.33-4.5,3.08-.63.28-1.29.5-1.95.67v-.71c.27-.1.54-.21.8-.34,1.24-.57,2.33-1.46,3.26-2.65.91-1.18,1.64-2.65,2.17-4.41.46-1.58.73-3.4.76-5.45h-3.37v-.66h3.4v-.06c0-2.38-.29-4.47-.83-6.25-.56-1.78-1.32-3.25-2.29-4.43C2.95,2.68,1.82,1.81.5,1.23c-.17-.07-.33-.14-.5-.2V.22c.66.17,1.29.39,1.9.66,1.77.74,3.29,1.78,4.59,3.11,1.29,1.32,2.3,2.89,3.03,4.69.74,1.81,1.12,3.77,1.12,5.87h0s4.25.01,4.25.01c2.5,0,4.45-.63,5.85-1.86,1.42-1.23,2.12-3.01,2.12-5.32,0-1.28-.23-2.34-.69-3.21-.46-.86-1.06-1.54-1.83-2.06-.77-.52-1.66-.88-2.66-1.11-1.02-.22-2.09-.34-3.22-.34h-3.87v-.67h4.82c1.36,0,2.69.13,3.98.38,1.29.25,2.44.66,3.45,1.23,1.02.57,1.82,1.32,2.43,2.23.61.92.91,2.05.91,3.38,0,1.18-.23,2.21-.7,3.11-.47.91-1.1,1.68-1.9,2.34-.79.66-1.7,1.18-2.72,1.57-1.03.39-2.09.66-3.2.83l6.95,8.18c.43.48.91,1.02,1.46,1.64.56.63,1.1,1.23,1.65,1.82s1.03,1.09,1.44,1.53c.43.42.71.69.86.77h0Z"
                    />
                </svg>
            </a>
        </div>
        <div class="c_nav">
            <ul>
                <li class="xmark" onclick="closeXmark()"><i class="fa-thin fa-xmark"></i></li>
                <li><a href="index.html">HOME</a></li>
                <li>
                    <a href="product.html" onclick="shopNow()">SHOP <i class="fa-thin fa-chevron-down"></i></a>
                    <div class="c_menu-shop">
                        <div class="container">
                        </div>
                        <p class="xmark" onclick="closeXmark2()"><i class="fa-thin fa-xmark"></i></p>
                    </div>
                </li>
                <li><a href="about.html">ABOUT</a></li>
                <li><a href="contact.html">CONTACT</a></li>
            </ul>
            <div class="c_search">
                <a href="javascript:;"><i class="fa-thin fa-magnifying-glass"></i></a>
                <input type="text" />
            </div>
        </div>
    </div>
    <div class="c_icon">
        <a href="javascript:;" class="search"><i class="fa-thin fa-magnifying-glass"></i> <i class="fa-light fa-xmark"></i></a>
        ${userLogin ? `<a href="user.html">Hello ${userLogin.name}</a>` : `<a href="sign-in.html"><i class="fa-thin fa-user"></i></a>`}
        <a href="cart.html" class="c_cart">
        <i class="fa-thin fa-cart-shopping"></i>
        <p class="c_numberCart">1</p>
        </a>
        <div class="c_bar" onclick="bar()">
            <div class="c_line"></div>
        </div>
    </div>
</div>
<div class="c_info">
    <div class="c_col">
        <i class="fa-light fa-xmark" onclick="xMark()"></i>
        <div class="c_logo">
            <a href="javascript:;">
                <svg id="c_symbol" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29">
                    <path
                        class="c_symbol"
                        d="m30,29h-5.71c0-.39-.07-.77-.2-1.15-.11-.38-.31-.76-.57-1.15-.26-.39-.56-.83-.93-1.29-.37-.48-.8-1.01-1.29-1.58l-7.06-8.6h-3.62c-.07,1.84-.44,3.56-1.12,5.16-.76,1.79-1.77,3.33-3.06,4.65-1.3,1.3-2.79,2.33-4.5,3.08-.63.28-1.29.5-1.95.67v-.71c.27-.1.54-.21.8-.34,1.24-.57,2.33-1.46,3.26-2.65.91-1.18,1.64-2.65,2.17-4.41.46-1.58.73-3.4.76-5.45h-3.37v-.66h3.4v-.06c0-2.38-.29-4.47-.83-6.25-.56-1.78-1.32-3.25-2.29-4.43C2.95,2.68,1.82,1.81.5,1.23c-.17-.07-.33-.14-.5-.2V.22c.66.17,1.29.39,1.9.66,1.77.74,3.29,1.78,4.59,3.11,1.29,1.32,2.3,2.89,3.03,4.69.74,1.81,1.12,3.77,1.12,5.87h0s4.25.01,4.25.01c2.5,0,4.45-.63,5.85-1.86,1.42-1.23,2.12-3.01,2.12-5.32,0-1.28-.23-2.34-.69-3.21-.46-.86-1.06-1.54-1.83-2.06-.77-.52-1.66-.88-2.66-1.11-1.02-.22-2.09-.34-3.22-.34h-3.87v-.67h4.82c1.36,0,2.69.13,3.98.38,1.29.25,2.44.66,3.45,1.23,1.02.57,1.82,1.32,2.43,2.23.61.92.91,2.05.91,3.38,0,1.18-.23,2.21-.7,3.11-.47.91-1.1,1.68-1.9,2.34-.79.66-1.7,1.18-2.72,1.57-1.03.39-2.09.66-3.2.83l6.95,8.18c.43.48.91,1.02,1.46,1.64.56.63,1.1,1.23,1.65,1.82s1.03,1.09,1.44,1.53c.43.42.71.69.86.77h0Z"
                    />
                </svg>
            </a>
        </div>
        <p class="c_txt">
            We make interiors infused with the spirit of <br />
            contemporary design philosophies.
        </p>
        <a href="javascript:;">
            <p class="c_address">A: <span>Seestrasse 21, Zurich</span></p>
        </a>
        <a href="javascript:;">
            <p class="c_address">T: <span>00145288962</span></p>
        </a>
    </div>
    <div class="c_col">
        <ul>
            <li><a href="https://www.instagram.com" target="_blank">INSTAGRAM</a></li>
            <li><a href="https://www.facebook.com" target="_blank">FACEBOOK</a></li>
            <li><a href="https://www.linkedin.com" target="_blank">LINKEDIN</a></li>
        </ul>
    </div>
</div>`;

    const API_CATE = `${API_LINK}/cate`;

    let tabNav = document.querySelector(".c_menu-shop .container");
    let data = await getData(API_CATE);
    data.forEach((element) => {
        tabNav.innerHTML += `<div class="c-item">
        <div class="c_point">
            <a href="product.html?idcate=${element.title}">
                ${element.icon}
                <p class="c_txt">${element.title}</p>
            </a>
        </div>
    </div>`;
    });

    let inputSearch = document.querySelector(".c_search input");
    inputSearch.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            window.location.href = `product.html?keysearch=${inputSearch.value}`;
        }
    });

    let cartNumber = document.querySelector(".c_numberCart");
    cartNumber.innerHTML = arrayCart.length;
}
renderHeader();

// render footer--->
let footer = document.querySelector(".c-footer");

async function renderFooter() {
    let data = await getData(API_INFO);
    footer.innerHTML = `<div class="container">
<div class="row">
    <div class="c_col col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="c_item-1">
            <a href="javascript:;">
                <svg id="c_symbol" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29">
                    <path
                        class="c_symbol"
                        d="m30,29h-5.71c0-.39-.07-.77-.2-1.15-.11-.38-.31-.76-.57-1.15-.26-.39-.56-.83-.93-1.29-.37-.48-.8-1.01-1.29-1.58l-7.06-8.6h-3.62c-.07,1.84-.44,3.56-1.12,5.16-.76,1.79-1.77,3.33-3.06,4.65-1.3,1.3-2.79,2.33-4.5,3.08-.63.28-1.29.5-1.95.67v-.71c.27-.1.54-.21.8-.34,1.24-.57,2.33-1.46,3.26-2.65.91-1.18,1.64-2.65,2.17-4.41.46-1.58.73-3.4.76-5.45h-3.37v-.66h3.4v-.06c0-2.38-.29-4.47-.83-6.25-.56-1.78-1.32-3.25-2.29-4.43C2.95,2.68,1.82,1.81.5,1.23c-.17-.07-.33-.14-.5-.2V.22c.66.17,1.29.39,1.9.66,1.77.74,3.29,1.78,4.59,3.11,1.29,1.32,2.3,2.89,3.03,4.69.74,1.81,1.12,3.77,1.12,5.87h0s4.25.01,4.25.01c2.5,0,4.45-.63,5.85-1.86,1.42-1.23,2.12-3.01,2.12-5.32,0-1.28-.23-2.34-.69-3.21-.46-.86-1.06-1.54-1.83-2.06-.77-.52-1.66-.88-2.66-1.11-1.02-.22-2.09-.34-3.22-.34h-3.87v-.67h4.82c1.36,0,2.69.13,3.98.38,1.29.25,2.44.66,3.45,1.23,1.02.57,1.82,1.32,2.43,2.23.61.92.91,2.05.91,3.38,0,1.18-.23,2.21-.7,3.11-.47.91-1.1,1.68-1.9,2.34-.79.66-1.7,1.18-2.72,1.57-1.03.39-2.09.66-3.2.83l6.95,8.18c.43.48.91,1.02,1.46,1.64.56.63,1.1,1.23,1.65,1.82s1.03,1.09,1.44,1.53c.43.42.71.69.86.77h0Z"
                    />
                </svg>
            </a>
            <p class="c_txt">We make interiors infused with the spirit of contemporary design and minimalist philosophies.</p>
            <ul>
                <li><a href="${data[0].linkFb}" target="_blank">INSTAGRAM</a></li>
                <li><a href="${data[0].linkInsta}" target="_blank">FACEBOOK</a></li>
            </ul>
        </div>
    </div>
    <div class="c_col col-xl-2 col-lg-6 col-md-6 col-sm-12">
        <div class="c_item-2">
            <p class="c_title">DESIGNERS</p>
            <ul>
                <li><a href="javascript:;">Ivanacod</a></li>
                <li><a href="javascript:;">Miss Tome</a></li>
                <li><a href="javascript:;">Iva vap</a></li>
                <li><a href="javascript:;">Ach. France</a></li>
            </ul>
        </div>
    </div>
    <div class="c_col col-xl-2 col-lg-6 col-md-6 col-sm-12">
        <div class="c_item-2">
            <p class="c_title">MENU</p>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="product.html">Product</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
    </div>
    <div class="c_col col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="c_item-3">
            <p class="c_title">SUBCRIBE</p>
            <form>
                <input type="email" placeholder="E-mail" required />
                <p class="c_note">* Get all the latest offers & info</p>
                <button class="c-btn-2">
                    <span class="c_btn-1">SUBMIT</span>
                    <span class="c_btn-2">SUBMIT</span>
                </button>
            </form>
        </div>
    </div>
</div>
<p class="c_reserved">© 2023 Qode Interactive, All Rights Reserved</p>
</div>`;
}
renderFooter();

// popup header--->
let info = document.querySelector(".c-header .c_info");
let subNav = document.querySelector(".c_nav ul");
let subShop = document.querySelector(".c_menu-shop");

function bar() {
    info.classList.add("active");
    subNav.classList.add("run");
}

function closeXmark() {
    subNav.classList.remove("run");
}

function shopNow() {
    subShop.classList.add("active");
}

function closeXmark2() {
    subShop.classList.remove("active");
}

//hide popup header--->
function xMark() {
    info.classList.remove("active");
}

// // hide search--->
let search = document.querySelector(".c-header .c_icon .search");
let searchFrame = document.querySelector(".c-header .c_search");
let nav = document.querySelector(".c-header .c_nav ul");

search.addEventListener("click", function () {
    searchFrame.classList.toggle("active");
    nav.classList.toggle("active");
    search.classList.toggle("active");
});

// render product all pages--->
function renderListProduct(data, selector) {
    selector.innerHTML = "";
    data.forEach((element) => {
        selector.innerHTML += ` <div class="s_col col-xl-4 col-lg-6 col-md-6 col-sm-12" >
        <div class="c-card">
            <div class="c_thumb">
                <a href="detail-product.html?id=${element.id}"
                    ><img
                        src="${element.img}"
                        alt="img"
                /></a>
            </div>
            <div class="c_content">
                <a href="javascript:;">
                    <p class="c_name">${element.title}</p>
                </a>
                <p class="c_price">$${element.discount}.00</p>
            </div>
        </div>
    </div>`;
    });
}
