const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
    language: "es-MX",
  },
});

// UTILS

function createMovies(movies, container, className) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add(className);
    movieContainer.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

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

function createSeries(series, container, className) {
  container.innerHTML = "";
  series.forEach((serie) => {
    const serieContainer = document.createElement("div");
    serieContainer.classList.add(className);
    serieContainer.addEventListener("click", () => {
      location.hash = "#serie=" + serie.id;
    });

    const serieImg = document.createElement("img");
    serieImg.setAttribute("alt", serie.title);
    serieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + serie.poster_path
    );
    serieContainer.appendChild(serieImg);
    container.appendChild(serieContainer);
  });
}

//LLAMADOS A LA API

async function getTrendingMoviesPreview() {
  const { data } = await API("trending/movie/day");

  const movies = data.results;
  // console.log({ data, movies });
  createMovies(movies, trendingMoviesPreview, "trending-movie");
}

async function getTrendingSeriesPreview() {
  const { data } = await API("trending/tv/day");
  const series = data.results;
  createSeries(series, trendingSeriesPreview, "trending-serie");
}

async function getMostPopularMoviesPreview() {
  const { data } = await API("movie/popular");
  // console.log(data.results);
  const movies = data.results.splice(0, 5);
  createMovies(movies, mostPopularPreview, "mostPopular-container");
}

async function getGenresMoviesPreview() {
  const { data } = await API("genre/movie/list");
  const genres = data.genres;

  genresPreview.innerHTML = "";
  genres.forEach((genre) => {
    const genreContainer = document.createElement("div");
    genreContainer.classList.add("genre-card");

    const genreTitle = document.createElement("p");
    genreTitle.setAttribute("id", "id" + genre.id);
    genreTitle.addEventListener("click", () => {
      location.hash = `#genre=${genre.id}-${genre.name}`;
    });

    const title = document.createTextNode(genre.name);

    genreTitle.appendChild(title);
    genreContainer.appendChild(genreTitle);
    genresPreview.appendChild(genreContainer);
  });
}

async function getMoviesByGenre(id) {
  const { data } = await API("discover/movie", {
    params: {
      with_genres: id,
    },
  });

  const movies = data.results;
  createMovies(movies, searchMoviesContainer, "search-movies__poster");
}

async function getMoviesBySearch(query) {
  const { data } = await API("search/movie", {
    params: {
      query,
    },
  });

  const movies = data.results;
  // console.log(movies);
  createMovies(movies, searchMoviesContainer, "search-movies__poster");
}

async function getTrendingMovies() {
  const { data } = await API("trending/movie/week");

  const movies = data.results;
  // console.log({ data, movies });
  console.log("movies");
  createMovies(movies, searchMoviesContainer, "search-movies__poster");
}

async function getTrendingSeries() {
  const { data } = await API("trending/tv/week");

  const series = data.results;
  // console.log({ data, movies });
  console.log("series");
  createSeries(series, searchMoviesContainer, "search-movies__poster");
}

async function getMovieById(id) {
  const { data: movie } = await API("movie/" + id);

  const movieImgUrl = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
  movieDetailImg = document.getElementById("backgroundImg");
  movieDetailImg.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.20) 100%,
      rgba(0, 0, 0) 29.17%
      ),
      url(${movieImgUrl})
      `;

  const minutes = movie.runtime;
  const hours = minutes/60;
  const newMinutes = minutes%60;
  // console.log(Math.trunc(hours), newMinutes);

  movieDetailTitle.textContent = movie.title;
  movieDetailTime.textContent = `${Math.trunc(hours)} HR ${newMinutes} MIN`;
  const [year, month, day] = movie.release_date.split('-')
  // console.log(year);
  movieDetailRelease.textContent = year;
  movieDetailVote.textContent = '⭐' + movie.vote_average;
  movieDetailDescription.textContent = movie.overview;

  getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
  const { data } = await API(`movie/${id}/recommendations`);

  const relatedMovies = data.results;

  createMovies(relatedMovies, similarMoviesPreview, "trending-movie");
}

async function getSerieById(id) {
  const { data: serie } = await API("tv/" + id);

  const serieImgUrl = "https://image.tmdb.org/t/p/w400" + serie.poster_path;
  serieDetailImg = document.getElementById("backgroundImg");
  serieDetailImg.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.20) 100%,
      rgba(0, 0, 0) 29.17%
      ),
      url(${serieImgUrl})
      `;

  movieDetailTitle.textContent = serie.name;
  movieDetailTime.textContent = serie.number_of_seasons + ' ' + 'temporadas';
  const [year, month, day] = serie.first_air_date.split('-')
  movieDetailRelease.textContent = year;
  movieDetailVote.textContent = '⭐' + serie.vote_average;
  movieDetailDescription.textContent = serie.overview;

  getRelatedSeriesById(id);
}

async function getRelatedSeriesById(id) {
  const { data } = await API(`tv/${id}/recommendations`);

  const relatedMovies = data.results;

  createSeries(relatedMovies, similarMoviesPreview, "trending-movie");
}
