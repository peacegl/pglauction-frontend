import {GET_USER_LIST} from 'shared/constants/ActionTypes';

const initialUsers = {
  userList: {},
};

const usersReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
