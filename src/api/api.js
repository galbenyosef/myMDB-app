import axios from 'axios';

const API_URL = 'https://mymdbserver.herokuapp.com';

export const getMovie = imdbID => axios.get(`${API_URL}/movies/${imdbID}`);

export const getMovies = (title, page) =>
  axios.get(`${API_URL}/movies?title=${title}&page=${page}`);
