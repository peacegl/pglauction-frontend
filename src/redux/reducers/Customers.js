import {
  GET_CUSTOMER_LIST,
  SET_CUSTOMER_FILTER_DATA,
  ADD_NEW_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_ALL_CUSTOMER_LIST,
} from '../../shared/constants/ActionTypes';

const initialState = {
  customerData: {},
  customersExportData: {},
  filterData: {},
};

const CustomersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_LIST:
      return {
        ...state,
        customerData: action.payload,
      };

    case GET_ALL_CUSTOMER_LIST:
      return {
        ...state,
        customersExportData: action.payload,
      };

    case ADD_NEW_CUSTOMER:
      return {
        ...state,
        customerData: {
          ...state.customerData,
          total: state.customerData.total + 1,
          data: [action.payload, ...state.customerData.data],
        },
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        customerData: {
          ...state.customerData,
          data: state.customerData.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        },
      };
    case SET_CUSTOMER_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      return state;
  }
};
export default CustomersReducer;
