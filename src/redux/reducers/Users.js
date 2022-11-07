import {
  GET_USER_LIST,
  ADD_NEW_USER,
  UPDATE_USER,
} from 'shared/constants/ActionTypes';

const initialUsers = {
  userList: {},
  filterData: {},
};

const usersReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    case ADD_NEW_USER:
      return {
        ...state,
        userList: {
          ...state.userList,
          total: state.userList.total + 1,
          data: [action.payload, ...state.userList.data],
        },
      };
    case UPDATE_USER:
      return {
        ...state,
        userList: {
          ...state.userList,
          data: state.userList.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        },
      };
    default:
      return state;
  }
};

export default usersReducer;
