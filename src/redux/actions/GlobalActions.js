import {SET_ALERT, SET_LOADING} from './ActionTypes';

export const setAlert = (message = '') => ({
  type: SET_ALERT,
  payload: {message},
});

export const setLoading = (status = false) => ({
  type: SET_LOADING,
  payload: {status},
});
