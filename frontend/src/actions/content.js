import * as types from './actionTypes';

const loadCatSuccess = cat => ({ type: types.GET_CAT_SUCCESS, payload: cat });
const loadCatFailure = error => ({ type: types.GET_CAT_FAIL, payload: error });

const loadingCat = () => ({ type: types.GET_CAT_LOADING });
const getErrorMessage = error => ((error.response) ? error.response.dataMessage : error.message);

export const getCat = () => async (dispatch, getState, api) => {
  try {
    dispatch(loadingCat());
    const response = await api.get('/cat');
    dispatch(loadCatSuccess(response));
  } catch (error) {
    dispatch(loadCatFailure(getErrorMessage(error)));
  }
};
