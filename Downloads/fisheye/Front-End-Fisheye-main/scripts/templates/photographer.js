function photographerTemplate(data) {
    const { id, portrait, name, city, country, tagline, price } = data;

    const picture = `./assets/photographers/${portrait}`;

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
        article.appendChild(link);
        link.appendChild(container);
        container.appendChild(img);

        link.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(taglineId);
        article.appendChild(priceId);

        return (article);
    }
    return { id, picture, name, city, country, tagline, price, getUserCardDOM }
}

