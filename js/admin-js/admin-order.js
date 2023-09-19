const API_ORDER = `${API_LINK}/order`;

let order = document.querySelector("#show-order");
async function showOrder() {
    let data = await getData(API_ORDER);
    data.forEach((element) => {
        order.innerHTML += `<tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.phone}</td>
        <td>${element.email}</td>
        <td>${element.request}</td>
        <td><a href="admin-detail-order.html?id=${element.id}">View</a></td>
        <td onclick='dele(${element.id})'>Delete</td>
    </tr>`;
    });
}
showOrder();

// delete--->

async function dele(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "aplication/json",
        },
    };
    let res = await fetch(`${API_ORDER}/${id}`, option);
    if (res.ok) {
        alert("true");
    } else {
        alert("false");
    }
}
