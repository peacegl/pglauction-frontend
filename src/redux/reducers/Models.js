import {
  GET_MODEL_LIST,
  ADD_NEW_MODEL,
  UPDATE_MODEL,
  SET_MODEL_FILTER_DATA,
} from '../../shared/constants/ActionTypes';

const initialState = {
  modelData: {},
  filterData: {},
};

const ModelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODEL_LIST:
      return {
        ...state,
        modelData: action.payload,
      };
    case ADD_NEW_MODEL:
      return {
        ...state,
        modelData: {
          ...state.modelData,
          total: state.modelData.total + 1,
          data: [action.payload, ...state.modelData.data],
        },
      };
    case UPDATE_MODEL:
      return {
        ...state,
        modelData: {
          ...state.modelData,
          data: state.modelData.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        },
      };
    case SET_MODEL_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      return state;
  }
};
export default ModelReducer;
