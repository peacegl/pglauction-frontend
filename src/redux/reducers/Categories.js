import {
  GET_CATEGORY_LIST,
  SET_CATEGORY_FILTER_DATA,
} from '../../shared/constants/ActionTypes';

const initialState = {
  categoryData: {},
  filterData: {},
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_LIST:
      return {
        ...state,
        categoryData: action.payload,
      };
    case SET_CATEGORY_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      return state;
  }
};
export default CategoryReducer;
