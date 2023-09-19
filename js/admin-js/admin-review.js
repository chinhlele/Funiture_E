const API_REVIEW = `${API_LINK}/review`;

let inputTitle = document.querySelector('input[name="title"]');
let inputJob = document.querySelector('input[name="job"]');
let inputDes = document.querySelector('input[name="des"]');
let btnAdd = document.querySelector(".c-btn-1");

btnAdd.addEventListener("click", async function () {
    const objBanner = {
        name: inputTitle.value,
        des: inputDes.value,
        job: inputJob.value,
    };

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objBanner),
    };
    let respon = await fetch(`${API_REVIEW}`, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});

async function renderBanner() {
    let dataReview = await getData(API_REVIEW);

    let table = document.querySelector("table tbody");
    dataReview.forEach((element) => {
        table.innerHTML += `<tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.job}</td>
        <td>${element.des}</td>
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
    let res = await fetch(`${API_REVIEW}/${id}`, option);
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

    let data = await getData(`${API_REVIEW}/${id}`);
    inputTitle.value = data.name;
    inputDes.value = data.des;
    inputJob.value = data.job;
}

updateBtn.addEventListener("click", async function () {
    let id = updateBtn.getAttribute("data-id");

    const objBanner = {
        name: inputTitle.value,
        des: inputDes.value,
        job: inputJob.value,
    };

    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objBanner),
    };
    let respon = await fetch(`${API_REVIEW}/${id}`, option);

    if (respon.ok) {
        alert("true");
    } else {
        alert("false");
    }
});
