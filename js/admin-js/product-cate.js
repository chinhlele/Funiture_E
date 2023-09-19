const API_CATE = `${API_LINK}/cate`;

let inputCate = document.querySelector('input[name="cate"]');
let inputIcon = document.querySelector('input[name="icon"]');
let btnAdd = document.querySelector(".c-btn-1");

btnAdd.addEventListener("click", async function () {
    const objCate = {
        title: inputCate.value,
        icon: inputIcon.value,
    };

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objCate),
    };
    let respon = await fetch(`${API_CATE}`, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});

async function renderCate() {
    let data = await getData(API_CATE);

    let table = document.querySelector("table tbody");
    data.forEach((element) => {
        table.innerHTML += `<tr>
        <td>${element.id}</td>
        <td>
        ${element.icon}
        </td>
        <td>${element.title}</td>
        <td onclick="update(${element.id})">Fix</td>
        <td onclick="dele(${element.id})">Delete</td>
    </tr>`;
    });
}
renderCate();

// delete--->

async function dele(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "aplication/json",
        },
    };
    let res = await fetch(`${API_CATE}/${id}`, option);
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

    let data = await getData(`${API_CATE}/${id}`);
    inputCate.value = data.title;
    inputIcon.value = data.icon;
}

updateBtn.addEventListener("click", async function () {
    let id = updateBtn.getAttribute("data-id");

    const objBanner = {
        title: inputCate.value,
        icon: inputIcon.value,
    };

    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objBanner),
    };
    let respon = await fetch(`${API_CATE}/${id}`, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});
