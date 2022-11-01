import {
  GET_CUSTOMER_LIST,
  SET_CUSTOMER_FILTER_DATA,
} from '../../shared/constants/ActionTypes';

const initialState = {
  customerData: {},
  filterData: {},
};

const CustomersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_LIST:
      return {
        ...state,
        customerData: action.payload,
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
