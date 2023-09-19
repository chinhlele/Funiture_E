const API_INFO = `${API_LINK}/info`;

let inputAddress = document.querySelector('input[name="address"]');
let inputPhone = document.querySelector('input[name="phone"]');
let inputEmail = document.querySelector('input[name="email"]');
let inputFb = document.querySelector('input[name="facebook"]');
let inputInsta = document.querySelector('input[name="instagram"]');
let inputImg = document.querySelector('input[name="img"]');
let imgSet = document.querySelector(".c_thumb img");
let btnAdd = document.querySelector(".c-btn-1");

let uploadImage;
function handleFiles(files) {
    const reader = new FileReader();
    reader.onload = function () {
        uploadImage = reader.result;
        imgSet.src = uploadImage;
    };
    reader.readAsDataURL(files[0]);
}
inputImg.addEventListener(
    "change",
    function (e) {
        handleFiles(inputImg.files);
    },
    false
);

btnAdd.addEventListener("click", async function () {
    const objInfo = {
        address: inputAddress.value,
        phone: inputPhone.value,
        email: inputEmail.value,
        linkFb: inputFb.value,
        linkInsta: inputInsta.value,
        logo: uploadImage || imgSet.src,
    };
    console.log(objInfo);

    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objInfo),
    };
    let respon = await fetch(`${API_INFO}/1`, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});
async function renderInfo() {
    let data = await getData(API_INFO);
    imgSet.src = data[0].logo;
    inputAddress.value = data[0].address;
    inputPhone.value = data[0].phone;
    inputEmail.value = data[0].email;
    inputFb.value = data[0].linkFb;
    inputInsta.value = data[0].linkInsta;
}
renderInfo();
