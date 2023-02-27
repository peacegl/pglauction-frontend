import {
  GET_PERMISSION_LIST,
  GET_ALL_PERMISSION_LIST,
  GET_PERMISSION_USERS_LIST,
  GET_ROLES_PERMISSION_LIST,
} from 'shared/constants/ActionTypes';

const initialState = {
  permissionList: {},
  filterData: {},
  perExportData: {},
  permissionUsers: {},
  permissionRoles: {},
};

const permissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERMISSION_LIST:
      return {
        ...state,
        permissionList: action.payload,
      };

    case GET_ALL_PERMISSION_LIST:
      return {
        ...state,
        perExportData: action.payload,
      };

    case GET_PERMISSION_USERS_LIST:
      return {
        ...state,
        permissionUsers: action.payload,
      };

    case GET_ROLES_PERMISSION_LIST:
      return {
        ...state,
        permissionRoles: action.payload,
      };

    default:
      return state;
  }
};

export default permissionsReducer;
