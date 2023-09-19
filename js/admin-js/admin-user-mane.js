const API_USER = `${API_LINK}/user`;
async function renderUser() {
    let data = await getData(API_USER);
    console.log(data);
    let userInput = document.querySelector("#user");

    data.forEach((element) => {
        userInput.innerHTML += `<tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.email}</td>
        <td>${element.phone}</td>
        <td><a href="admin-detail-user-mane.html?id=${element.id}">View</a></td>
        <td>Delete</td>
    </tr>`;
    });
}
renderUser();
