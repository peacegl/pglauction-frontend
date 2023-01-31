import {
  GET_PERMISSION_LIST,
  GET_ALL_PERMISSION_LIST,
} from 'shared/constants/ActionTypes';

const initialState = {
  permissionList: {},
  filterData: {},
  perExportData: {},
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

    default:
      return state;
  }
};

export default permissionsReducer;
