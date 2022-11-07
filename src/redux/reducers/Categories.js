import {
  GET_CATEGORY_LIST,
  ADD_NEW_CATEGORY,
  UPDATE_CATEGORY,
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
    case ADD_NEW_CATEGORY:
      return {
        ...state,
        categoryData: {
          ...state.categoryData,
          total: state.categoryData.total + 1,
          data: [action.payload, ...state.categoryData.data],
        },
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categoryData: {
          ...state.categoryData,
          data: state.categoryData.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        },
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
