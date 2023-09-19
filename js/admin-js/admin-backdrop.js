const API_BACKDROP = `${API_LINK}/backdrop`;

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
    const objBackdrop = {
        img: uploadImage || imgSet.src,
    };

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objBackdrop),
    };
    let respon = await fetch(`${API_BACKDROP}`, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});

async function renderBackdrop() {
    let dataBackdrop = await getData(API_BACKDROP);

    let table = document.querySelector("table tbody");
    dataBackdrop.forEach((element) => {
        table.innerHTML += `<tr>
        <td>${element.id}</td>
        <td>
            <img
                src="${element.img}"
                alt="img"
            />
        </td>
        <td onclick="update(${element.id})">Fix</td>
        <td onclick="dele(${element.id})">Delete</td>
    </tr>`;
    });
}
renderBackdrop();

// delete--->

async function dele(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "aplication/json",
        },
    };
    let res = await fetch(`${API_BACKDROP}/${id}`, option);
    if (res.ok) {
        alert("true");
    } else {
        alert("false");
    }
}

// update--->
let updateBtn = document.querySelector("#update");
async function update(id) {
    btnAdd.style.display = "none";
    updateBtn.style.display = "block";

    updateBtn.setAttribute("data-id", id);

    let data = await getData(`${API_BACKDROP}/${id}`);
    imgSet.src = data.img;
}

updateBtn.addEventListener("click", async function () {
    let id = updateBtn.getAttribute("data-id");

    const objBackdrop = {
        img: uploadImage || imgSet.src,
    };

    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objBackdrop),
    };
    let respon = await fetch(`${API_BACKDROP}/${id}`, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});
