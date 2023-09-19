const API_INFO = `${API_LINK}/info`;

let infoBox = document.querySelector("#info");
async function renderContact() {
    let data = await getData(API_INFO);

    infoBox.innerHTML = `  <h3>LONDON OFFICE</h3>
    <p class="s_txt">E-mail: ${data[0].email}</p>
    <p class="s_txt">Telephone: ${data[0].phone}</p>
    <p class="s_txt">Addresse:${data[0].address}</p>`;
}
renderContact();
