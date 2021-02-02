//btn - button

const initBtn = document.querySelector("#initBtn");
const home = document.querySelector(".home");
const search = document.querySelector(".search");
const placeHldr = "./img/capaNaoEncontrada.png"
const infos = {
  method: 'GET'
}

initBtn.addEventListener("click", () => {

  pageSearch()
  search.style.display = "block"
})

function pageSearch() {
  home.style.display = "none"

  const templateSearch = `
    <div class="header">
        <img id="small" src="./img/logo-small.png" alt="">
      <div class="header__btn">
        <button id="returnBtn" class="returnBtn">Voltar</button>
        <button class="backBtn">Sair</button>
      </div>
    </div>
    <div class="seachBox">
      <input type="text" id="searchInput" placeholder="Busque por Autor, Editora ou Título">
      <button id="searchBook">Buscar</button>
    </div>
    <div id="searchResult">
    <img id="marca" src="./img/marca.png">
    </div>
    <div id="individualBook">
    </div>
    `
  search.innerHTML = templateSearch;

  const backBtn = document.querySelector(".backBtn");
  backBtn.addEventListener("click", () => {
    search.style.display = "none"
    home.style.display = "block"
  })

  const searchResult = document.querySelector("#searchResult");
  const searchInput = document.querySelector("#searchInput");
  const searchBook = document.querySelector("#searchBook");
  const bookLink = "https://www.googleapis.com/books/v1/volumes?q="

  searchBook.addEventListener("click", () => {
    
    searchResult.innerHTML = "";
    
    const book = bookLink + searchInput.value.replace(" ", "-");

    fetch(book, infos)
      .then((response) => response.json())
      .then((json) => {
        searchInput.value= "";
        console.log(json);
        displayResults(json);

        const eachCard = document.querySelectorAll(".eachBook");
        eachCard.forEach((card) => {
          card.addEventListener("click", (e) => {
            showInfos(e)
          })
        });

        const showInfos = (e) => {
          const eachBook = e.target.parentNode;
          fetch(eachBook.id, infos)
            .then((response) => response.json())
            .then((json) => {
              console.log(json)
              const imageBoock = json.volumeInfo.imageLinks.thumbnail;
              const name = json.volumeInfo.title;
              const author = json.volumeInfo.authors;
              const publisher = json.volumeInfo.publisher;
              const bookRating = json.volumeInfo.categories;
              const description = json.volumeInfo.description
              //const isbn = 

              fetch("https://6015b2e155dfbd00174ca812.mockapi.io/api/v1/Livrarias", infos)
                .then((response) => response.json())
                .then((json) => {
                  console.log(json)
                  
                  const loja1 = json[0].nome;
                  const loja2 = json[1].nome;
                  const loja3 = json[2].nome;
                  const estoque1 = json [0].quantidade;
                  const estoque2 = json [1].quantidade;
                  const estoque3 = json [2].quantidade;
                  searchResult.style.display = "none"
                  
                  const individualBook = document.querySelector("#individualBook");
                  individualBook.style.display = "block"
                  mostrarEachBook(loja1, loja2, loja3, estoque1, estoque2, estoque3, imageBoock,name,author,publisher,bookRating,description,individualBook)

                  const seachBox = document.querySelector(".seachBox");
                  seachBox.style.display = "none"

                  const returnBtn = document.querySelector("#returnBtn");
                  returnBtn.style.visibility = "visible";
                  returnBtn.addEventListener("click", () => {
                    searchResult.style.display = "block"
                    individualBook.style.display = "none"
                    returnBtn.style.visibility = "hidden";
                    seachBox.style.display = "block"
                  })
                })
                .catch((erro) => console.log("Erro:" + erro));
            })
            .catch((erro) => console.log("Erro:" + erro));
        }
      })
      .catch((erro) => console.log("Erro:" + erro));
  })
}

function displayResults(response) {
  for (let i = 0; i < response.items.length; i++) {
    item = response.items[i];
    title = item.volumeInfo.title;
    author = item.volumeInfo.authors;
    publisher = item.volumeInfo.publisher;
    bookImg = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;
    selfLink = item.selfLink;

    searchResult.innerHTML += formatOutput(title, author, publisher, bookImg, selfLink);
  }
};

function formatOutput(title, author, publisher, bookImg, selfLink) {
  var bookCard = `
  <div class="eachBook" id="${selfLink}">
    <img id="book" src="${bookImg}" alt="${title}">
    <div id="${selfLink}">
      <h2>${title}</h2>
      <p>Autor: ${author}</p>
      <p>Editora: ${publisher}</p>
    </div>
  </div>`
  return bookCard;
}

function mostrarEachBook (loja1, loja2, loja3, estoque1, estoque2, estoque3, imageBoock,name,author,publisher,bookRating,description,individualBook){
  const templateEachBook = `
  <h1 id="bookName">${name}</h1>
  <div class="moreInfo"> 
    <img src="${imageBoock}" alt="${name}">
    <div class="bookInfo">
      <p>Nome do Autor: ${author}</p>
      <p>Nome da Editora: ${publisher}</p>
      <p>Classificação do Livro: ${bookRating}</p>
    </div>
  </div>
  <div class="extraInfo">
    <div class="storesInfo">
      <h2>Quantidade em estoque</h2>
      <p>${loja1}: ${estoque1} livros</p>
      <p>${loja2}: ${estoque2} livros</p>
      <p>${loja3}: ${estoque3} livros</p>
    </div>
    <div class="bookLocation">
      <h2>Localização</h2>
      <p>Corredor: 3</p>
      <p>Estante: 4</p>
    </div> 
  </div>  
  <div class="bookDescription">
    <h2 id="description">Sinopse</h2>
    <p>${description}</p>
  </div>   
`
  individualBook.innerHTML = templateEachBook
}
