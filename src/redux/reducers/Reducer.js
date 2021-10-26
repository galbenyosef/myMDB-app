import {
  SET_QUERY,
  SET_QUERY_RESULT,
  SET_LOADING,
  SET_ALERT,
  SET_PAGE,
  CLEAR_ALL,
  SET_SELECTED_MOVIE,
  SET_SCROLL_FN,
} from '../actions/ActionTypes';

const INITIAL_STATE = {
  //searchbar variable
  query: '',
  //list database
  movies: [],
  //list paging
  page: 1,
  currentMoviesCount: 0,
  totalMoviesCount: 0,
  //selected list item
  selectedMovie: null,
  //feedbacks
  loading: false,
  alertMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_QUERY: {
      const {query} = payload;
      return {...state, query};
    }
    case SET_PAGE: {
      const {page} = payload;
      return {...state, page};
    }
    case SET_QUERY_RESULT: {
      const {currentMoviesCount, totalMoviesCount, movies, concat} = payload;
      if (concat) {
        return {
          ...state,
          currentMoviesCount: state.currentMoviesCount + currentMoviesCount,
          totalMoviesCount,
          movies: state.movies.concat(movies),
        };
      }
      return {
        ...state,
        page: 1,
        currentMoviesCount,
        totalMoviesCount,
        movies,
      };
    }
    case CLEAR_ALL: {
      return {
        ...state,
        page: 1,
        currentMoviesCount: 0,
        totalMoviesCount: 0,
        movies: [],
        query: '',
      };
    }
    case SET_LOADING: {
      const {status} = payload;
      return {...state, loading: status};
    }
    case SET_ALERT: {
      const {message} = payload;
      return {...state, alertMessage: message};
    }
    case SET_SELECTED_MOVIE: {
      const {selectedMovie} = payload;
      return {...state, selectedMovie};
    }
    case SET_SCROLL_FN: {
      const {fn} = payload;
      return {...state, scrollToTop: fn};
    }
    default:
      return state;
  }
};
