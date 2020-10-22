const newBtn = document.querySelector(".new-anime");
const form = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const animeList = document.querySelector(".anime-list");
const cancelBtn = document.querySelector(".cancel-btn");


let myLibrary = [];

function Anime(title, genre, rating, watched) {
  this.title = title,
  this.genre = genre,
  this.rating = rating,
  this.watched = watched
};

let handleNewAnimeForm = (e) => {
  e.preventDefault();
  overlay.style.display = "none";
  const title = form.elements[0].value;
  const genre = form.elements[1].value;
  const rating = form.elements[2].value;
  const watched = form.elements[3].checked;
  const anime = new Anime(title, genre, rating, watched)
  addAnimeToLibrary(anime);
  updateLibrary();
};

let addAnimeToLibrary = (anime) => {
    myLibrary.push(anime);
};

let handleRemoveAnime = () => {
  const removeBtns = document.querySelectorAll(".remove");
  removeBtns.forEach(button => {
    button.addEventListener('click', removeAnime)
  })
};

let removeAnime = (e) => {
  let item = e.target.parentNode.getAttribute("data-index");
  myLibrary.splice(item, 1);
  updateLibrary();
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
      anime.innerHTML = `<div class="anime-title"><div class="list-name">Title: </div>${item.title}</div>
      <div class="anime-genre"><div class="list-name">Genre: </div>${item.genre}</div>
      <div class="anime-rating"><div class="list-name">Rating: </div>${item.rating}</div>
      <div class="list-name"><input class="watched-toggle" type="checkbox" ${watched}>Watched</div>
      <a title="Remove Anime" class="remove">X</a> `
      animeList.appendChild(anime);

      handleRemoveAnime();
    })
  }
};

updateLibrary();

form.addEventListener('submit', handleNewAnimeForm)

  
newBtn.addEventListener('click', () => {
  overlay.style.display = "block";
})

cancelBtn.addEventListener('click', () => {
  overlay.style.display = "none";
})