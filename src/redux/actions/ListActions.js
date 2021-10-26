import {getMovie, getMovies} from '../../api/api';
import {SET_PAGE, SET_SELECTED_MOVIE, SET_SCROLL_FN} from './ActionTypes';

import {setLoading, setAlert} from './GlobalActions';

export const setPage = page => ({
  type: SET_PAGE,
  payload: {page},
});

const setSelectedMovie = movie => ({
  type: SET_SELECTED_MOVIE,
  payload: {selectedMovie: movie},
});

export const setScrollToTopFn = fn => ({
  type: SET_SCROLL_FN,
  payload: {fn},
});

export const clearSelectedMovie = () => setSelectedMovie(null);

export const fetchMovie = imdbID => async dispatch => {
  try {
    dispatch(setLoading(true));

    const resp = await getMovie(imdbID);
    const {Response, Error} = resp?.data;
    if (Response === 'True') {
      dispatch(setSelectedMovie(resp.data));
    } else if (Response === 'False' && Error) {
      throw Error;
    } else {
      throw 'Response cannot be handled';
    }
  } catch (err) {
    dispatch(setAlert(err));
    // Handle Error Here
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};
