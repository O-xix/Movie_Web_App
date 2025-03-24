const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=98f17dcd91cb7de05f99deb44cf8fe45&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=98f17dcd91cb7de05f99deb44cf8fe45&query="'

const main = document.getElementById('section')
const form = document.getElementById('form')
const search = document.getElementById('query')


returnMovies(APILINK);
function returnMovies(url) {
    // FETCH
    fetch(url)
        // Because return is a JSON object, we need to convert it to a JSON object
        .then(res => res.json())
        .then(function(data) {
            console.log(data.results)
            data.results.forEach(element => {

                // Create elements
                const div_card = document.createElement('div');
                div_card.className = 'card';
                // Can also use div_card.setAttribute('class', 'card');

                const div_row = document.createElement('div'); 
                div_row.className = 'row';

                const div_column = document.createElement('div'); 
                div_column.className = 'column';

                const image = document.createElement('img');
                image.className = 'thumbnail';
                image.setAttribute('id', 'image');
                
                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                const center = document.createElement('center');

                title.innerHTML = `${element.title}`;
                image.src = IMG_PATH + element.poster_path;
                
                // Add elements inside parent elements
                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);

                main.appendChild(div_row);
            });
        });
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCH_API + searchItem);
        search.value = "";
    }
});