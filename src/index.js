//btn - button

const initBtn = document.querySelector("#initBtn");
const home = document.querySelector(".home");
const search = document.querySelector(".search");

initBtn.addEventListener("click", () => {
  pageSearch()
  search.style.display = "block"
})

function pageSearch() {
  home.style.display = "none"

  const templateSearch = `
    <div class="header">
        <img src="./img/book.png" alt="">
        <button class="backBtn">Sair</button>
    </div>
    <input type="text" placeholder="Busque por Autor, Editora ou Título">
    <button id="searchBook">Buscar</button>
    `
  search.innerHTML = templateSearch;

  const backBtn = document.querySelector(".backBtn");
  backBtn.addEventListener("click", () => {
    search.style.display = "none"
    home.style.display = "block"
  })
}

