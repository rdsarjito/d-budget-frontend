import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, EMPTY_CATEGORY } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (categories = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    case ADD_CATEGORY:
      return [...categories, action.payload];
    case DELETE_CATEGORY:
      return categories.filter((post) => post._id !== action.payload._id);
    case EMPTY_CATEGORY:
      return categories = [];
    default:
      return categories;
  };
};