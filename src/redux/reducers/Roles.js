import {
  GET_ROLE_LIST,
  ADD_NEW_ROLE,
  UPDATE_ROLE,
  GET_ALL_ROLES_LIST,
} from 'shared/constants/ActionTypes';

const initialState = {
  roleList: {},
  filterData: {},
  rolesExportData: [],
};

const permissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLE_LIST:
      return {
        ...state,
        roleList: action.payload,
      };
    case GET_ALL_ROLES_LIST:
      return {
        ...state,
        rolesExportData: action.payload,
      };
    case ADD_NEW_ROLE:
      return {
        ...state,
        roleList: {
          ...state.roleList,
          total: state.roleList.total + 1,
          data: [action.payload, ...state.roleList.data],
        },
      };
    case UPDATE_ROLE:
      return {
        ...state,
        roleList: {
          ...state.roleList,
          data: state.roleList.data.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        },
      };
    default:
      return state;
  }
};

export default permissionsReducer;
