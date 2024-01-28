// api: https://www.omdbapi.com/?i=tt3896198&apikey=e5f3f60d&s=fast //


// 1. Variable storage section linking JS with HTML //

const moviesListEl = document.querySelector(".movie-list");
const moviesLoading = document.querySelector(".movies__container");
const moviesRefresh = document.querySelector(".movie-list");
const searchResults = document.querySelector(".results__container");


// 2. Look through the given API using the input text searched

function searchMovie(name) {
    const movieName = name.target.value;
    moviesListEl.innerHTML = refreshMovies();
    moviesLoading.classList += ' movies__loading'; //include loading state class 
    setTimeout(() => {
        getMovie(movieName);
    }, 1000);

    searchResults.innerHTML = `<h2>Search Results for: ${movieName} </h2>`
}


// 3. Render first 6 movies given the input text

async function getMovie(name) {
    const moviesResult = await fetch(`https://www.omdbapi.com/?apikey=28916474&s=${name}`);
    const moviesData = await moviesResult.json();
    const selectBox = document.getElementById("filter");
    moviesLoading.classList.remove('movies__loading'); //deleted loading state class after successfully retrieving the API call
    if(moviesData.Response === 'False') {
        selectBox.selectedIndex = 0;
        moviesListEl.innerHTML = `<h2>Sorry, there were no results related to the search: "${name}"</h2>`
        movies.splice(0);
    }
    else{
        const movieList = moviesData.Search.slice(0, 6);
        selectBox.selectedIndex = 0;
        movies = movieList;
        moviesListEl.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
    }
    
}


// 4. Render a HTML movie card for each movie

function movieHTML(movie) {
    return `<div class="movie-card">
    <div class="movie-card__container">
        <img src=${movie.Poster} width="300" height="400">   
        <h4>${movie.Title}</h4>
        <p>${movie.Year}<p>
      
    </div>
  </div>`
}


// 5. Render Filtered movies (event.target.value) 

function filterMovies(event) {
    renderFilteredMovies(event.target.value);
}


// 6. Filter if newest or oldest

function renderFilteredMovies(filter) {
    if(filter === 'Oldest') {
        const filteredMovies = movies.sort((a, b) => (a.Year) - (b.Year))
        movies = filteredMovies;

    }
    if(filter === 'Newest') {
        const filteredMovies = movies.sort((a, b) => (b.Year) - (a.Year))
        movies = filteredMovies;
    }
    moviesListEl.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
}


// 7. Refresh function resetting to initial state 

function refreshMovies() {
    return ``;
}