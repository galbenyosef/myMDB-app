import {SET_QUERY_RESULT, SET_QUERY, CLEAR_ALL} from './ActionTypes';
import {setAlert, setLoading} from './GlobalActions';
import {getMovies} from '../../api/api';

export const onSearchChange = (query = '') => ({
  type: SET_QUERY,
  payload: {query},
});

export const setQueryResult = (
  movies = [],
  currentMoviesCount = 0,
  totalMoviesCount = 0,
  concat = false,
) => ({
  type: SET_QUERY_RESULT,
  payload: {movies, currentMoviesCount, totalMoviesCount, concat},
});

export const fetchMovies =
  (query = '', page = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));

      const resp = await getMovies(page > 1 ? getState().query : query, page);
      const {Response, Search, totalResults, Error} = resp?.data;

      if (
        Response === 'True' &&
        Array.isArray(Search) &&
        parseInt(totalResults) > 0
      ) {
        dispatch(setQueryResult(Search, Search.length, totalResults, page > 1));
      } else if (Response === 'False' && Error) {
        throw Error;
      } else {
        throw 'Response cannot be handled';
      }
    } catch (err) {
      dispatch(setAlert(err.toString()));
      dispatch(onClear());
      // Handle Error Here
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onClear = () => ({
  type: CLEAR_ALL,
});
