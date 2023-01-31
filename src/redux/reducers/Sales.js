import {
  GET_SALE_LIST,
  ADD_NEW_SALE,
  UPDATE_SALE,
  GET_ALL_SALES_LIST,
} from 'shared/constants/ActionTypes';

const initialUsers = {
  saleList: {},
  salesExportData: {},
};

const usersReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case GET_SALE_LIST:
      return {
        ...state,
        saleList: action.payload,
      };

    case GET_ALL_SALES_LIST:
      return {
        ...state,
        salesExportData: action.payload,
      };

    case ADD_NEW_SALE:
      return {
        ...state,
        saleList: {
          ...state.saleList,
          total: state.saleList.total + 1,
          data: [action.payload, ...state.saleList.data],
        },
      };
    case UPDATE_SALE:
      return {
        ...state,
        saleList: {
          ...state.saleList,
          data: state.saleList.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        },
      };
    default:
      return state;
  }
};

export default usersReducer;
