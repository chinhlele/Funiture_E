const API_GALLERY = `${API_LINK}/gallery`;

let inputTitle = document.querySelector('input[name="title"]');
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
    const objGallery = {
        title: inputTitle.value,
        img: uploadImage || imgSet.src,
    };
});

async function renderBanner() {
    let data = await getData(API_GALLERY);

    let table = document.querySelector("table tbody");
    data.forEach((element) => {
        table.innerHTML += `<tr>
        <td>${element.id}</td>
        <td>
            <img
                src="${element.img}"
                alt="img"
            />
        </td>
        <td>${element.title}</td>
        <td onclick="update(${element.id})">Fix</td>
        <td onclick="dele(${element.id})">Delete</td>
    </tr>`;
    });
}
renderBanner();

// delete--->

async function dele(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "aplication/json",
        },
    };
    let res = await fetch(`${API_GALLERY}/${id}`, option);
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

    let data = await getData(`${API_GALLERY}/${id}`);
    inputTitle.value = data.title;
    imgSet.src = data.img;
}

updateBtn.addEventListener("click", async function () {
    let id = updateBtn.getAttribute("data-id");

    const objGallery = {
        title: inputTitle.value,
        img: uploadImage || imgSet.src,
    };

    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objGallery),
    };
    let respon = await fetch(`${API_GALLERY}/${id}`, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});
