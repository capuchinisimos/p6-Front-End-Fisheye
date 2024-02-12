const photographerPageGallery = document.getElementById(
  "photographerPageGallery"
);// Sélection de la balise qui va contenir la galerie de photos sur la page du photographe

// Fonction asynchrone pour récupérer les données des photographes et des médias depuis un fichier JSON

async function getData() {
  try {
    // On attend que la requête fetch soit complétée et on transforme la réponse en JSON
    const data = await fetch("./data/photographers.json").then((result) => result.json());
    return data; // On retourne les données
  } catch (error) {
    // En cas d'erreur (par exemple, fichier non trouvé), on affiche l'erreur dans la console
    console.error(error);
    return error; // On retourne l'erreur
  }
}

// Fonction pour filtrer et trier les médias d'un photographe en fonction de l'option choisie
const filterOption = (mediaPhotographer, option) => {
  // Objet contenant les différentes fonctions de tri
  const sorters = {
    popularity: (a, b) => b.likes - a.likes, // Tri par popularité (nombre de likes)
    date: (a, b) => new Date(b.date) - new Date(a.date), // Tri par date
    title: (a, b) => a.title.localeCompare(b.title), // Tri par titre (ordre alphabétique)
  };

  // On utilise la fonction de tri correspondante à l'option choisie, ou popularity par défaut
  return mediaPhotographer.sort(sorters[option] || sorters.popularity);
};

// Fonction pour mettre à jour la galerie de médias sur la page du photographe
const updateGallery = (allMedia) => {
  // Pour chaque média, on crée un élément HTML et on l'ajoute à la galerie
  allMedia.forEach((media, index) => {
    media.index = index; // On ajoute un index au média pour pouvoir naviguer dans la lightbox
    let medias = new MediaFactory(media); // On crée un objet MediaFactory (non défini dans le code partagé)
    // console.dir(medias); // On affiche l'objet dans la console pour débogage
    photographerPageGallery.innerHTML += medias.createImageOrMovie(); // On ajoute le média à la galerie
  });
  likeMedia(); // On appelle la fonction pour gérer les likes sur les médias
};


// Fonction pour gérer les likes sur les médias
const likeMedia = () => {
  let likeSum = 0; // On initialise un compteur pour le total des likes
  const likeButtons = document.querySelectorAll(".likeButton"); // On sélectionne tous les boutons de like
  const likeCounter = document.querySelector(".LikeCounter"); // On sélectionne le compteur de likes total
  likeButtons.forEach((likeButton) => {
    const likeButtonStatic = parseInt(likeButton.firstElementChild.innerHTML); // On récupère le nombre de likes initial
    likeButton.addEventListener("click", () => {
      // Quand on clique sur un bouton de like
      likeButton.lastElementChild.classList.toggle("dontSeeDislike"); // On affiche/cache le cœur plein
      likeButton.querySelectorAll("i")[0].classList.toggle("dontSeeDislike"); // On affiche/cache le cœur vide
      let newLike = parseInt(likeButton.firstElementChild.innerHTML) + 1; // On incrémente le nombre de likes
      if (newLike > likeButtonStatic + 1) {
        // Si on a cliqué deux fois, on décrémente le nombre de likes
        newLike = parseInt(likeButton.firstElementChild.innerHTML) - 1;
        likeSum -= 1; // On décrémente le total des likes
      } else {
        likeSum += 1; // On incrémente le total des likes
      }
      likeButton.firstElementChild.innerHTML = newLike; // On met à jour le nombre de likes affiché
      likeCounter.innerHTML =
        likeSum +
        '<i class="fa-solid fa-heart" style="margin-right:100px"></i> 300$ / jour'; // On met à jour le total des likes
    });
    let NumberLike = parseInt(likeButton.innerText); // On récupère le nombre initial de likes
    likeSum += NumberLike; // On ajoute ce nombre au total des likes
    likeCounter.innerHTML =
      likeSum +
      '<i class="fa-solid fa-heart" style="margin-right:100px"></i> 300$ / jour'; // On met à jour le total des likes
  });
};







// Définition d'une classe pour créer des objets Photographe avec des méthodes pour générer du HTML
class PhotographerFactory {
  // Constructeur pour initialiser un objet Photographe avec des données fournies
  constructor(data) {
    Object.assign(this, data);
  }

  // Méthode pour générer la carte du photographe pour la page d'accueil
  getUserCardDOM() {
    return `
        <article class='photographer'>
            <a href="./photographer.html?id=${this.id}">
                <img class="PhotographerIndexPage" src="assets/photographers/${this.portrait}"/>
                <h2>${this.name}</h2>
            </a>
            <div class='détail'>
                <h4>${this.city}, ${this.country}</h4>
                <h5>${this.tagline}</h5>
                <h6>${this.price}€/jour</h6>
            </div>
        </article>
        `;
  }


  // Méthode pour générer l'en-tête de la page du photographe
  getHeaderPhotographer() {
    return `
    <div class="photographProfile_detail" tabindex="2">
    <h1 class="titlePhotographe">${this.name}</h1>
   <div class="photographerLocation" tabindex="3"> <p>${this.city}, ${this.country}</p></div>
    <p>${this.tagline}</p>
</div>
<button class="contact_button" id="contact_modal" tabindex="4">Contactez-moi</button>
<div class="photographProfile_img" tabindex="5">
    <img src='./assets/photographers/${this.portrait}' alt=""/>
</div>

 
        
   
    `;




  }

}

// Fonction pour initialiser la lightbox (galerie d'images en plein écran)
const lightbox = () => {
  console.log('lightbox');
  // Sélectionnez toutes les images et vidéos dans la galerie
  const medias = document.querySelectorAll(

    "#photographerPageGallery img, video"

  );
  console.dir(medias);
  const lightbox = document.querySelector("#lightbox");
  const lightboxMedia = document.querySelector("#lightboxMedia");
  const createImage = document.createElement("img");
  const titleMedia = document.createElement("h1");
  const createMovie = document.createElement("video");
  createMovie.setAttribute("controls", "controls");
  const arrowLeft = document.querySelector("#arrow-left");
  const arrowRight = document.querySelector("#arrow-right");
  const btnClose = document.querySelector(".close-button");
  const mediaLength = medias.length;
  medias.forEach((media) => {
    media.addEventListener("click", (e) => {
      let mediaIndex = 0;
      lightbox.classList.add("active");
      mediaIndex = [...medias].indexOf(media);
      if (media instanceof HTMLImageElement) {
        createImage.src = media.src;
        createImage.alt = media.alt;
        titleMedia.innerHTML = media.alt;
        lightboxMedia.appendChild(createImage);
        lightboxMedia.appendChild(titleMedia);
        createMovie.style.display = "none";
        createImage.style.display = "block";
      } else {
        createMovie.src = media.children[0].src;
        titleMedia.innerHTML = media.title;
        lightboxMedia.appendChild(createMovie);
        lightboxMedia.appendChild(titleMedia);
        createMovie.style.display = "block";
        createImage.style.display = "none";
      }
      lightbox.style.display = "flex";

      // clique fleche gauche
      arrowLeft.addEventListener("click", () => {
        mediaIndex--;
        if (mediaIndex < 0) {
          mediaIndex = medias.length - 1;
        }
        lightboxWithArrow(
          lightboxMedia,
          createImage,
          titleMedia,
          createMovie,
          mediaIndex,
          medias
        );
      });
      // clique fleche droite
      arrowRight.addEventListener("click", () => {
        mediaIndex++;
        if (mediaIndex > medias.length - 1) {
          mediaIndex = 0;
        }
        lightboxWithArrow(
          lightboxMedia,
          createImage,
          titleMedia,
          createMovie,
          mediaIndex,
          medias
        );
      });
      // clique close button
      btnClose.addEventListener("click", () => {
        if (e.target !== e.currentTarget) {
          createImage.remove();
          createMovie.remove();
          titleMedia.remove();
          return (lightbox.style.display = "none");
        }
      });
      document.addEventListener("keydown", (event) => {
        switch (event.code) {
          case "ArrowLeft":
            mediaIndex = (mediaIndex - 1 + mediaLength) % mediaLength;
            lightboxWithArrow(
              lightboxMedia,
              createImage,
              titleMedia,
              createMovie,
              mediaIndex,
              medias
            );
            break;
          case "ArrowRight":
            mediaIndex = (mediaIndex + 1) % mediaLength;
            lightboxWithArrow(
              lightboxMedia,
              createImage,
              titleMedia,
              createMovie,
              mediaIndex,
              medias
            );
            break;
          case "Escape":
            createImage.remove();
            createMovie.remove();
            titleMedia.remove();
            lightbox.style.display = "none";
            break;
        }
      });
    });
    media.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        let mediaIndex = 0;
        lightbox.classList.add("active");
        mediaIndex = [...medias].indexOf(media);
        if (media instanceof HTMLImageElement) {
          createImage.src = media.src;
          createImage.alt = media.alt;
          titleMedia.innerHTML = media.alt;
          lightboxMedia.appendChild(createImage);
          lightboxMedia.appendChild(titleMedia);
          createMovie.style.display = "none";
          createImage.style.display = "block";
        } else {
          createMovie.src = media.children[0].src;
          lightboxMedia.appendChild(createMovie);
          titleMedia.innerHTML = media.title;
          lightboxMedia.appendChild(titleMedia);
          createMovie.style.display = "block";
          createImage.style.display = "none";
        }
        lightbox.style.display = "flex";

        // clique fleche gauche
        arrowLeft.addEventListener("click", () => {
          mediaIndex--;
          if (mediaIndex < 0) {
            mediaIndex = medias.length - 1;
          }
          lightboxWithArrow(
            lightboxMedia,
            createImage,
            titleMedia,
            createMovie,
            mediaIndex,
            medias
          );
        });
        // clique fleche droite
        arrowRight.addEventListener("click", () => {
          mediaIndex++;
          if (mediaIndex > medias.length - 1) {
            mediaIndex = 0;
          }
          lightboxWithArrow(
            lightboxMedia,
            createImage,
            titleMedia,
            createMovie,
            mediaIndex,
            medias
          );
        });
        // clique close button
        btnClose.addEventListener("click", () => {
          if (e.target !== e.currentTarget) {
            createImage.remove();
            createMovie.remove();
            titleMedia.remove();
            return (lightbox.style.display = "none");
          }
        });
        document.addEventListener("keydown", (event) => {
          switch (event.code) {
            case "ArrowLeft":
              mediaIndex = (mediaIndex - 1 + mediaLength) % mediaLength;
              lightboxWithArrow(
                lightboxMedia,
                createImage,
                titleMedia,
                createMovie,
                mediaIndex,
                medias
              );
              break;
            case "ArrowRight":
              mediaIndex = (mediaIndex + 1) % mediaLength;
              lightboxWithArrow(
                lightboxMedia,
                createImage,
                titleMedia,
                createMovie,
                mediaIndex,
                medias
              );
              break;
            case "Escape":
              createImage.remove();
              createMovie.remove();
              titleMedia.remove();
              lightbox.style.display = "none";
              break;
          }
        });
      }
    });
  });
};
// Fonction pour gérer les interactions avec la lightbox lors de l'utilisation des flèches
const lightboxWithArrow = (
  lightboxMedia,
  image,
  title,
  movie,
  index,
  medias
) => {
  if (lightboxMedia.children[2] !== undefined) {
    lightboxMedia.children[2].remove();
    lightboxMedia.children[2].remove();
  }
  if (medias[index] instanceof HTMLImageElement) {
    image.src = medias[index].src;
    image.alt = medias[index].alt;
    title.innerHTML = medias[index].alt;
    lightboxMedia.appendChild(image);
    lightboxMedia.appendChild(title);
    title.innerHTML = medias[index].alt;
    movie.remove();
    image.style.display = "block";
  } else {
    movie.src = medias[index].children[0].src;
    title.innerHTML = medias[index].title;
    lightboxMedia.appendChild(movie);
    lightboxMedia.appendChild(title);
    image.remove();
    movie.style.display = "block";
  }
};


// Fonction principale pour initialiser la page
const init = async () => {

  // Récupération des données des photographes et des médias
  const { photographers, media } = await getData();// Sélection de l'élément HTML où les informations du photographe seront insérées

  const add = document.getElementById("photographProfile");
  // Récupération de l'identifiant du photographe depuis l'URL
  const id = document.location.search.split("=")[1];
  // Recherche du photographe correspondant à l'identifiant
  const searchPhotographer = photographers.filter(
    (photographer) => photographer.id == id
  );
  // Création d'un objet Photographe et insertion de l'en-tête dans la page
  const Photographer = new PhotographerFactory(searchPhotographer[0]);
  document.querySelector("#name_header").innerText = Photographer.name;
  const getHeaderPhotographer = Photographer.getHeaderPhotographer();
  add.innerHTML += getHeaderPhotographer;
  // faire une fonction pour appeller ceci
  const searchMediaPhotographer = media.filter(
    (picture) => picture.photographerId == id
  );
  // Recherche et affichage des médias du photographe
  updateGallery(searchMediaPhotographer);
  lightbox();
  // Gestion du tri des médias en fonction du choix de l'utilisateur
  document.addEventListener("change", (event) => {
    photographerPageGallery.innerHTML = "";
    let value_option = event.target.value;
    const sortedMedia = filterOption(searchMediaPhotographer, value_option);
    updateGallery(sortedMedia);
    lightbox();
  });
  // Initialisation de la modal de contact
  installDisplayModal();

};

// Appel de la fonction principale pour initialiser la page
init();
