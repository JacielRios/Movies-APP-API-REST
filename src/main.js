const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
    'language': 'es-MX',
  },
});

// UTILS

function createMovies(movies, container, className) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add(className);

    const movieImg = document.createElement("img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

//LLAMADOS A LA API



async function getTrendingMoviesPreview() {
  const { data } = await API(
    "trending/movie/week");

  const movies = data.results;
  // console.log({ data, movies });
  createMovies(movies, trendingMoviesPreview, "trending-movie");
}

async function getTrendingSeriesPreview() {
    const { data } = await API("trending/tv/week");
    const series = data.results;
    createMovies(series, trendingSeriesPreview, "trending-serie")
}

async function getMostPopularMoviesPreview(){
  const { data } = await API('movie/popular');
  // console.log(data.results);
  const movies = data.results.splice(0, 5);
  createMovies(movies, mostPopularPreview, 'mostPopular-container')
}

async function getGenresMoviesPreview(){
  const { data } = await API('genre/movie/list');
  const genres = data.genres;

  genresPreview.innerHTML = "";
  genres.forEach((genre) => {

    const genreContainer = document.createElement('div');
    genreContainer.classList.add('genre-card');

    const genreTitle = document.createElement('p');
    genreTitle.setAttribute('id', 'id' + genre.id);
    genreTitle.addEventListener('click', () => {
      location.hash = `#genre=${genre.id}-${genre.name}`;
    })

    const title = document.createTextNode(genre.name);

    genreTitle.appendChild(title);
    genreContainer.appendChild(genreTitle);
    genresPreview.appendChild(genreContainer);
  });
}

async function getMoviesByGenre(id) {
  const { data } = await API("discover/movie", {
    params: {
      with_genres: id
    }
  });

  const movies = data.results;
  createMovies(movies, searchMoviesContainer, "search-movies__poster")
}

async function getMoviesBySearch(query) {
  const { data } = await API("search/movie", {
    params: {
      query,
    }
  });

  const movies = data.results;
  console.log(movies);
  createMovies(movies, searchMoviesContainer, 'search-movies__poster');
}