import {GET_USER_LIST} from 'shared/constants/ActionTypes';

const initialUsers = {
  user_list: [],
  current_page: 0,
  last_page: 0,
  total: 0,
};

const usersReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        user_list: action.payload.data,
        current_page: action.payload.current_page - 1,
        per_page: action.payload.per_page,
        total: action.payload.total,
      };
    default:
      return state;
  }
};

export default usersReducer;
