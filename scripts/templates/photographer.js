/* Fonction pour créer le modèle d'un photographe */
function photographerTemplate(data) {
    const { id, portrait, name, city, country, tagline, price } = data;

    /* Chemin vers l'image du photographe */
    const picture = `./assets/photographers/${portrait}`;


    /* Fonction pour créer la carte HTML du photographe */
    function getUserCardDOM(photographer) {


        const article = document.createElement('article');


        const picture = `./assets/photographers/${portrait}`;
        const url = "photographer.html?id=" + id;
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", name);

        img.setAttribute("class", "p" + id);
        const container = document.createElement("div");
        container.setAttribute("class", "container");
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("aria-label", "acceder au profil du photographe");
        link.setAttribute("role", "lien");

        const h2 = document.createElement('h2');
        const h3 = document.createElement("h3");
        const taglineId = document.createElement("p");
        taglineId.setAttribute("class", "tagline");
        const priceId = document.createElement("p");
        priceId.setAttribute("class", "price");
        h2.textContent = name;
        h3.textContent = city + ", " + country;
        taglineId.textContent = tagline;
        priceId.textContent = price + "€/jour";


        /* Assemble la carte du photographe */
        article.appendChild(link);
        link.appendChild(container);
        container.appendChild(img);

        link.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(taglineId);
        article.appendChild(priceId);


        /* Retourne l'élément 'article' complet */
        return (article);
    }

    /* Retourne un objet contenant les données et la fonction pour générer la carte du photographe */
    return { id, picture, name, city, country, tagline, price, getUserCardDOM }
}

