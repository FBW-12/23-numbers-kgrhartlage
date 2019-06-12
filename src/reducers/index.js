import {
  NUMBERS_API_REQUEST,
  NUMBERS_API_SUCCESS,
  NUMBERS_API_FAILURE,
} from '../actions';

const initialState = {
  trivia: '',
  fetching: false,
  error: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case NUMBERS_API_REQUEST:
      return {
        ...state,
        trivia: '',
        fetching: true,
        error: null,
      };
    case NUMBERS_API_SUCCESS:
      return {
        ...state,
        trivia: action.trivia,
        fetching: false,
      };
    case NUMBERS_API_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
