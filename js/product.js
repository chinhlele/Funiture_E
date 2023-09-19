const API_MATERIAL = `${API_LINK}/material`;
const API_CATE = `${API_LINK}/cate`;
const limit = 9;
let page = 1;

// lay id tren url--->
let url = new URL(window.location.href);
let idCate = url.searchParams.get("idcate");
let keySearch = url.searchParams.get("keysearch");

// render--->

async function renderMaterial() {
    let material = document.querySelector(".s-products .s_material ul");
    let data = await getData(API_MATERIAL);
    data.forEach((element) => {
        material.innerHTML += `<li>${element.material}</li>`;
    });
    let listMaterial = document.querySelectorAll(".s-products .s_material ul li");
    listMaterial.forEach((element) => {
        element.addEventListener("click", async function () {
            const API_PRODUCT_MATERIAL = `${API_LINK}/product?material=${element.innerHTML}`;
            let dataProduct = await getData(API_PRODUCT_MATERIAL);
            renderListProduct(dataProduct, listProduct);
        });
    });
}
renderMaterial();

async function renderCate() {
    let cate = document.querySelector("#cate");
    let data = await getData(API_CATE);
    data.forEach((element) => {
        cate.innerHTML += `<li>${element.title}</li>`;
    });
    let listCate = document.querySelectorAll("#cate li");
    listCate.forEach((element) => {
        element.addEventListener("click", async function () {
            const API_PRODUCT_CATE = `${API_LINK}/product?cate=${element.innerHTML}`;
            let dataCate = await getData(API_PRODUCT_CATE);
            renderListProduct(dataCate, listProduct);
        });
    });
}
renderCate();

// render product---> filter by menu

let listProduct = document.querySelector("#listProduct");
async function listPr(page) {
    let API_PRODUCT;
    if (idCate) {
        API_PRODUCT = `${API_LINK}/product?cate=${idCate}`;
    } else if (keySearch) {
        API_PRODUCT = `${API_LINK}/product?title_like=${keySearch}`;
    } else {
        API_PRODUCT = `${API_LINK}/product?_page=${page}&_limit=${limit}`;
    }
    let dataProduct = await getData(API_PRODUCT);
    renderListProduct(dataProduct, listProduct);
}
listPr(page);

// làm số trang để chuyển trangt--->
async function listAllProduct() {
    let listNumber = document.querySelector("#list-number");

    const API_ALL_PRODUCT = `${API_LINK}/product`;
    let dataProduct = await getData(API_ALL_PRODUCT);

    let pageCount = Math.ceil(dataProduct.length / limit);
    for (let i = 1; i <= pageCount; i++) {
        listNumber.innerHTML += ` <li class="${i == 1 && "active"}">${i}</li>`;
    }

    let numberPages = document.querySelectorAll("#list-number li");
    numberPages.forEach((element) => {
        element.addEventListener("click", function () {
            numberPages.forEach((element) => {
                element.classList.remove("active");
            });
            element.classList.add("active");
            page = element.innerHTML;
            listPr(page);
            if (page == numberPages[numberPages.length - 1].innerHTML) {
                next.style.opacity = "0";
            } else {
                next.style.opacity = "1";
            }
        });
    });

    let prev = document.querySelector("#prev");
    let next = document.querySelector("#next");

    prev.addEventListener("click", function () {
        if (page > 1) {
            page--;
            listPr(page);
            numberPages.forEach((element) => {
                element.classList.remove("active");
            });
            numberPages[page - 1].classList.add("active");
            next.style.opacity = "1";
        }
    });
    next.addEventListener("click", function () {
        if (page < pageCount) {
            page++;
            listPr(page);
            numberPages.forEach((element) => {
                element.classList.remove("active");
            });
            numberPages[page - 1].classList.add("active");
        } else {
            next.style.opacity = "0";
        }
    });
}
listAllProduct();

// filter pricr--->
async function filterPrice() {
    let allPrice = document.querySelectorAll(".s_price ul li");

    const API_ALL_PRODUCT = `${API_LINK}/product`;
    let dataProduct = await getData(API_ALL_PRODUCT);

    allPrice.forEach((element) => {
        element.addEventListener("click", function () {
            let numberPages = document.querySelector(".s-products .s_number");
            numberPages.style.display = "none";

            let dataMin = element.getAttribute("data-Min");
            let dataMax = element.getAttribute("data-Max");
            let dataCheck = element.getAttribute("data-check");
            let dataFilterPrice = dataProduct.filter((item) => {
                if (dataCheck == "all") {
                    return item;
                } else if (dataCheck == "over") {
                    if (item.discount >= 1000) {
                        return item;
                    }
                } else if (item.discount >= parseFloat(dataMin) && item.discount <= parseFloat(dataMax)) {
                    return item;
                }
            });
            renderListProduct(dataFilterPrice, listProduct);
        });
    });
}
filterPrice();
