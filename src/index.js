//btn - button

const initBtn = document.querySelector('#initBtn');
const home = document.querySelector('.home');
const search = document.querySelector('.search');


initBtn.addEventListener('click', () => {
	pageSearch();
	search.style.display = 'block';
});

function pageSearch() {
	home.style.display = 'none';

	const templateSearch = `
    <div class="header">
        <img src="./img/book.png" alt="">
        <button class="backBtn">Sair</button>
    </div>
    <input type="text" id="searchInput" placeholder="Busque por Autor, Editora ou Título">
    <button id="searchBook">Buscar</button>
    <div class="results"></div>
    `;
	search.innerHTML = templateSearch;

	const backBtn = document.querySelector('.backBtn');
	backBtn.addEventListener('click', () => {
		search.style.display = 'none';
		home.style.display = 'block';
	});
  
  const searchBtn = document.querySelector('#searchBook');
  searchBtn.addEventListener('click', () => {
    const searchInput = document.querySelector('#searchInput').value
	  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`, { method: 'GET' })
		 .then((response) => response.json())
	  	.then((json) => {
      showResults(json);
			// console.log(json);
		});
	 function showResults(response) {
    for (let i = 0; i < response.items.length; i++){
      console.log(response.items[i].volumeInfo.title);
      const result = response.items[i].volumeInfo.title;
      const bookResult = document.querySelector('.results');
			const template = `
       <div>
       <h2>${result}</h2>
      </div>
      `;
      bookResult.innerHTML += template
    }
	}
  })
};
