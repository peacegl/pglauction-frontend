import {
  GET_MAKE_LIST,
  ADD_NEW_MAKE,
  UPDATE_MAKE,
  SET_MAKE_FILTER_DATA,
} from '../../shared/constants/ActionTypes';

const initialState = {
  makeData: {},
  filterData: {},
};

const MakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAKE_LIST:
      return {
        ...state,
        makeData: action.payload,
      };
    case ADD_NEW_MAKE:
      return {
        ...state,
        makeData: {
          ...state.makeData,
          total: state.makeData.total + 1,
          data: [action.payload, ...state.makeData.data],
        },
      };
    case UPDATE_MAKE:
      return {
        ...state,
        makeData: {
          ...state.makeData,
          data: state.makeData.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        },
      };
    case SET_MAKE_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      return state;
  }
};
export default MakeReducer;
