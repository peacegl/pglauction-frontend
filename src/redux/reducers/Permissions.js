import {GET_PERMISSION_LIST} from 'shared/constants/ActionTypes';

const initialState = {
  permissionList: {},
  filterData: {},
};

const permissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERMISSION_LIST:
      return {
        ...state,
        permissionList: action.payload,
      };

    default:
      return state;
  }
};

export default permissionsReducer;
