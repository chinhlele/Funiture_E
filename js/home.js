// banner--->
const API_BANNER = `${API_LINK}/banner`;
async function renderBanner() {
    let data = await getData(API_BANNER);

    let listSlide = document.querySelector(".s-banner .container");
    let innerCircle = document.querySelector(".s_inner-circle");
    let title = document.querySelector(".s_title");
    title.innerHTML = `<span>1</span>/${data.length}`;
    data.forEach((element, index) => {
        innerCircle.innerHTML += `<div class="s_cir ${index == 0 && "active"}"></div>`;
        listSlide.innerHTML += `<div class="s_slide ${index == 0 && "active"}">
        <div class="s_thumb">
            <img src="${element.img}" alt="BG" />
        </div>
        <div class="s_content">
            <p class="s_sub-title">A Brand</p>
            <h1>${element.title}</h1>
            <p class="s_text">
                ${element.des}
            </p>
            <div class="s_price">
                <p class="s_price-1">$ ${element.market}</p>
                <p class="s_price-2">$ ${element.discount}</p>
            </div>
            <button class="c-btn-1">
                <span class="c_btn-1">FIND A TABLE</span>
                <span class="c_btn-2">FIND A TABLE</span>
            </button>
        </div>
    </div>`;
    });

    // slide--->

    let slide = document.querySelectorAll(".s-banner .s_slide");
    let arial = document.querySelectorAll(".s-banner .s_cir");
    let next = document.querySelector(".s-banner .fa-arrow-down");
    let prev = document.querySelector(".s-banner .fa-arrow-up");
    let numberSlide = document.querySelector(".s_title span");
    let currentIndex = 0;
    let prevIndex = 0;

    function displaySlide() {
        slide[currentIndex].classList.add("active");
        slide[prevIndex].classList.remove("active");
        arial[currentIndex].classList.add("active");
        arial[prevIndex].classList.remove("active");
        numberSlide.innerHTML = currentIndex + 1;
    }

    setInterval(() => {
        nextSlide();
    }, 7000);

    arial.forEach((element, index) => {
        element.addEventListener("click", function () {
            arial.forEach((element1) => {
                element1.classList.remove("active");
            });
            element.classList.add("active");

            slide.forEach((element2) => {
                element2.classList.remove("active");
            });
            slide[index].classList.add("active");
            numberSlide.innerHTML = index + 1;
        });
    });

    next.addEventListener("click", function () {
        nextSlide();
    });

    function nextSlide() {
        if (currentIndex < slide.length - 1) {
            currentIndex++;
            prevIndex = currentIndex - 1;
        } else {
            currentIndex = 0;
            prevIndex = slide.length - 1;
        }
        displaySlide();
    }

    prev.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            prevIndex = currentIndex + 1;
        } else {
            currentIndex = slide.length - 1;
            prevIndex = 0;
        }
        displaySlide();
    });
}
renderBanner();

// image--->

// cate--->
const API_CATE = `${API_LINK}/cate`;

async function renderCate() {
    let tab = document.querySelector(".s-tab .row");
    let data = await getData(API_CATE);
    data.forEach((element) => {
        tab.innerHTML += ` <div class="c-item col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="c_point">
            <a href="product.html?idcate=${element.title}">
                ${element.icon}
                <p class="c_txt">${element.title}</p>
            </a>
        </div>
    </div>`;
    });
}
renderCate();

// tab--->

async function renderTab() {
    let tab = document.querySelector(".s-product .s_col-2 ul");
    let dataCate = await getData(API_CATE);
    dataCate.forEach((element, index) => {
        tab.innerHTML += ` <li><a href="javascript:;" data-tab="${element.title}" class="${index == 0 && "active"}">${element.title}</a></li>
      `;
    });
    // product--->

    let card = document.querySelectorAll(".s-product .s_col-2 ul li a");
    let listProduct = document.querySelector("#list-tab");
    card.forEach((tab) => {
        tab.addEventListener("click", async function () {
            card.forEach((element) => {
                element.classList.remove("active");
            });
            tab.classList.add("active");
            const cateName = tab.getAttribute("data-tab");
            const API_PRODUCT = `${API_LINK}/product?cate=${cateName}`;
            let dataProduct = await getData(API_PRODUCT);
            renderListProduct(dataProduct, listProduct);
        });
    });
    const API_PRODUCT = `${API_LINK}/product?cate=${dataCate[0].title}`;
    let dataProduct = await getData(API_PRODUCT);
    renderListProduct(dataProduct, listProduct);
}
renderTab();

// slogan--->
const API_REVIEW = `${API_LINK}/review`;

async function renderReview() {
    let sloganList = document.querySelector(".s-slogan .s_bot .s_col");
    let dataReview = await getData(API_REVIEW);
    dataReview.forEach((element, index) => {
        sloganList.innerHTML += `<div class="s_item ${index == 0 && "active"}">
        <div class="s_des">
            "${element.des}”
        </div>
        <div class="s_author">
            <div class="s_left">
                <p class="s_name">${element.name}</p>
                <p class="s_work">${element.job}</p>
            </div>
        </div>
    </div>`;
    });

    // slogan click-->
    let slogan = document.querySelectorAll(".s_bot .s_item");
    let nextSlogan = document.querySelector(".s_bot .s_right .next");
    let prevSlogan = document.querySelector(".s_bot .s_right .prev");
    let counter = 0;

    nextSlogan.addEventListener("click", slideNext);
    function slideNext() {
        slogan[counter].style.animation = "next1 0.5s ease-in forwards";
        if (counter >= slogan.length - 1) {
            counter = 0;
        } else {
            counter++;
        }
        slogan[counter].style.animation = "next2 0.5s ease-in forwards";
    }
    prevSlogan.addEventListener("click", slidePrev);
    function slidePrev() {
        slogan[counter].style.animation = "prev1 0.5s ease-in forwards";
        if (counter == 0) {
            counter = slogan.length - 1;
        } else {
            counter--;
        }
        slogan[counter].style.animation = "prev2 0.5s ease-in forwards";
    }
}
renderReview();

// backdrop--->
const API_BACKDROP = `${API_LINK}/backdrop`;

async function renderBackdrop() {
    let dataBackdrop = await getData(API_BACKDROP);
    let desImg = document.querySelector(".s-des");
    dataBackdrop.forEach((element) => {
        desImg.style.backgroundImage = `url(${element.img})`;
    });
}
renderBackdrop();

// gallery--->

const API_GALLERY = `${API_LINK}/gallery?_page=1&_limit=4`;

async function renderGallery() {
    let dataGallery = await getData(API_GALLERY);
    let imgGallery = document.querySelector("#img-gallery ");
    dataGallery.forEach((element) => {
        imgGallery.innerHTML += ` <div class="s_thumb col-xl-3 col-lg-6 col-md-6 col-sm-12">
        <img src="${element.img}" alt="img" />
    </div>`;
    });
    let listImg = document.querySelectorAll(".s_img .s_thumb img");
    let img = document.querySelector(".s_popup .s_thumb img");
    let popup = document.querySelector(".s_popup");
    let frame = document.querySelector(".s_fame");
    let nextImg = document.querySelector(".fa-circle-arrow-right");
    let prevImg = document.querySelector(".fa-circle-arrow-left");
    let closeBtn = document.querySelector(".s_popup .s_txt");
    let currentImg = 0;

    function showGallery() {
        popup.classList.add("active");
        img.src = listImg[currentImg].src;
    }

    nextImg.addEventListener("click", nextGallery);
    function nextGallery() {
        if (currentImg < listImg.length - 1) {
            currentImg++;
        } else {
            currentImg = 0;
        }
        showGallery();
    }

    prevImg.addEventListener("click", prevGallery);
    function prevGallery() {
        if (currentImg > 0) {
            currentImg--;
        } else {
            currentImg = listImg.length - 1;
        }
        showGallery();
    }

    listImg.forEach((element, index) => {
        element.addEventListener("click", function () {
            currentImg = index;
            showGallery();
        });
    });

    closeBtn.addEventListener("click", function () {
        popup.classList.remove("active");
    });
}
renderGallery();
