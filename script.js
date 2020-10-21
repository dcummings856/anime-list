const newBtn = document.querySelector(".new-anime");
const form = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const animeList = document.querySelector(".anime-list");


let myLibrary = [];

function Anime(title, studio, watched) {
  this.title = title,
  this.studio = studio,
  this.watched = watched
};

let handleNewAnimeForm = (e) => {
  e.preventDefault();
  overlay.style.display = "none";
  const title = form.elements[0].value;
  const studio = form.elements[1].value;
  const watched = form.elements[2].checked;
  const anime = new Anime(title, studio, watched)
  addAnimeToLibrary(anime);
  updateLibrary();
};

let addAnimeToLibrary = (anime) => {
    myLibrary.push(anime);
};

let updateLibrary = () => {
  animeList.innerHTML = "";
  if (myLibrary.length === 0) {
    document.querySelector(".empty-list").style.display = "block";
  } else {
    document.querySelector(".empty-list").style.display = "none";
    myLibrary.forEach((item, index) => {
      let anime = document.createElement('div');
      anime.classList.add("card");
      anime.setAttribute("data-index", index);
      let watched;
      if (item.watched) {
        watched = 'checked';
      }
      anime.innerHTML = `<div class="anime-title">${item.title}</div>
      <div class="anime-studio">${item.studio}</div> 
      <div><input class="watched-toggle" type="checkbox" ${watched}>Watched</div>`
      animeList.appendChild(anime);

    })
  }
};

updateLibrary();

form.addEventListener('submit', handleNewAnimeForm)


newBtn.addEventListener('click', () => {
  overlay.style.display = "block";
})