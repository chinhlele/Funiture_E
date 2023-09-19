let item = document.querySelectorAll(".s_description .s_item");

item.forEach((element) => {
    element.addEventListener("click", function () {
        item.forEach((ele) => {
            ele.classList.remove("active");
        });
        element.classList.toggle("active");
    });
});

let url = new URL(window.location.href);
let idProduct = url.searchParams.get("id");

const API_PRODUCT = `${API_LINK}/product/${idProduct}`;
async function renderDetailProduct() {
    let DATA_DETAIL_PRODUCT = await getData(API_PRODUCT);
    let detail = document.querySelector("#detail");
    console.log(DATA_DETAIL_PRODUCT);
    detail.innerHTML = `<div class="s_col col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <div class="s_thumb">
            <div class="s_main-img">
                <img src="${DATA_DETAIL_PRODUCT.img}" alt="img" />
            </div>
        </div>
    </div>
    <div class="s_col col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <div class="s_star">
            <p class="s_sku"># <span>${DATA_DETAIL_PRODUCT.id}</span></p>
            <ul>
                <li><i class="fa-solid fa-star"></i></li>
                <li><i class="fa-solid fa-star"></i></li>
                <li><i class="fa-solid fa-star"></i></li>
                <li><i class="fa-solid fa-star"></i></li>
                <li><i class="fa-solid fa-star"></i></li>
            </ul>
        </div>
        <h1>${DATA_DETAIL_PRODUCT.title}</h1>
        <div class="s_price">
            <div class="s_frame">
                <p class="s_name">Price</p>
                <p class="s_number">$30.00</p>
            </div>
            <div class="s_quantity">
                <i class="fa-thin fa-plus" onclick="changeQuantity('Plus')"></i>
                <input type="text" value="1" disabled />
                <i class="fa-thin fa-minus" onclick="changeQuantity('Minus')"></i>
            </div>
        </div>
        <div class="s_add">
            <button class="c-btn-2" onclick="addToCart()">
                <span class="c_btn-1">ADD TO CART</span>
                <span class="c_btn-2">ADD TO CART</span>
            </button>
        </div>
        <div class="s_description">
            <div class="s_item active">
                <div class="s_frame">
                    <div class="s_title">DESCRIPTION</div>            
                </div>
                <div class="s_txt">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.
                </div>
            </div>
        </div>
    </div>`;
}
renderDetailProduct();

// show related product--->

async function showRelatedProduct() {
    const data = await getData(API_PRODUCT);
    console.log(data);
    const API_RELATED = `${API_PRODUCT}/product?cate=${data.cate}`;
    const dataRelated = await getData(API_RELATED);
    console.log(dataRelated);
    let filterRelated = dataRelated.filter((item) => {
        if (item.id != idProduct) {
            return item;
        }
    });
    let listProductRelated = document.querySelector("#related");
    renderListProduct(filterRelated, listProductRelated);
}
showRelatedProduct();

// add to cart--->

async function addToCart() {
    let popup = document.querySelector(".s-detail_product .s_popup");
    popup.classList.add("active");
    setTimeout(() => {
        popup.classList.remove("active");
    }, 3000);

    let DATA_DETAIL_PRODUCT = await getData(API_PRODUCT);
    let quantity = document.querySelector(".s_quantity input").value;
    DATA_DETAIL_PRODUCT.quantity = quantity;
    let findIndex = arrayCart.findIndex((item) => item.id == DATA_DETAIL_PRODUCT.id);
    if (findIndex >= 0) {
        arrayCart[findIndex].quantity = quantity;
    } else {
        arrayCart.push(DATA_DETAIL_PRODUCT);
    }

    localStorage.setItem("LIST_CART", JSON.stringify(arrayCart));
    let cartNumber = document.querySelector(".c_numberCart");
    cartNumber.innerHTML = arrayCart.length;
}

function changeQuantity(type) {
    let quantity = document.querySelector(".s_quantity input").value;
    console.log(quantity);
    if (type == "Plus") {
        quantity++;
    } else if (type == "Minus") {
        if (quantity > 1) {
            quantity--;
        }
    }
    document.querySelector(".s_quantity input").value = quantity;
}
