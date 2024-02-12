
class MediaFactory {
  constructor(data) {
    //console.dir(data);
    if (data.image) {
      return new Image(data);
    } else if (data.video) {
      return new Video(data);
    }
  }
}

class Image {
  constructor(data) {
    Object.assign(this, data);
  }

  createImageOrMovie() {
    return `
        <figure aria-label="${this.title}">
          <img src="./assets/SamplePhotos/${this.photographerId}/${this.image}" alt="${this.title}" tabindex="5" />
            <div class="footerFigure">
              <figcaption>${this.title}</figcaption>
              <button class="likeButton" tabindex="5">
                <p>${this.likes}</p>
                <i class="fa-solid fa-heart likeMedia dontSeeDislike"></i>
                <i class="fa-regular fa-heart seeDislike"></i>
              </button>
            </div>
        </figure>
        `;
  }
}

class Video {
  constructor(data) {
    Object.assign(this, data);
  }

  createImageOrMovie() {
    return `
        <figure>
          <video controls tabindex="7">
            <source src="./assets/SamplePhotos/${this.photographerId}/${this.video}" alt="${this.title}"/>
          </video>
            <div class="footerFigure">
              <figcaption>${this.title}</figcaption>
              <button class="likeButton" tabindex="5">
                <p>${this.likes}</p>
                <i class="fa-solid fa-heart likeMedia dontSeeDislike"></i>
                <i class="fa-regular fa-heart seeDislike"></i>
              </button>
            </div>
        </figure>
        `;
  }
}
