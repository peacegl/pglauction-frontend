import {GET_USER_LIST, SELECT_USER} from 'shared/constants/ActionTypes';

const initialUsers = {
  user_list: [],
  current_page: 0,
  last_page: 0,
  per_page: 20,
  total: 0,
  selected: [],
  user: {},
};

const usersReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        user_list: action.payload.data,
        current_page: action.payload.current_page - 1,
        last_page: action.payload.last_page,
        per_page: action.payload.per_page,
        total: action.payload.total,
      };
    case SELECT_USER:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
