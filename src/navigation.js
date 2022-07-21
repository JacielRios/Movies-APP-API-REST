searchBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value.split(" ").join("")}`;
});

trendBtn.addEventListener('click', () => {
    location.hash = '#trendsMovies';
});

trendSeriesBtn.addEventListener('click', () => {
    location.hash = '#trendsSeries';
});

backBtn.addEventListener('click', () => {
    window.history.back();
});

backBtn2.addEventListener('click', () => {
    window.history.back();
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });
    if (location.hash.startsWith('#trendsMovies')) {
        trendsMoviesPage();
    } else if (location.hash.startsWith('#trendsSeries')){
        trendsSeriesPage();  
    }else if (location.hash.startsWith('#search=')){
        searchPage();    
    } else if (location.hash.startsWith('#movie=')){
        movieDetailsPage();
    }else if (location.hash.startsWith('#serie=')){
        serieDetailsPage();      
    }  else if (location.hash.startsWith('#genre=')){
        genresPage();    
    } else {
        homePage();
    }

    window.scrollTo(0,0);
}

function homePage() {
    console.log('Home');

    searchContainer.classList.remove('inactive');
    mostPopularPreview.classList.remove('inactive');
    trendingMoviesPreview.classList.remove('inactive');
    trendingSeriesPreview.classList.remove('inactive');
    genresPreview.classList.remove('inactive');
    trendSeriesBtn.classList.remove('inactive');
    trendBtn.classList.remove('inactive');
    headerGenres.classList.remove('inactive');
    
    posterBackground.classList.add('inactive');
    infoMovieContainer.classList.add('inactive');
    descriptionContainer.classList.add('inactive');
    similarMoviesPreview.classList.add('inactive');
    headerRelatedMovies.classList.add('inactive');

    searchTextContainer.classList.add('inactive');
    searchMoviesContainer.classList.add('inactive');


    getTrendingMoviesPreview();
    getTrendingSeriesPreview();
    getMostPopularMoviesPreview();
    getGenresMoviesPreview();
}

function genresPage() { // Modificar vista search

    searchContainer.classList.add('inactive');
    mostPopularPreview.classList.add('inactive');
    trendingMoviesPreview.classList.add('inactive');
    trendingSeriesPreview.classList.add('inactive');
    genresPreview.classList.add('inactive');
    trendSeriesBtn.classList.add('inactive');
    trendBtn.classList.add('inactive');
    headerGenres.classList.add('inactive');
    
    posterBackground.classList.add('inactive');
    infoMovieContainer.classList.add('inactive');
    descriptionContainer.classList.add('inactive');
    similarMoviesPreview.classList.add('inactive');
    headerRelatedMovies.classList.add('inactive');

    searchTextContainer.classList.remove('inactive');
    searchMoviesContainer.classList.remove('inactive');

    console.log('Genres');

    const [hash, arrayId]= location.hash.split('=');
    const [id, nameGenre] = arrayId.split('-');
    const newName = decodeURI(nameGenre);

    genreTitle.innerHTML = newName;

    getMoviesByGenre(id);
}

function movieDetailsPage() {

    searchContainer.classList.add('inactive');
    mostPopularPreview.classList.add('inactive');
    trendingMoviesPreview.classList.add('inactive');
    trendingSeriesPreview.classList.add('inactive');
    genresPreview.classList.add('inactive');
    trendSeriesBtn.classList.add('inactive');
    trendBtn.classList.add('inactive');
    headerGenres.classList.add('inactive');
    
    posterBackground.classList.remove('inactive');
    infoMovieContainer.classList.remove('inactive');
    descriptionContainer.classList.remove('inactive');
    similarMoviesPreview.classList.remove('inactive');
    headerRelatedMovies.classList.remove('inactive');

    searchTextContainer.classList.add('inactive');
    searchMoviesContainer.classList.add('inactive');

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);

    console.log('movie details');
}

function serieDetailsPage() {

    searchContainer.classList.add('inactive');
    mostPopularPreview.classList.add('inactive');
    trendingMoviesPreview.classList.add('inactive');
    trendingSeriesPreview.classList.add('inactive');
    genresPreview.classList.add('inactive');
    trendSeriesBtn.classList.add('inactive');
    trendBtn.classList.add('inactive');
    headerGenres.classList.add('inactive');
    
    posterBackground.classList.remove('inactive');
    infoMovieContainer.classList.remove('inactive');
    descriptionContainer.classList.remove('inactive');
    similarMoviesPreview.classList.remove('inactive');
    headerRelatedMovies.classList.remove('inactive');

    searchTextContainer.classList.add('inactive');
    searchMoviesContainer.classList.add('inactive');

    const [_, serieId] = location.hash.split('=');
    
    getSerieById(serieId);

    console.log('movie details');
}

function searchPage() { // Modificar vista search

    searchContainer.classList.remove('inactive');
    mostPopularPreview.classList.add('inactive');
    trendingMoviesPreview.classList.add('inactive');
    trendingSeriesPreview.classList.add('inactive');
    genresPreview.classList.add('inactive');
    trendSeriesBtn.classList.add('inactive');
    trendBtn.classList.add('inactive');
    headerGenres.classList.add('inactive');
    
    posterBackground.classList.add('inactive');
    infoMovieContainer.classList.add('inactive');
    descriptionContainer.classList.add('inactive');
    similarMoviesPreview.classList.add('inactive');
    headerRelatedMovies.classList.add('inactive');

    searchTextContainer.classList.remove('inactive');
    searchMoviesContainer.classList.remove('inactive');
    
    genreTitle.classList.add('inactive')

    const [_, query] = location.hash.split('=');

    getMoviesBySearch(query);
    console.log('Search');
}

function trendsMoviesPage() { // Modificar vista search

    searchContainer.classList.add('inactive');
    mostPopularPreview.classList.add('inactive');
    trendingMoviesPreview.classList.add('inactive');
    trendingSeriesPreview.classList.add('inactive');
    genresPreview.classList.add('inactive');
    trendSeriesBtn.classList.add('inactive');
    trendBtn.classList.add('inactive');
    headerGenres.classList.add('inactive');
    
    posterBackground.classList.add('inactive');
    infoMovieContainer.classList.add('inactive');
    descriptionContainer.classList.add('inactive');
    similarMoviesPreview.classList.add('inactive');
    headerRelatedMovies.classList.add('inactive');

    searchTextContainer.classList.remove('inactive');
    searchMoviesContainer.classList.remove('inactive');

    genreTitle.innerHTML = 'Tendencias';

    getTrendingMovies();

    console.log('Trends');
}

function trendsSeriesPage() { // Modificar vista search

    searchContainer.classList.add('inactive');
    mostPopularPreview.classList.add('inactive');
    trendingMoviesPreview.classList.add('inactive');
    trendingSeriesPreview.classList.add('inactive');
    genresPreview.classList.add('inactive');
    trendSeriesBtn.classList.add('inactive');
    trendBtn.classList.add('inactive');
    headerGenres.classList.add('inactive');
    
    posterBackground.classList.add('inactive');
    infoMovieContainer.classList.add('inactive');
    descriptionContainer.classList.add('inactive');
    similarMoviesPreview.classList.add('inactive');
    headerRelatedMovies.classList.add('inactive');

    searchTextContainer.classList.remove('inactive');
    searchMoviesContainer.classList.remove('inactive');

    genreTitle.innerHTML = 'Tendencias';

    getTrendingSeries();

    console.log('Trends');
}
