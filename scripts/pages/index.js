/* Fonction asynchrone pour charger les données des photographes depuis un fichier JSON */
async function getData() {
    /* Effectue une requête pour récupérer les données et les convertit en format JSON */
    const data = await fetch("./data/photographers.json")
        .then((result) => result.json()) // Convertit la réponse en JSON
        .catch((error) => error); // Gère les erreurs éventuelles
    return data; // Retourne les données récupérées
}

/* Fonction asynchrone pour afficher les données des photographes sur la page */
async function displayData(photographers) {
    console.log(photographers); // Affiche les données des photographes dans la console
    /* Sélectionne la section HTML où les cartes des photographes seront affichées */
    const photographersSection = document.querySelector(".photographer_section");

    /* Parcourt chaque photographe et crée sa carte pour l'afficher sur la page */
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer); // Crée le modèle du photographe
        const userCardDOM = photographerModel.getUserCardDOM(); // Génère la carte HTML du photographe
        photographersSection.appendChild(userCardDOM); // Ajoute la carte à la section

        /* Ajoute un écouteur d'événements pour rediriger vers la page détaillée du photographe */
        userCardDOM.addEventListener("click", () => {
            window.location.href = `photographer.html?id=${photographer.id}`; // Redirection avec l'ID du photographe
        })
    });
}

/* Fonction principale pour initialiser la page */
async function init() {

    const { photographers } = await getData(); // Charge les données des photographes
    console.log(photographers); // Affiche les données dans la console
    displayData(photographers); // Affiche les données sur la page
}

init(); // Lance la fonction init lors du chargement du script
