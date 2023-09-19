const API_MATERIAL = `${API_LINK}/material`;

let inputMaterial = document.querySelector('input[name="material"]');
let btnAdd = document.querySelector(".c-btn-1");

btnAdd.addEventListener("click", async function () {
    const objCate = {
        material: inputMaterial.value,
    };

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objCate),
    };
    let respon = await fetch(`${API_MATERIAL}`, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});

async function renderMaterial() {
    let data = await getData(API_MATERIAL);

    let table = document.querySelector("table tbody");
    data.forEach((element) => {
        table.innerHTML += `<tr>
        <td>${element.id}</td>
        <td>${element.material}</td>
        <td onclick="update(${element.id})">Fix</td>
        <td onclick="dele(${element.id})">Delete</td>
    </tr>`;
    });
}
renderMaterial();

// delete--->

async function dele(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "aplication/json",
        },
    };
    let res = await fetch(`${API_MATERIAL}/${id}`, option);
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

    let data = await getData(`${API_MATERIAL}/${id}`);
    inputMaterial.value = data.material;
}

updateBtn.addEventListener("click", async function () {
    let id = updateBtn.getAttribute("data-id");

    const objMaterial = {
        material: inputMaterial.value,
    };

    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objMaterial),
    };
    let respon = await fetch(`${API_MATERIAL}/${id}`, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});
