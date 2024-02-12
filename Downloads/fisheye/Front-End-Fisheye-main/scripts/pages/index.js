
async function getData() {
    const data = await fetch("./data/photographers.json")
        .then((result) => result.json())
        .catch((error) => error);
    return data;
}

async function displayData(photographers) {
    console.log(photographers);
    const photographersSection = document.querySelector(".photographer_section");


    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
        userCardDOM.addEventListener("click", () => {
            //redige vers la page detaillé en utilisant id
            window.location.href = `photographer.html?id=${photographer.id}`;
        })
    });
}


async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getData();
    console.log(photographers);
    displayData(photographers);
}

init();

