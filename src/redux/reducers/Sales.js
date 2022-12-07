import {GET_SALE_LIST} from 'shared/constants/ActionTypes';

const initialUsers = {
  saleList: {},
};

const usersReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case GET_SALE_LIST:
      return {
        ...state,
        saleList: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
